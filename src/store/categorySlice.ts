import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IInitialStateCategory, ICategories } from "@/utils/types";
import { BASE_URL, USER_URL } from "../utils/constants";

export const getCategories = createAsyncThunk<
  string[],
  undefined,
  { rejectValue: string }
>("category/getCaregories", async function (_, { rejectWithValue }) {
  try {
    const response = await fetch(`${USER_URL}categories`);
    let data = await response.json();
    data = data.map((item: ICategories) => item.slug).slice(0, 5);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const initialState: IInitialStateCategory = {
  category: [],
  isLoading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.category = action.payload;
    });

    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default categorySlice.reducer;
