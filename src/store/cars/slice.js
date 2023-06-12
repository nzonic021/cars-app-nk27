import { createSlice } from "@reduxjs/toolkit";

export const carsSlice = createSlice({
  name: "cars",
  initialState: {
    value: [],
    selectedCars: 0,
  },
  reducers: {
    setCars: (state, action) => {
      state.value = action.payload;
    },
    removeCar: (state, action) => {
      state.value = state.value.filter((car) => car.id !== action.payload);
    },
    selectCar: (state) => {
      state.selectedCars += 1;
    },
    deselectCar: (state) => {
      state.selectedCars -= 1;
    },
    selectedAll: (state) => {
      state.selectedCars = state.value.length;
    },
    deselectedAll: (state) => {
      state.selectedCars = 0;
    },
  },
});

export const {
  setCars,
  removeCar,
  selectCar,
  deselectCar,
  selectedAll,
  deselectedAll,
} = carsSlice.actions;

export default carsSlice.reducer;
