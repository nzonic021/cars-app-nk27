import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AppCars from "./components/AppCars";
import AddCar from "./components/AddCar";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Navigate to="/cars" />}></Route>
        <Route path="/cars" element={<AppCars />}></Route>
        <Route path="/add" element={<AddCar />}></Route>
        <Route path="/cars/edit/:id" element={<AddCar />}></Route>
      </Routes>
    </Provider>
  );
}

export default App;
