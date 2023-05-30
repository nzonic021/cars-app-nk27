import { API } from "../shared/api";

export const getCars = () => {
  return API.get("/cars");
};

export const getCarById = (id) => {
  return API.get(`/cars/${id}`);
};

export const editCarById = (id, car) => {
  return API.patch(`/cars/${id}`, car);
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

export const deleteCarById = (id) => {
  return API.delete(`/cars/${id}`);
};
