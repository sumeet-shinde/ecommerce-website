import axios from "axios";

export const GET_CART = "GET_CART";
export const CART_LOADING = "CART_LOADING";
export const CART_ERROR = "CART_ERROR";

export const getCart = (cart) => ({ type: GET_CART, payload: cart });
export const getCartLoading = () => ({ type: CART_LOADING });
export const getCartError = () => ({ type: CART_ERROR });

export const getCartData = (id) => (dispatch) => {
  dispatch(getCartLoading());
  axios
    .get(`https://ecommerce-backend-db.herokuapp.com/carts/getCart/${id}`)
    .then(({ data }) => {
      let d = data;
      dispatch(getCart(d));
    })
    .catch((err) => {
      dispatch(getCartError());
      console.log(err);
    });
};

export const addProductToCart = (ID, item) => async (dispatch) => {
  const { name, price, size, color, image, category, gender } = item;
  axios
    .post(`https://ecommerce-backend-db.herokuapp.com/carts/addProductCart`, {
      userID: ID,
      productName: name,
      price: price,
      totalPrice: price,
      size: size,
      color: color,
      image: image,
      category: category,
      gender: gender,
      quantity: 1,
    })
    .then(({ data }) => {
      dispatch(getCartData(ID));
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const addItemCart = (id, cartItem) => async (dispatch) => {
//   axios
//     .post(`https://ecommerce-backend-db.herokuapp.com/carts/${id}`, {
//       cart: cartItem,
//     })
//     .then(({ data }) => {
//       let c = data.cart;
//       dispatch(getCart(c));
//     })
//     .catch((err) => {
//       dispatch(getCartError());
//       console.log(err);
//     });
// };

export const handleCartQuantityPlusRequest =
  (userID, cartID, Quantity, Price) => async (dispatch) => {
    dispatch(getCartLoading());
    axios
      .patch(
        `https://ecommerce-backend-db.herokuapp.com/carts/updateProductCartQuantity/${cartID}`,
        {
          quantity: Quantity + 1,
          totalPrice: (Quantity + 1) * Price,
        }
      )
      .then((res) => {
        dispatch(getCartData(userID));
      })
      .catch((err) => {
        dispatch(getCartError());
        console.log(err);
      });
  };

export const handleCartQuantityMinusRequest =
  (userID, cartID, Quantity, Price) => async (dispatch) => {
    dispatch(getCartLoading());
    axios
      .patch(
        `https://ecommerce-backend-db.herokuapp.com/carts/updateProductCartQuantity/${cartID}`,
        {
          quantity: Quantity - 1,
          totalPrice: (Quantity - 1) * Price,
        }
      )
      .then((res) => {
        dispatch(getCartData(userID));
      })
      .catch((err) => {
        dispatch(getCartError());
        console.log(err);
      });
  };

export const handleCartDeleteRequest = (userID, cartID) => async (dispatch) => {
  dispatch(getCartLoading());
  axios
    .delete(
      `https://ecommerce-backend-db.herokuapp.com/carts/deleteCartProduct/${cartID}`
    )
    .then((res) => {
      dispatch(getCartData(userID));
    })
    .catch((err) => {
      dispatch(getCartError());
      console.log(err);
    });
};
