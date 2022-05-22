import "./PaymentPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartData } from "../../Redux/Cart/action";
import BrandImage from "./Shopify.png";
import { addOrderRequest } from "../../Redux/Orders/action";
import { useNavigate } from "react-router-dom";
import { getAuthorised } from "../../Redux/Auth/action";

export const PaymentPage = () => {
  const { cart } = useSelector((store) => store.carts);
  const { auth } = useSelector((store) => store.login);
  const { users } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate1, setExpiryDate1] = useState("");
  const [expiryDate2, setExpiryDate2] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [otp, setOtp] = useState("");
  const ot = "1234";

  useEffect(() => {
    let user_id = JSON.parse(localStorage.getItem("userid"));
    const loadCartData = async () => {
      await dispatch(getCartData(user_id));
      loadCartData();
    };
  }, [dispatch]);

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

  const handlePayNow = () => {
    if (cardNumber.length !== 16) {
      return alert("Please enter 16-digit number");
    }

    if (expiryDate1.length !== 5 || expiryDate1.length !== 5) {
      return alert("Please enter valid date.");
    }

    if (cardCvv.length < 2 && cardCvv.length > 4) {
      return alert("Please enter valid CVV.");
    }

    let m = new Date().getMonth() + 1;
    let y = new Date().getFullYear() - 2000;
    let mon1 = +expiryDate1.substring(0, 2);
    let mon2 = +expiryDate2.substring(0, 2);
    let year1 = +expiryDate1.substring(3);
    let year2 = +expiryDate2.substring(3);

    if (mon1 > 12 || mon2 > 12) {
      return alert("Please enter valid date.");
    }

    if (year2 < year1) {
      return alert("Please enter valid date.");
    }

    if (m > mon2 || y > year2) {
      return alert("Your card has been expired.");
    }

    if (otp === "") {
      document.querySelector(".OtpDiv").style.display = "flex";
      return alert("Your OTP is 1234. Please enter OTP.");
    }

    if (otp !== ot) {
      return alert("Please enter valid OTP.");
    }

    let date = new Date().toLocaleString();
    let expire = expiryDate1 + " - " + expiryDate2;
    let id = JSON.parse(localStorage.getItem("userid"));
    dispatch(
      addOrderRequest(id, cart, cardType, cardNumber, expire, cardCvv, date)
    );

    alert(
      "Your Order has been placed Successfully, it will deliver to you 5-7 working days."
    );
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
        <div className="SignPaymentDiv">
          <h3>Welcome, {users.name}</h3>
        </div>
      </div>

      <div className="ReviewContainerDiv">
        <div className="CartReviewDiv">
          <div className="CartReviewHeader">
            <p>Review Order</p>
          </div>
          <div className="CartReviewItemDiv">
            {cart.map((e, id) => {
              return (
                <div key={id} className="CartReviewItemDivision">
                  <div>
                    <img className="CartReviewItemImage" src={e.image} alt="" />
                  </div>
                  <div className="CartReviewItemSecondDiv">
                    <div>
                      <p className="CartReviewItemName">{e.productName}</p>
                      <p className="CartReviewItemColor">Color: {e.color}</p>
                      <p className="CartReviewItemPrice">Rs. {e.totalPrice}</p>
                    </div>
                    <div>
                      <p>Quantity: {e.quantity}</p>
                    </div>
                    <div>
                      <p>Category: {e.category}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="CardDiv">
          <div className="CardHeader">
            <p>CARD DETAILS</p>
          </div>
          <div className="CardDetails">
            <div>
              <p>Delivery Charges</p>
              <p>FREE</p>
            </div>
            <div>
              <p>Total Amount</p>
              <p>₹{handleTotalPrice()}/-</p>
            </div>
            <div className="CardDetailsDivision">
              <div>
                <p>Select Card Type:</p>
                <select
                  name=""
                  id=""
                  className="CardSelect"
                  value={cardType}
                  onChange={(e) => {
                    setCardType(e.target.value);
                  }}
                >
                  <option value=""></option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                </select>
              </div>
              <div>
                <p>Enter Card Number: </p>
                <input
                  type="text"
                  placeholder="Enter Card Number"
                  className="CardNumberInput"
                  value={cardNumber}
                  onChange={(e) => {
                    setCardNumber(e.target.value);
                  }}
                />
              </div>
              <div>
                <p>Expiry Date: </p>
                <input
                  type="text"
                  placeholder="07/19"
                  className="CardExpiryInput"
                  value={expiryDate1}
                  onChange={(e) => {
                    setExpiryDate1(e.target.value);
                  }}
                />
                &nbsp;-&nbsp;
                <input
                  type="text"
                  placeholder="12/22"
                  className="CardExpiryInput"
                  value={expiryDate2}
                  onChange={(e) => {
                    setExpiryDate2(e.target.value);
                  }}
                />
              </div>
              <div>
                <p>Enter CVV: </p>
                <input
                  type="password"
                  placeholder="Enter CVV"
                  className="CardCVVInput"
                  value={cardCvv}
                  onChange={(e) => {
                    setCardCvv(e.target.value);
                  }}
                />
              </div>
              <div className="OtpDiv">
                <p>Enter OTP: </p>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="CardCVVInput"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <button
            className="PaymentButton"
            disabled={cart.length === 0}
            onClick={() => {
              handlePayNow();
            }}
          >
            PAY NOW
          </button>
        </div>
      </div>
    </div>
  );
};
