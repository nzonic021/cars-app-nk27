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
  const [sortOrder, setSortOrder] = useState(null);
  const [sortOrderMaxSpeed, setSortOrderMaxSpeed] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getCars({
      current_page: currentPage,
      brand: searchBrand,
      model: searchModel,
    }).then(({ data }) => {
      dispatch(setCars(data.data));
      setTotalPages(data.last_page);
    });
  }, [searchBrand, searchModel, currentPage]);

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

  const sortCarsByBrand = () => {
    if (sortOrder === "asc") {
      const sortedCars = [...cars].sort((a, b) =>
        a.brand.localeCompare(b.brand)
      );
      dispatch(setCars(sortedCars));
      setSortOrder("desc");
    } else {
      const sortedCars = [...cars].sort((a, b) =>
        b.brand.localeCompare(a.brand)
      );
      dispatch(setCars(sortedCars));
      setSortOrder("asc");
    }
  };

  const sortCarsByMaxSpeed = () => {
    if (sortOrderMaxSpeed === "asc") {
      const sortedCars = [...cars].sort((a, b) => a.max_speed - b.max_speed);
      dispatch(setCars(sortedCars));
      setSortOrderMaxSpeed("desc");
    } else {
      const sortedCars = [...cars].sort((a, b) => b.max_speed - a.max_speed);
      dispatch(setCars(sortedCars));
      setSortOrderMaxSpeed("asc");
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          Search by brand:
          <input
            type="text"
            className="form-control"
            placeholder="Brand"
            value={searchBrand}
            onChange={(e) => setSearchBrand(e.target.value)}
          />
          Search by model:
          <input
            type="text"
            className="form-control"
            placeholder="Model"
            value={searchModel}
            onChange={(e) => setSearchModel(e.target.value)}
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="btn btn-info"
          type="button"
          onClick={handleSelectAll}
        >
          Select All
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={handleDeselectAll}
        >
          Deselect All
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <table
          className="table table-striped table-hover"
          style={{ width: "auto", textAlign: "center" }}
        >
          <thead>
            <tr>
              <th>Model</th>
              <th>
                <button
                  className="btn btn-outline-success"
                  onClick={sortCarsByBrand}
                >
                  Brand
                </button>
              </th>
              <th>Year</th>
              <th>
                <button
                  className="btn btn-outline-success"
                  onClick={sortCarsByMaxSpeed}
                >
                  Max speed
                </button>
              </th>
              <th>Automatic</th>
              <th>Engine</th>
              <th>No of doors</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Select/Deselect</th>
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
                    <Link
                      to={`edit/${car.id}`}
                      className="btn btn-outline-warning"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      type="delete"
                      onClick={() => handleDelete(car.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    {selectedCars.find(
                      (selectedCar) => selectedCar.id === car.id
                    ) ? (
                      <button
                        className="btn btn-secondary"
                        type="select"
                        onClick={() => handleDeselect(car)}
                      >
                        Deselect
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-info"
                        type="select"
                        onClick={() => handleSelect(car)}
                      >
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            <li className="page-item">
              <span className="page-link">Page {currentPage}</span>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={goToNextPage}
                disabled={currentPage === 6}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default AppCars;
