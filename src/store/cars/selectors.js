const selectCarsList = (state) => state.cars.carsList;
const selectFilteredCarsList = (state) => state.cars.filteredCarsList;
const selectSelectedCarsList = (state) => state.cars.selectedCarsList;
const selectSelectedCarsCount = (state) =>
  state.cars.selectedCarsList ? state.cars.selectedCarsList.length : 0;
const selectSearchBrand = (state) => state.cars.search.brand;
const selectSearchModel = (state) => state.cars.search.model;
const selectCurrentPage = (state) => state.cars.page;
const selectLastPage = (state) => state.cars.lastPage;

export {
  selectFilteredCarsList,
  selectCarsList,
  selectSelectedCarsList,
  selectSelectedCarsCount,
  selectSearchBrand,
  selectSearchModel,
  selectLastPage,
  selectCurrentPage,
};
