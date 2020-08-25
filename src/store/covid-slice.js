import { createSlice } from "@reduxjs/toolkit";
import { setData, setLoading } from "./covid-actions";

const covidSlice = createSlice({
  name: "covid",
  initialState: {
    data: {},
    loading: false,
  },
  extraReducers: {
    [setData]: (state, action) => {
      state.data = action.payload;
      return state;
    },
    [setLoading]: (state, action) => {
      state.loading = action.payload;
      return state;
    },
  },
});

export default covidSlice;
