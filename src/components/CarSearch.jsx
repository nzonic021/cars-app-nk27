import { useDispatch } from "react-redux";
import { setSearchBrand, setSearchModel } from "../store/cars/slice";

export const CarSearch = () => {
  const dispatch = useDispatch();

  const handleSearchBrand = (event) => {
    dispatch(setSearchBrand(event.target.value));
  };

  const handleSearchModel = (event) => {
    dispatch(setSearchModel(event.target.value));
  };

  return (
    <span>
      Brand: <input type="text" onChange={handleSearchBrand} />
      Model: <input type="text" onChange={handleSearchModel} />
    </span>
  );
};
