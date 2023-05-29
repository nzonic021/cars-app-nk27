import { useState, useEffect } from "react";
import { getCars } from "../service/carsService";
import { Link } from "react-router-dom";

const AppCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    getCars().then(({ data }) => setCars(data));
  }, []);

  return (
    <div>
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
            </tr>
          </thead>
          <tbody>
            {cars.map((car, id) => (
              <tr key={id}>
                <td>{car.model}</td>
                <td>{car.brand}</td>
                <td>{car.year}</td>
                <td>{car.maxSpeed}</td>
                <td>{car.isAutomatic ? "Yes" : "No"}</td>
                <td>{car.engine}</td>
                <td>{car.numberOfDoors}</td>
                <td>
                  <Link to={`edit/${car.id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AppCars;
