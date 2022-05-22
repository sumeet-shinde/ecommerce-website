import axios from "axios";
import { getCartData } from "../Cart/action";

export const ADD_ORDER = "ADD_ORDER";
export const ADD_ORDER_LOADING = "ADD_ORDER_LOADING";
export const ADD_ORDER_ERROR = "ADD_ORDER_ERROR";

export const addOrder = (orders) => ({ type: ADD_ORDER, payload: orders });
export const addOrderLoading = () => ({ type: ADD_ORDER_LOADING });
export const addOrderError = () => ({ type: ADD_ORDER_ERROR });

export const addOrderRequest =
  (UserID, Cart, CardType, CardNumber, Expire, CardCvv, purchaseDate) =>
  async (dispatch) => {
    dispatch(addOrderLoading());
    dispatch(updatePaymentRequest(UserID, Cart, purchaseDate));
    await axios
      .post("https://ecommerce-backend-db.herokuapp.com/orders/addOrder", {
        userID: UserID,
        cardType: CardType,
        cardNumber: CardNumber,
        cardExpiryDate: Expire,
        cardCvv: CardCvv,
        payment: true,
        cart: Cart,
        datetime: purchaseDate,
      })
      .then((res) => {})
      .catch((err) => {
        dispatch(addOrderError());
        console.log(err);
      });
  };

export const updatePaymentRequest =
  (userID, Cart, purchaseDate) => async (dispatch) => {
    dispatch(addOrderLoading());
    {
      Cart.map((e) => {
        const id = e._id;
        axios
          .patch(
            `https://ecommerce-backend-db.herokuapp.com/carts/updateProductCartPayment/${id}`,
            {
              payment: true,
              purchaseDate: purchaseDate,
            }
          )
          .then((res) => {})
          .catch((err) => {
            dispatch(addOrderError());
            console.log(err);
          });
      });
    }
    window.location.href = "https://ecommerce-website-lake.vercel.app/";
    await dispatch(getCartData(userID));
  };

export const getOrderData = (id) => async (dispatch) => {
  dispatch(addOrderLoading());
  axios
    .get(`https://ecommerce-backend-db.herokuapp.com/carts/getOrderCart/${id}`)
    .then(({ data }) => {
      dispatch(addOrder(data));
    })
    .catch((err) => {
      dispatch(addOrderError());
      console.log(err);
    });
};
