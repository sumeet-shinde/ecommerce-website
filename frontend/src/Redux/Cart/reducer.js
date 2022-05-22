import { CART_ERROR, CART_LOADING, GET_CART } from "./action";

const initState = {
  cart: [],
  loading: false,
  error: false,
};

export const CartReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case GET_CART:
      return { ...store, cart: payload, loading: false, error: false };

    case CART_LOADING:
      return { ...store, loading: true };

    case CART_ERROR:
      return { ...store, error: true };

    default:
      return store;
  }
};
