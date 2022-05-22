import { ADD_ORDER, ADD_ORDER_ERROR, ADD_ORDER_LOADING } from "./action";

const initState = {
  orders: [],
  loading: false,
  error: false,
};

export const OrdersReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case ADD_ORDER:
      return { ...store, orders: payload, loading: false, error: false };

    case ADD_ORDER_LOADING:
      return { ...store, loading: true };

    case ADD_ORDER_ERROR:
      return { ...store, error: true };

    default:
      return store;
  }
};
