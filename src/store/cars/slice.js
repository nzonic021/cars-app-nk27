import { createSlice } from "@reduxjs/toolkit";

export const carsSlice = createSlice({
  name: "cars",
  initialState: {
    value: [],
  },
  reducers: {
    setCars: (state, action) => {
      state.value = action.payload;
    },
    removeCar: (state, action) => {
      state.value = state.value.filter((car) => car.id !== action.payload);
    },
  },
});

export const { setCars, removeCar } = carsSlice.actions;

export default carsSlice.reducer;
