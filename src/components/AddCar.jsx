import { useState, useEffect } from "react";
import { editCarById, postCars } from "../service/carsService";
import { Link, useNavigate } from "react-router-dom";
import Preview from "./Preview";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getCarById } from "../service/carsService";

let years = [];

for (let i = 1990; i <= 2018; i++) {
  years.push(i);
}

const AddCar = () => {
  const navigate = useNavigate();
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [cars, setCars] = useState({
    brand: "",
    model: "",
    year: "",
    maxSpeed: 0,
    isAutomatic: false,
    engine: "",
    numberOfDoors: 0,
  });
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getCarById(id).then(({ data }) => {
        setCars(data);
        console.log(data);
      });
    }
  }, []);

  const handleChecked = () => {
    setIsAutomatic(!isAutomatic);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCars((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postCars(
      cars.brand,
      cars.model,
      parseInt(cars.year),
      cars.maxSpeed,
      isAutomatic,
      cars.engine,
      cars.numberOfDoors
    );
    if (id) {
      editCarById(id, cars);
    } else {
      setCars({
        brand: "",
        model: "",
        year: "",
        maxSpeed: 0,
        isAutomatic: isAutomatic,
        engine: "",
        numberOfDoors: 0,
      });
    }
    navigate("/");
  };

  const handleReset = () => {
    setCars({
      brand: "",
      model: "",
      year: 0,
      maxSpeed: 0,
      isAutomatic: isAutomatic,
      engine: "",
      numberOfDoors: 0,
    });
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const hidePreview = () => {
    setShowPreview(false);
  };

  return (
    <div>
      <form
        className="container mt-5"
        style={{ width: "300px" }}
        onSubmit={(event) => handleSubmit(event, cars)}
      >
        <div className="form-floating mt-3">
          <input
            name="brand"
            value={cars.brand}
            type="text"
            className="form-control"
            onChange={handleInputChange}
            placeholder="brand"
          />
        </div>
        <div className="form-floating mt-3">
          <input
            name="model"
            value={cars.model}
            type="text"
            className="form-control"
            onChange={handleInputChange}
            placeholder="model"
          />
        </div>
        <div className="form-floating mt-3">
          <select
            className="form-control"
            name="year"
            onChange={handleInputChange}
            value={cars.year}
          >
            <option disabled defaultValue value="">
              Select year:
            </option>
            {years.map((year, index) => {
              return (
                <option key={index} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-floating mt-3">
          <input
            name="maxSpeed"
            value={cars.maxSpeed}
            onChange={handleInputChange}
            type="number"
            className="form-control"
          />
        </div>
        <div className="form-check mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isAutomatic}
            onChange={handleChecked}
            name="isAutomatic"
            value={cars.isAutomatic}
          />
        </div>
        <div>
          <div>
            <input
              type="radio"
              name="engine"
              value="diesel"
              id="diesel"
              onChange={handleInputChange}
            />
            <label htmlFor="diesel">Diesel</label>
          </div>
          <div>
            <input
              type="radio"
              name="engine"
              value="petrol"
              id="petrol"
              onChange={handleInputChange}
            />
            <label htmlFor="petrol">Petrol</label>
          </div>
          <div>
            <input
              type="radio"
              name="engine"
              value="electric"
              id="electric"
              onChange={handleInputChange}
            />
            <label htmlFor="electric">Electric</label>
          </div>
          <div>
            <input
              type="radio"
              name="engine"
              value="hybrid"
              id="hybrid"
              onChange={handleInputChange}
            />
            <label htmlFor="hybrid">Hybrid</label>
          </div>
        </div>
        <div className="form-floating mt-3">
          <input
            name="numberOfDoors"
            value={cars.numberOfDoors}
            onChange={handleInputChange}
            type="number"
            className="form-control"
          />
        </div>
        <button
          className="w-100 btn btn-lg btn-success mt-3"
          type="submit"
          onClick={handleSubmit}
        >
          Add
        </button>
        <button
          className="w-100 btn btn-lg btn-warning mt-3"
          type="reset"
          onClick={handleReset}
        >
          Reset
        </button>
        <Link className="w-100 btn btn-lg btn-primary mt-3" to="/cars">
          Go to cars
        </Link>
        <Button
          className="w-100 btn btn-lg btn-secondary mt-3"
          onClick={handlePreview}
        >
          Preview
        </Button>

        <Preview
          show={showPreview}
          onHide={hidePreview}
          brand={cars.brand}
          model={cars.model}
          year={cars.year}
          maxspeed={cars.maxSpeed}
          isautomatic={isAutomatic ? "Yes" : "No"}
          engine={cars.engine}
          numberofdoors={cars.numberOfDoors}
        />
      </form>
    </div>
  );
};
export default AddCar;
