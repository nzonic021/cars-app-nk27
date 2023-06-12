const selectCarsValue = (state) => {
  return state.cars.value;
};
const selectCounterValue = (state) => {
  return state.cars.selectedCars;
};

export { selectCarsValue, selectCounterValue };
