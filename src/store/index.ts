import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import produtcsSlice from "./productsSlice";
import userSlice from "./userSlice";

import localStorage from "redux-persist/es/storage";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage: localStorage,
};

const persistedCategory = persistReducer(persistConfig, categorySlice);
const persistedProducts = persistReducer(persistConfig, produtcsSlice);
const persistedUser = persistReducer(persistConfig, userSlice);

export const makeStore = () =>
  configureStore({
    reducer: {
      category: persistedCategory,
      products: persistedProducts,
      user: persistedUser,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
