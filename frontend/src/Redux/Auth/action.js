import axios from "axios";

export const GET_AUTH = "GET_AUTH";
export const GET_AUTH_LOADING = "GET_AUTH_LOADING";
export const GET_AUTH_ERROR = "GET_AUTH_ERROR";

export const getAuthorised = (auth) => ({ type: GET_AUTH, payload: auth });
export const getAuthorisedLoading = () => ({
  type: GET_AUTH_LOADING,
});
export const getAuthorisedError = () => ({
  type: GET_AUTH_ERROR,
});

export const getAuthorisedRequest = (Email, Password) => async (dispatch) => {
  dispatch(getAuthorisedLoading());
  axios
    .post("https://ecommerce-backend-db.herokuapp.com/login", {
      email: Email,
      password: Password,
    })
    .then(({ data }) => {
      let id = data.user._id;
      let token = data.token;
      localStorage.setItem("userid", JSON.stringify(id));
      localStorage.setItem("token", JSON.stringify(token));
    })
    .catch((err) => {
      dispatch(getAuthorisedError());
      alert("Please check you email and password.");
      console.log(err);
    });
};
