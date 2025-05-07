import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import produtcsSlice from "./productsSlice";
import userSlice from "./userSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      category: categorySlice,
      products: produtcsSlice,
      user: userSlice,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
