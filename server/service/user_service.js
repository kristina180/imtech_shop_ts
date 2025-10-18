import UserModel from "../models/user_model.js";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import emailService from "./email_service.js";
import tokenService from "../service/token_service.js";
import UserDto from "../dtos/user_dto.js";
import { ApiError } from "next/dist/server/api-utils/index.js";

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw new Error("Пользователь с таким email уже существует");
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = v4();
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });
    await emailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );
    const userDto = new UserDto(user);
    const token = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, token.refreshToken);

    return {
      ...token,
      user: userDto,
    };
  }
  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log("Такого email не существует");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      console.log("Неверный пароль");
    }
    const userDto = new UserDto(user);
    const token = tokenService.generateToken({ ...UserDto });
    await tokenService.saveToken(userDto.id, token.refreshToken);
    console.log("Активировались");
    return {
      ...token,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      console.log("Не авторизован");
    }
    const userData = tokenService.validateRefreshToken(refreshToken);

    const tokenFromDataBase = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDataBase) {
      console.log("Не авторизован");
    }
    const user = await UserService.findById(userData.id);

    const userDto = new UserDto(user);
    const token = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, token.refreshToken);

    return {
      ...token,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}
export default new UserService();
