import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const PRODUCTS_LOADING = "PRODUCTS_LOADING";
export const PRODUCTS_ERROR = "PRODUCTS_ERROR";
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
export const GET_PRODUCTS_CATEGORY = "GET_PRODUCTS_CATEGORY";
export const GET_SINGLE_PRODUCT = "GET_SINGLE_PRODUCT";

export const getProducts = (products) => ({
  type: GET_PRODUCTS,
  payload: products,
});
export const getProductsLoading = () => ({ type: PRODUCTS_LOADING });
export const getProductsError = () => ({ type: PRODUCTS_ERROR });
export const getProductsBySearch = (searchResults) => ({
  type: SEARCH_PRODUCTS,
  payload: searchResults,
});
export const getProductsByCategory = (category) => ({
  type: GET_PRODUCTS_CATEGORY,
  payload: category,
});
export const getSingleProduct = (singleProduct) => ({
  type: GET_SINGLE_PRODUCT,
  payload: singleProduct,
});

// export const getProductsRequest = () => async (dispatch) => {
//   dispatch(getProductsLoading());
//   axios
//     .get("https://ecommerce-backend-db.herokuapp.com/products")
//     .then((res) => {
//       let data = res.data;
//       dispatch(getProducts(data));
//     })
//     .catch((err) => {
//       dispatch(getProductsError());
//       console.log(err);
//     });
// };

export const getProductsSortingRequest =
  (sorting, Category) => async (dispatch) => {
    dispatch(getProductsLoading());
    axios
      .get(
        `https://ecommerce-backend-db.herokuapp.com/products/getProductsSorting/${Category}/${sorting}`
      )
      .then((res) => {
        let data = res.data;
        dispatch(getProducts(data));
      })
      .catch((err) => {
        dispatch(getProductsError());
        console.log(err);
      });
  };

export const getProductsLimitRequest =
  (low, high, Category) => async (dispatch) => {
    dispatch(getProductsLoading());
    axios
      .get(
        `https://ecommerce-backend-db.herokuapp.com/products/getProductsPriceRange/${Category}/${low}/${high}`
      )
      .then((res) => {
        let data = res.data;
        dispatch(getProducts(data));
      })
      .catch((err) => {
        dispatch(getProductsError());
        console.log(err);
      });
  };

export const getProductsGenderRequest =
  (Gender, Category) => async (dispatch) => {
    dispatch(getProductsLoading());
    axios
      .get(
        `https://ecommerce-backend-db.herokuapp.com/products/getProductsGender/${Category}/${Gender}`
      )
      .then((res) => {
        let data = res.data;
        dispatch(getProducts(data));
      })
      .catch((err) => {
        dispatch(getProductsError());
        console.log(err);
      });
  };

export const getProductsColorRequest =
  (Color, Category) => async (dispatch) => {
    dispatch(getProductsLoading());
    axios
      .get(
        `https://ecommerce-backend-db.herokuapp.com/products/getProductsColor/${Category}/${Color}`
      )
      .then((res) => {
        let data = res.data;
        dispatch(getProducts(data));
      })
      .catch((err) => {
        dispatch(getProductsError());
        console.log(err);
      });
  };

export const getProductsSizeRequest = (Size, Category) => async (dispatch) => {
  dispatch(getProductsLoading());
  axios
    .get(
      `https://ecommerce-backend-db.herokuapp.com/products/getProductsSize/${Category}/${Size}`
    )
    .then((res) => {
      let data = res.data;
      dispatch(getProducts(data));
    })
    .catch((err) => {
      dispatch(getProductsError());
      console.log(err);
    });
};

export const getProductsSearchRequest = (Name) => async (dispatch) => {
  dispatch(getProductsLoading());
  axios
    .get(`https://ecommerce-backend-db.herokuapp.com/products?name=${Name}`)
    .then((res) => {
      let data = res.data;
      dispatch(getProductsBySearch(data));
    })
    .catch((err) => {
      dispatch(getProductsError());
      console.log(err);
    });
};

export const getProductsByCategoryRequest = (Name) => async (dispatch) => {
  dispatch(getProductsLoading());
  axios
    .get(
      `https://ecommerce-backend-db.herokuapp.com/products/getProductsCategory/${Name}`
    )
    .then((res) => {
      let data = res.data;
      dispatch(getProducts(data));
    })
    .catch((err) => {
      dispatch(getProductsError());
      console.log(err);
    });
};

export const getSingleProductRequest = (id) => async (dispatch) => {
  dispatch(getProductsLoading());
  axios
    .get(
      `https://ecommerce-backend-db.herokuapp.com/products/getSingleProduct/${id}`
    )
    .then((res) => {
      let data = res.data;
      dispatch(getSingleProduct(data));
    })
    .catch((err) => {
      dispatch(getProductsError());
      console.log(err);
    });
};
