import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuthorised, getAuthorisedRequest } from "../../Redux/Auth/action";
import "./LoginPage.css";
import BrandImage from "./Shopify.png";
import axios from "axios";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store.login);

  const handleLogin = async () => {
    axios
      .post("https://ecommerce-backend-db.herokuapp.com/login", {
        email: email,
        password: pass,
      })
      .then(({ data }) => {
        dispatch(getAuthorised(true));
        let id = data.user._id;
        let token = data.token;
        localStorage.setItem("userid", JSON.stringify(id));
        localStorage.setItem("token", JSON.stringify(token));
        navigate("/");
      })
      .catch((err) => {
        alert("Please check you email and password.");
        console.log(err);
      });
  };

  return (
    <div className="LoginContainer">
      <div className="LoginDiv">
        <img src={BrandImage} alt="" className="LoginImage" />
        <input
          type="email"
          className="emailInput"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <input
          type="password"
          className="passwordInput"
          placeholder="Enter Password"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
        <br />
        <button
          className="LoginButton"
          disabled={!email || !pass}
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="RegisterButton"
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};
