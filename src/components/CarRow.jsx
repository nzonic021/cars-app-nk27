import { useDispatch, useSelector } from "react-redux";
import { selectSelectedCarsList } from "../store/cars/selectors";
import { useEffect, useState } from "react";
import {
  addToSelectedCarsList,
  removeFromSelectedCarsList,
} from "../store/cars/slice";

export const CarRow = ({ car }) => {
  const dispatch = useDispatch();
  const selectedCars = useSelector(selectSelectedCarsList);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (selectedCars.find((id) => id === car.id)) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedCars, setIsSelected, car]);

  const handleClick = () => {
    if (isSelected) {
      dispatch(removeFromSelectedCarsList(car.id));
    } else {
      dispatch(addToSelectedCarsList(car.id));
    }
  };

  if (!car) return null;

  return (
    <li style={{ border: isSelected ? "1px solid red" : "" }}>
      <div>id: {car.id}</div>
      <div>brand: {car.brand}</div>
      <div>model: {car.model}</div>
      <div>year: {car.year}</div>
      <div>max_speed: {car.max_speed}</div>
      <div>is_automatic: {car.is_automatic}</div>
      <div>engine: {car.engine}</div>
      <div>number_of_doors: {car.number_of_doors}</div>
      <button onClick={handleClick}>
        {isSelected ? "Deselect" : "Select"}
      </button>
    </li>
  );
};
