import axios from "axios";

export const GET_USERS = "GET_USERS";
export const GET_USERS_LOADING = "GET_USERS_LOADING";
export const GET_USERS_ERROR = "GET_USERS_ERROR";

export const getUsers = (users) => ({ type: GET_USERS, payload: users });
export const getUsersLoading = () => ({ type: GET_USERS_LOADING });
export const getUsersError = () => ({ type: GET_USERS_ERROR });

export const getUsersRequest = (id) => (dispatch) => {
  dispatch(getUsersLoading());

  axios
    .get(`https://ecommerce-backend-db.herokuapp.com/users/getUser/${id}`)
    .then(({ data }) => {
      dispatch(getUsers(data));
    })
    .catch((err) => {
      dispatch(getUsersError());
      console.log(err);
    });
};

export const registerUserRequest =
  (Name, Email, Password) => async (dispatch) => {
    dispatch(getUsersLoading());
    axios
      .post("https://ecommerce-backend-db.herokuapp.com/register", {
        name: Name,
        email: Email,
        password: Password,
      })
      .then((res) => {
        alert("You have been succesfully registered");
        window.location.href =
          "https://ecommerce-website-lake.vercel.app/login";
      })
      .catch((err) => {
        console.log(err);
        dispatch(getUsersError());
      });
  };

export const addUsersAddressRequest =
  (id, Address, City, State, Pincode) => (dispatch) => {
    dispatch(getUsersLoading());

    axios
      .patch(
        `https://ecommerce-backend-db.herokuapp.com/users/addAddress/${id}`,
        {
          address: Address,
          city: City,
          state: State,
          pincode: Pincode,
        }
      )
      .then(({ data }) => {
        dispatch(getUsers(data));
      })
      .catch((err) => {
        dispatch(getUsersError());
        console.log(err);
      });
  };

export const addCancelRequest = (id) => (dispatch) => {
  dispatch(getUsersLoading());

  axios
    .patch(
      `https://ecommerce-backend-db.herokuapp.com/carts/ProductCartCancelRequest/${id}`,
      {
        requestCancel: true,
      }
    )
    .then(({ data }) => {
      dispatch(getUsers(data));
    })
    .catch((err) => {
      dispatch(getUsersError());
      console.log(err);
    });
};

export const cancelProductRequest = (id) => (dispatch) => {
  dispatch(getUsersLoading());

  axios
    .patch(
      `https://ecommerce-backend-db.herokuapp.com/carts/ProductCartCancel/${id}`,
      {
        cancelStatus: "Cancelled",
      }
    )
    .then(({ data }) => {
      dispatch(getUsers(data));
    })
    .catch((err) => {
      dispatch(getUsersError());
      console.log(err);
    });
};
