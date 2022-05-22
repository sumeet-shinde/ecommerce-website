import { GET_USERS, GET_USERS_LOADING, GET_USERS_ERROR } from "./action";

const initState = {
  users: [],
  loading: false,
  error: false,
};

export const UsersReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case GET_USERS:
      return { ...store, users: payload, loading: false, error: false };

    case GET_USERS_LOADING:
      return { ...store, loading: true };

    case GET_USERS_ERROR:
      return { ...store, error: true };

    default:
      return store;
  }
};
