import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AppCars } from "./components/AppCars";
import { Provider } from "react-redux";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cars" />}></Route>
      <Route path="/cars" element={<AppCars />}></Route>
      {/* <Route path="/add" element={<AddCar />}></Route> */}
      {/* <Route path="/cars/edit/:id" element={<AddCar />}></Route> */}
    </Routes>
  );
}

export default App;
