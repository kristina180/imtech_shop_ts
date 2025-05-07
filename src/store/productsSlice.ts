import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { USER_URL } from "../utils/constants";
import { TInitialStateProducts, IProduct } from "@/utils/types";

export const getProducts = createAsyncThunk<
  IProduct[],
  undefined,
  { rejectValue: string }
>("products/getProducts", async function (_, { rejectWithValue }) {
  try {
    const response = await fetch(`${USER_URL}products`);

    return response.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const initialState: TInitialStateProducts = {
  products: [],
  isLoading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });

    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default productsSlice.reducer;
