import { createSlice } from "@reduxjs/toolkit";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    carsList: [],
    filteredCarsList: [],
    selectedCarsList: [],
    search: {
      brand: "",
      model: "",
    },
    page: 1,
    lastPage: 1,
  },
  reducers: {
    setCarsList: (state, action) => {
      state.carsList = action.payload;
    },
    setFilteredCarsList: (state, action) => {
      state.filteredCarsList = action.payload;
    },
    setSearchBrand: (state, action) => {
      state.search.brand = action.payload.toLowerCase();
    },
    setSearchModel: (state, action) => {
      state.search.model = action.payload.toLowerCase();
    },
    addToSelectedCarsList: (state, action) => {
      state.selectedCarsList.push(action.payload);
    },
    removeFromSelectedCarsList: (state, action) => {
      state.selectedCarsList = state.selectedCarsList.filter(
        (id) => id !== action.payload
      );
    },
    resetSelectedCarsList: (state) => {
      state.selectedCarsList = [];
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLastPage: (state, action) => {
      state.lastPage = action.payload;
    },
  },
});

export const {
  setCarsList,
  setSearchBrand,
  setSearchModel,
  setFilteredCarsList,
  addToSelectedCarsList,
  removeFromSelectedCarsList,
  resetSelectedCarsList,
  setPage,
  setLastPage,
} = carsSlice.actions;

export default carsSlice.reducer;
