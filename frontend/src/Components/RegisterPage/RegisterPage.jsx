import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUserRequest } from "../../Redux/Users/action";
import "./RegisterPage.css";
import BrandImage from "./Shopify.png";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = () => {
    if (pass.length < 6) {
      return alert("Enter password of more than 6 characters.");
    }
    dispatch(registerUserRequest(name, email, pass));
  };
  return (
    <div className="RegisterContainer">
      <div className="RegisterDiv">
        <img src={BrandImage} alt="" className="RegisterImage" />
        <input
          type="text"
          className="registerNameInput"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
        <input
          type="email"
          className="registerEmailInput"
          value={email}
          placeholder="Enter Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <br />
        <input
          type="password"
          className="registerPasswordInput"
          value={pass}
          placeholder="Enter Password"
          onChange={(e) => {
            setPass(e.target.value);
          }}
          required
        />
        <br />
        <button
          className="RegButton"
          disabled={!name || !email || !pass}
          onClick={handleRegister}
        >
          Register
        </button>
        <button
          className="LogButton"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};
