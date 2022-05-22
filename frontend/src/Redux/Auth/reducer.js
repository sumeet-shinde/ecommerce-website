import { GET_AUTH, GET_AUTH_LOADING, GET_AUTH_ERROR } from "./action";

const initState = {
  auth: false,
  auth_loading: false,
  auth_error: false,
};

export const LoginReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case GET_AUTH:
      return {
        ...store,
        auth: payload,
        auth_loading: false,
        auth_error: false,
      };

    case GET_AUTH_LOADING:
      return { ...store, auth_loading: true };

    case GET_AUTH_ERROR:
      return { ...store, auth_error: true };

    default:
      return store;
  }
};
