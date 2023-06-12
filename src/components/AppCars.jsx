import { useEffect, useState } from "react";
import { deleteCarById, getCars } from "../service/carsService";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deselectCar,
  deselectedAll,
  removeCar,
  selectCar,
  selectedAll,
  setCars,
} from "../store/cars/slice";
import { selectCarsValue, selectCounterValue } from "../store/cars/selectors";

const AppCars = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCarsValue);
  const counterValue = useSelector(selectCounterValue);

  const [searchBrand, setSearchBrand] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const [selectedCars, setSelectedCars] = useState([]);

  useEffect(() => {
    getCars({ brand: searchBrand, model: searchModel }).then(({ data }) =>
      dispatch(setCars(data.data))
    );
  }, [searchBrand, searchModel]);

  const handleDelete = (id) => {
    const shouldDelete = window.confirm(
      "Da li ste sigurni da želite obrisati automobil?"
    );
    if (shouldDelete) {
      deleteCarById(id);
      dispatch(removeCar(id));
      dispatch(deselectCar());
    }
  };

  const handleSelect = (car) => {
    if (selectedCars.find((selectedCar) => selectedCar.id === car.id)) {
      return;
    }
    dispatch(selectCar());
    setSelectedCars((prevSelectedCars) => [...prevSelectedCars, car]);
  };

  const handleDeselect = (car) => {
    const updatedSelectedCars = selectedCars.filter(
      (selectedCar) => selectedCar.id !== car.id
    );
    setSelectedCars(updatedSelectedCars);
    dispatch(deselectCar());
  };

  const handleSelectAll = () => {
    setSelectedCars(cars);
    dispatch(selectedAll());
  };

  const handleDeselectAll = () => {
    setSelectedCars([]);
    dispatch(deselectedAll());
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="form-inline mt-3">
          <input
            type="text"
            className="form-control mr-2"
            placeholder="Brand"
            value={searchBrand}
            onChange={(e) => setSearchBrand(e.target.value)}
          />
          <input
            type="text"
            className="form-control mr-2"
            placeholder="Model"
            value={searchModel}
            onChange={(e) => setSearchModel(e.target.value)}
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button type="button" onClick={handleSelectAll}>
          Select All
        </button>
        <button type="button" onClick={handleDeselectAll}>
          Deselect All
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <table
          className="table table-striped table-hover"
          style={{ width: "300px", textAlign: "center" }}
        >
          <thead>
            <tr>
              <th>Model</th>
              <th>Brand</th>
              <th>Year</th>
              <th>Max speed</th>
              <th>Automatic</th>
              <th>Engine</th>
              <th>No of doors</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Select</th>
            </tr>
          </thead>
          {cars.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="9">
                  Nema automobila koji zadovoljavaju kriterijume pretrage.
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {cars.map((car, id) => (
                <tr key={id}>
                  <td>{car.model}</td>
                  <td>{car.brand}</td>
                  <td>{car.year}</td>
                  <td>{car.max_speed}</td>
                  <td>{car.is_automatic ? "Yes" : "No"}</td>
                  <td>{car.engine}</td>
                  <td>{car.number_of_doors}</td>
                  <td>
                    <Link to={`edit/${car.id}`}>Edit</Link>
                  </td>
                  <td>
                    <button type="delete" onClick={() => handleDelete(car.id)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    {selectedCars.find(
                      (selectedCar) => selectedCar.id === car.id
                    ) ? (
                      <button type="select" onClick={() => handleDeselect(car)}>
                        Deselect
                      </button>
                    ) : (
                      <button type="select" onClick={() => handleSelect(car)}>
                        Select
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h5>Ukupno selektovano automobila: {counterValue}</h5>
      </div>
    </div>
  );
};
export default AppCars;
