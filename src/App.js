import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { API } from "./shared/api";
import AppCars from "./components/AppCars";
import AddCar from "./components/AddCar";

function App() {
  API.get("/Messages/greet");
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cars" />}></Route>
      <Route path="/cars" element={<AppCars />}></Route>
      <Route path="/add" element={<AddCar />}></Route>
    </Routes>
  );
}

export default App;
