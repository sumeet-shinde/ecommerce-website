import BrandImage from "./Shopify.png";
import "./AddressPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUsersAddressRequest,
  getUsersRequest,
} from "../../Redux/Users/action";
import { useNavigate } from "react-router-dom";
import { getAuthorised } from "../../Redux/Auth/action";

export const AddressPage = () => {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((store) => store.user);

  const handleSubmitAddress = async () => {
    let address = address1 + ", " + address2;
    let id = JSON.parse(localStorage.getItem("userid"));
    await dispatch(addUsersAddressRequest(id, address, city, state, pincode));
    navigate("/payment");
  };

  return (
    <div>
      <div className="HeaderDiv">
        <img
          src={BrandImage}
          className="BrandName"
          alt=""
          onClick={() => {
            navigate("/");
          }}
        />
        <div className="SignAddressDiv">
          <h3>Welcome, {users.name}</h3>
        </div>
      </div>

      <div className="FormDiv">
        <div className="FormHeaderDiv">
          <p>Address</p>
        </div>
        <table className="Formtable">
          <tbody>
            <tr>
              <td>
                <p className="FormLabel">Address line 1:</p>
              </td>
              <td>
                <input
                  className="FormInput"
                  type="text"
                  value={address1}
                  onChange={(e) => {
                    setAddress1(e.target.value);
                  }}
                  placeholder="Enter Address Line 1"
                />
              </td>
            </tr>
            <tr>
              <td>
                <p className="FormLabel">Address line 2:</p>
              </td>
              <td>
                <input
                  className="FormInput"
                  type="text"
                  value={address2}
                  onChange={(e) => {
                    setAddress2(e.target.value);
                  }}
                  placeholder="Enter Address Line2"
                />
              </td>
            </tr>
            <tr>
              <td>
                <p className="FormLabel">City:</p>
              </td>
              <td>
                <input
                  className="FormInput"
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  placeholder="City"
                />
              </td>
            </tr>
            <tr>
              <td>
                <p className="FormLabel">State:</p>
              </td>
              <td>
                <input
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                  className="FormInput"
                  type="text"
                  placeholder="State"
                />
              </td>
            </tr>
            <tr>
              <td>
                <p className="FormLabel">Pincode:</p>
              </td>
              <td>
                <input
                  className="FormInput"
                  type="text"
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value);
                  }}
                  placeholder="Pincode"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          disabled={!address1 || !address2 || !city || !state || !pincode}
          className="ProceedButton"
          onClick={handleSubmitAddress}
        >
          PROCEED PAYMENT
        </button>
      </div>
    </div>
  );
};
