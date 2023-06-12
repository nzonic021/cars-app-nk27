import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./cars/slice";

export default configureStore({
  reducer: {
    cars: carsReducer,
  },
});
