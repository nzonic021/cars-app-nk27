import { useEffect } from "react";
import { getCars } from "../service/carsService";
import { useDispatch, useSelector } from "react-redux";
import {
  addToSelectedCarsList,
  removeFromSelectedCarsList,
  resetSelectedCarsList,
  setCarsList,
  setLastPage,
  setPage,
} from "../store/cars/slice";
import {
  selectCarsList,
  selectCurrentPage,
  selectLastPage,
  selectSearchBrand,
  selectSearchModel,
  selectSelectedCarsCount,
} from "../store/cars/selectors";
import { CarRow } from "./CarRow";

export const AppCars = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCarsList);
  const selectedCarCount = useSelector(selectSelectedCarsCount);
  const searchedBrand = useSelector(selectSearchBrand);
  const searchedModel = useSelector(selectSearchModel);
  const currentPage = useSelector(selectCurrentPage);
  const lastPage = useSelector(selectLastPage);

  useEffect(() => {
    getCars({
      page: currentPage,
      brand: searchedBrand,
      model: searchedModel,
    }).then(({ data }) => {
      dispatch(setCarsList(data.data));
      dispatch(setLastPage(data.last_page));
    });
  }, [searchedBrand, searchedModel, currentPage]);

  const handleSelectAll = () => {
    dispatch(resetSelectedCarsList());
    cars.forEach((car) => {
      dispatch(addToSelectedCarsList(car.id));
    });
  };
  const handleDeSelectAll = () => {
    cars.forEach((car) => {
      dispatch(removeFromSelectedCarsList(car.id));
    });
  };

  const handleClickSort = (sort_by, sort_order) => {
    getCars({
      brand: searchedBrand,
      model: searchedModel,
      sort_by,
      sort_order,
    }).then(({ data }) => {
      dispatch(setCarsList(data.data));
      dispatch(setLastPage(data.last_page));
    });
  };

  const handleChangePage = (isNext) => {
    if (isNext) {
      dispatch(setPage(currentPage + 1));
    } else if (currentPage !== 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  return (
    <>
      <div>
        <button onClick={() => handleClickSort("brand", "asc")}>
          Brand Asc
        </button>
        <button onClick={() => handleClickSort("brand", "desc")}>
          Brand Desc
        </button>
        <button onClick={() => handleClickSort("max_speed", "asc")}>
          Max speed Asc
        </button>
        <button onClick={() => handleClickSort("max_speed", "desc")}>
          Max speed Desc
        </button>
      </div>
      <div>Selected cars: {selectedCarCount}</div>
      <div>
        <button onClick={handleSelectAll}>Select All</button>
        <button onClick={handleDeSelectAll}>Deselect All</button>
      </div>
      <div>
        <button
          onClick={() => handleChangePage(false)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button
          onClick={() => handleChangePage(true)}
          disabled={currentPage === lastPage}
        >
          Next page
        </button>
      </div>
      <ul style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {cars && cars.length ? (
          cars.map((car) => {
            return <CarRow key={car.id} car={car} />;
          })
        ) : (
          <div>Nema automobila koji podlezu kriterijumu</div>
        )}
      </ul>
    </>
  );
};
