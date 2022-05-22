import {
  GET_PRODUCTS,
  GET_PRODUCTS_CATEGORY,
  GET_SINGLE_PRODUCT,
  PRODUCTS_ERROR,
  PRODUCTS_LOADING,
  SEARCH_PRODUCTS,
} from "./action";

const initState = {
  products: [],
  searchResults: [],
  category: "clothing",
  singleProduct: [],
  loading: true,
  error: false,
};

export const ProductReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS:
      return { ...store, products: payload, loading: false, error: false };

    case SEARCH_PRODUCTS:
      return { ...store, searchResults: payload, loading: false, error: false };

    case GET_PRODUCTS_CATEGORY:
      return { ...store, category: payload, loading: false, error: false };

    case GET_SINGLE_PRODUCT:
      return { ...store, singleProduct: payload, loading: false, error: false };

    case PRODUCTS_LOADING:
      return { ...store, loading: true };

    case PRODUCTS_ERROR:
      return { ...store, error: true };

    default:
      return store;
  }
};
