import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuthorised } from "../../Redux/Auth/action";
import {
  getCart,
  getCartData,
  handleCartDeleteRequest,
  handleCartQuantityMinusRequest,
  handleCartQuantityPlusRequest,
} from "../../Redux/Cart/action";
import { getUsersRequest } from "../../Redux/Users/action";
import "./CartPage.css";
import BrandImage from "./Shopify.png";
import UserIcon from "./User.png";

export const CartPage = () => {
  const { cart } = useSelector((store) => store.carts);
  const { users } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store.login);
  const user_id = JSON.parse(localStorage.getItem("userid"));

  useEffect(() => {
    if (user_id) {
      const loadCartData = async () => {
        await dispatch(getCartData(user_id));
        await dispatch(getAuthorised(true));
      };
      loadCartData();
      handleUsersAddress();
    } else {
      dispatch(getCart([]));
    }
  }, [dispatch]);

  const handleIncreament = async (userID, cartID, Quantity, Price) => {
    dispatch(handleCartQuantityPlusRequest(userID, cartID, Quantity, Price));
  };

  const handleDecreament = async (userID, cartID, Quantity, Price) => {
    dispatch(handleCartQuantityMinusRequest(userID, cartID, Quantity, Price));
  };

  const handleDelete = async (userID, ID) => {
    dispatch(handleCartDeleteRequest(userID, ID));
  };

  const handleUsersAddress = async () => {
    let id = JSON.parse(localStorage.getItem("userid"));
    await dispatch(getUsersRequest(id));
  };

  const handleTotalPrice = () => {
    if (cart.length === 0) {
      return 0;
    }
    let tp = 0;
    cart.map((e) => {
      tp = tp + e.totalPrice;
    });
    return tp;
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
        <div className="SignCartDiv">
          {auth && <h3>Welcome, {users.name}</h3>}
          {!auth && (
            <>
              <h3>Sign In</h3>&nbsp;&nbsp;
              <img style={{ paddingTop: "8px" }} src={UserIcon} alt="" />
            </>
          )}
        </div>
      </div>
      <div className="CartContainerDiv">
        <div className="CartDivision">
          <div className="CartHeaderDiv">
            <p>Cart Items ({cart.length})</p>
          </div>
          <div className="CartItemsDiv">
            {cart.map((e, id) => {
              return (
                <div key={id} className="CartItemDivision">
                  <div>
                    <img className="CartItemImage" src={e.image} alt="" />
                  </div>
                  <div className="CartItemSecondDiv">
                    <div>
                      <p className="CartItemName">{e.productName}</p>
                      <p className="CartItemColor">Color: {e.color}</p>
                      <p className="CartItemPrice">Rs. {e.totalPrice}</p>
                    </div>
                    <div>
                      <button
                        className="CartItemPlusButton"
                        onClick={() => {
                          let id = JSON.parse(localStorage.getItem("userid"));
                          handleIncreament(id, e._id, e.quantity, e.price);
                        }}
                      >
                        +
                      </button>
                      &nbsp;&nbsp;&nbsp;
                      <span>{e.quantity}</span>&nbsp;&nbsp;&nbsp;
                      <button
                        className="CartItemMinusButton"
                        disabled={e.quantity === 1}
                        onClick={() => {
                          let id = JSON.parse(localStorage.getItem("userid"));
                          handleDecreament(id, e._id, e.quantity, e.price);
                        }}
                      >
                        -
                      </button>
                    </div>
                    <div>
                      <button
                        className="CartItemRemoveButton"
                        onClick={() => {
                          let id = JSON.parse(localStorage.getItem("userid"));
                          handleDelete(id, e._id);
                        }}
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="CartTotalPriceDiv">
          <div className="CartTotalPriceHeader">
            <p>PRICE DETAILS</p>
          </div>
          <div className="CartTotalPriceDetails">
            <div>
              <p>Price</p>
              <p>₹{handleTotalPrice()}/-</p>
            </div>
            <div>
              <p>Delivery Charges</p>
              <p>FREE</p>
            </div>
            <div>
              <p>Total Amount</p>
              <p>₹{handleTotalPrice()}/-</p>
            </div>
          </div>
          <button
            className="PlaceOrderButton"
            disabled={cart.length === 0}
            onClick={() => {
              if (users.address) {
                navigate("/payment");
              } else {
                navigate("/address");
              }
            }}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};
