import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_URL } from "../utils/constants";
import {
  IUser,
  ISignupUser,
  IProduct,
  TPayloadType,
  IRemoveFromCartFav,
  TLoginUser,
  IGettingUser,
  TCheckAuth,
  IInitialStateUserSlice,
} from "@/utils/types";

const initialState: IInitialStateUserSlice = {
  allusers: null,
  user: null,
  token: null,
  logout: false,
  cart: [],
  favorites: [],
  formType: "signup",
  showForm: false,
};

export const createUser = createAsyncThunk<
  IUser,
  ISignupUser,
  { rejectValue: string }
>("user/createUser", async function (payload, { rejectWithValue }) {
  try {
    const response = await axios.post(
      `${USER_URL}users/`,
      {
        name: `${payload.name}`,
        email: `${payload.email}`,
        password: `${payload.password}`,
        avatar:
          "https://avatars.mds.yandex.net/i?id=e0f30d75c96988928ed89950848b5605_l-4502909-images-thumbs&n=13",
      },
      { headers: { "Content-Type": "application/json" } }
    );

    await axios.post(`${USER_URL}auth/login`, payload);

    return response.data;
  } catch (error) {
    let errorMessage = "Неизвестная ошибка";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return rejectWithValue(errorMessage);
  }
});

export const getAllUsers = createAsyncThunk<
  IGettingUser[],
  void,
  { rejectValue: string }
>("user/getAllUsers", async function (_, { rejectWithValue }) {
  try {
    const response = await fetch(`${USER_URL}users?limit=1000`);
    return await response.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk<
  TCheckAuth,
  TLoginUser,
  { rejectValue: string }
>("user/loginUser", async function (payload, { rejectWithValue }) {
  try {
    const response = await axios.post(`${USER_URL}auth/login`, payload);

    const login = await axios(`${USER_URL}auth/profile`, {
      headers: { Authorization: `Bearer ${response.data.access_token}` },
    });

    return { data: login.data, token: response.data.access_token };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const updateUser = createAsyncThunk<
  IUser,
  IUser,
  { rejectValue: string }
>("user/updateUser", async function (payload, { rejectWithValue }) {
  try {
    const response = await axios.put(`${USER_URL}users/${payload.id}`, {
      name: `${payload.name}`,
      email: `${payload.email}`,
      password: `${payload.password}`,
      avatar: `${payload.avatar}`,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleTypeForm(state, action: PayloadAction<string>) {
      state.formType = action.payload;
    },
    toggleForm(state, action: PayloadAction<boolean>) {
      state.showForm = action.payload;
    },
    logoutChange(state) {
      state.user = null;
      state.token = null;
      state.logout = true;
    },

    addToCart(state, action: PayloadAction<TPayloadType>) {
      const { id, products } = action.payload;
      const found = state.cart.find((item) => item.id === id);
      if (found && found.quantity) {
        found.quantity++;
      } else {
        const product = products.find((elem) => elem.id == id);
        if (product) {
          state.cart.push({ ...product, quantity: 1 });
        }
      }
    },
    removeFromCart(state, action: PayloadAction<IRemoveFromCartFav>) {
      const { id, delete: shouldDelete } = action.payload;
      let found = state.cart.find((elem) => elem.id == id);
      if (found) {
        if (found.quantity == 1 || shouldDelete) {
          state.cart = state.cart.filter((elem) => {
            return elem.id != id;
          });
        } else {
          if (found.quantity) {
            found.quantity--;
          }
        }
      }
    },

    cleanCart(state) {
      state.cart = [];
    },

    addToFavorites(state, action: PayloadAction<TPayloadType>) {
      const { id, products } = action.payload;
      const found = state.favorites.some((item) => item.id === id);
      if (!found) {
        let product = products.find((elem) => elem.id == id);
        if (product) {
          const { id, images, title, price } = product;
          state.favorites.push({ id, images, title, price });
        }
      }
    },
    removeFromFavorites(state, action: PayloadAction<IRemoveFromCartFav>) {
      const id = action.payload.id;
      state.favorites = state.favorites.filter((elem) => {
        return elem.id != id;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.logout = false;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.allusers = action.payload;
    });

    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.user = payload.data;
      state.token = payload.token;
      state.logout = false;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  cleanCart,
  addToFavorites,
  removeFromFavorites,
  toggleForm,
  toggleTypeForm,
  logoutChange,
} = userSlice.actions;

export default userSlice.reducer;
