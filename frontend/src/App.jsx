import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { AddressPage } from "./Components/AddressPage/AddressPage";
import { CartPage } from "./Components/CartPage/CartPage";
import { HomePage } from "./Components/HomePage/HomePage";
import { LoginPage } from "./Components/LoginPage/LoginPage";
import { OrdersPage } from "./Components/OrdersPage/OrdersPage";
import { PaymentPage } from "./Components/PaymentPage/PaymentPage";
import { ProductsPage } from "./Components/ProductsPage/ProductsPage";
import { RegisterPage } from "./Components/RegisterPage/RegisterPage";
import { SingleProductPage } from "./Components/SingleProductPage/SingleProductPage";
import { getAuthorised } from "./Redux/Auth/action";

function App() {
  const { auth } = useSelector((store) => store.login);

  const PrivateRoute = ({ auth, children }) => {
    return auth ? children : <Navigate to="/" />;
  };

  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/productsPage"} element={<ProductsPage />} />
        <Route path={"/singleProduct"} element={<SingleProductPage />} />
        <Route path={"/cart"} element={<CartPage />} />
        <Route
          path={"/address"}
          element={
            <PrivateRoute auth={auth}>
              <AddressPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/payment"}
          element={
            <PrivateRoute auth={auth}>
              <PaymentPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/orders"}
          element={
            <PrivateRoute auth={auth}>
              <OrdersPage />
            </PrivateRoute>
          }
        />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
