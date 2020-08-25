import { createSlice } from "@reduxjs/toolkit";
import { setToken, setLoading } from "./user-actions";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    loading: false,
  },
  extraReducers: {
    [setToken]: (state, action) => {
      state.token = action.payload;
      return state;
    },
    [setLoading]: (state, action) => {
      state.loading = action.payload;
      return state;
    },
  },
});

export default userSlice;
