import { useEffect, useState } from "react";
import { deleteCarById, getCars } from "../service/carsService";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeCar, setCars } from "../store/cars/slice";
import { selectCarsValue } from "../store/cars/selectors";

const AppCars = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCarsValue);
  const [searchBrand, setSearchBrand] = useState("");
  const [searchModel, setSearchModel] = useState("");

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
    }
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
            </tr>
          </thead>
          {cars.length === 0 ? (
            <tr>
              <td colSpan="9">
                Nema automobila koji zadovoljavaju kriterijume pretrage.
              </td>
            </tr>
          ) : (
            <tbody>
              {cars.map((car, id) => (
                <tr key={id}>
                  <td>{car.model}</td>
                  <td>{car.brand}</td>
                  <td>{car.year}</td>
                  <td>{car.maxSpeed}</td>
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
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};
export default AppCars;
