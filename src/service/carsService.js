import { API } from "../shared/api";

export const getCars = () => {
  return API.get("/cars");
};

export const postCars = (
  brand,
  model,
  year,
  maxSpeed,
  isAutomatic,
  engine,
  numberOfDoors
) => {
  return API.post("/cars", {
    brand,
    model,
    year,
    maxSpeed,
    isAutomatic,
    engine,
    numberOfDoors,
  });
};
