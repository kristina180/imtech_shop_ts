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
    const response_token = await axios.post(`${USER_URL}auth/login`, payload, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
  }
});

export const getAllUsers = createAsyncThunk<
  IGettingUser[],
  undefined,
  { rejectValue: string }
>("user/getAllUsers", async function (_, { rejectWithValue }) {
  try {
    const response = await fetch(`${USER_URL}users?limit=1000`);
    return response.json();
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
    const response = await axios.post(`${USER_URL}auth/login`, payload, {
      headers: { "Content-Type": "application/json" },
    });

    const login = await axios(`${USER_URL}auth/profile`, {
      headers: { Authorization: `Bearer ${response.data.access_token}` },
    });

    return { data: login.data, token: response.data.access_token };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// export const checkAuth = createAsyncThunk<
//   TCheckAuth,
//   string,
//   { rejectValue: string }
// >("user/checkAuth", async function (payload, { rejectWithValue }) {
//   try {
//     const response = await axios.get(`${USER_URL}auth/profile`, {
//       headers: { Authorization: `Bearer ${payload}` },
//     });
//     return { data: response.data, token: payload };
//   } catch (error: any) {
//     return rejectWithValue(error.message);
//   }
// });

export const updateUser = createAsyncThunk<
  IUser,
  IUser,
  { rejectValue: string }
>("user/updateUser", async function (payload, { rejectWithValue }) {
  try {
    const response = await axios.put(
      `${USER_URL}users/${payload.id}`,
      {
        name: `${payload.name}`,
        email: `${payload.email}`,
        password: `${payload.password}`,
        avatar: `${payload.avatar}`,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
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
      let id = action.payload.id;
      let found = state.cart.find((elem) => elem.id == id);
      if (found && found.quantity) {
        found.quantity++;
      } else {
        let new_elem = action.payload.products.find(
          (elem: IProduct) => elem.id == id
        );
        if (new_elem) {
          state.cart.push({
            id: new_elem.id,
            images: new_elem.images,
            title: new_elem.title,
            price: +new_elem.price,
            quantity: 1,
          });
        }
      }
    },
    removeFromCart(state, action: PayloadAction<IRemoveFromCartFav>) {
      const id = action.payload.id;
      let found = state.cart.find((elem) => elem.id == action.payload.id);
      if (found) {
        if (found.quantity == 1 || action.payload.delete) {
          state.cart = state.cart.filter((elem) => {
            return elem.id != id;
          });
        } else {
          if (found.quantity) {
            found.quantity = found.quantity - 1;
          }
        }
      }
    },

    cleanCart(state) {
      state.cart = [];
    },

    addToFavorites(state, action: PayloadAction<TPayloadType>) {
      let id = action.payload.id;
      let found = state.favorites.find((elem) => elem.id == id);
      if (!found) {
        let new_elem = action.payload.products.find(
          (elem: IProduct) => elem.id == id
        );
        if (new_elem) {
          const new_fav = {
            id: new_elem.id,
            images: new_elem.images,
            title: new_elem.title,

            price: +new_elem.price,
          };
          state.favorites.push(new_fav);
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
    // builder.addCase(checkAuth.fulfilled, (state, action) => {
    //   state.user = action.payload.data;
    //   state.token = action.payload.token;
    //   state.logout = false;
    // });
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
