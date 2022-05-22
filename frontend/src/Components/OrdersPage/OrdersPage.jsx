import BrandImage from "./Shopify.png";
import "./OrdersPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOrderData } from "../../Redux/Orders/action";
import { useNavigate } from "react-router-dom";
import { addCancelRequest, getUsersRequest } from "../../Redux/Users/action";

export const OrdersPage = () => {
  const { users } = useSelector((store) => store.user);
  const { orders } = useSelector((store) => store.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const user_id = JSON.parse(localStorage.getItem("userid"));
    const handleOrderData = async () => {
      await dispatch(getOrderData(user_id));
      await dispatch(getUsersRequest(user_id));
    };
    handleOrderData();
  }, [dispatch, count]);

  const handleCancelRequest = async (id) => {
    let text = "Do you want to cancel this delivery?";
    if (confirm(text)) {
      await dispatch(addCancelRequest(id));
      setCount(count + 1);
      alert("Your cancellation is in progress.");
    }
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
        <div className="SignOrderDiv">
          <h3>Welcome, {users.name}</h3>
        </div>
      </div>
      <div className="OrdersDiv">
        <div className="OrdersItemDiv">
          {orders.map((e, id) => {
            let d = e.purchaseDate;
            let date = new Date(d);
            let today = date.setDate(date.getDate() + 7);
            let t = new Date(today).toDateString();
            return (
              <div key={id}>
                <div className="OrItemDiv">
                  <img src={e.image} alt="" />
                  <div className="OrderSecondDiv">
                    <div>
                      <h4>{e.productName}</h4>
                      <p>Color: {e.color}</p>
                    </div>
                    <div>
                      <p>Rs. {e.totalPrice}</p>
                    </div>
                    <div>
                      <p>Quantity: {e.quantity}</p>
                    </div>
                    <div>
                      <p>Expected Delivery: {t}</p>
                      {e.requestCancel && (
                        <button
                          className="CancelBtn"
                          disabled
                          style={{ background: "red" }}
                        >
                          REQUESTED TO CANCEL
                        </button>
                      )}
                      {!e.requestCancel && (
                        <>
                          <p>
                            If you don't want delivery?
                            <br /> Click on cancel button.
                          </p>
                          <button
                            className="CancelBtn"
                            onClick={() => {
                              let id = e._id;
                              handleCancelRequest(id);
                            }}
                          >
                            CANCEL
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="DivLine"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
