import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { LoginReducer } from "./Auth/reducer";
import { CartReducer } from "./Cart/reducer";
import { OrdersReducer } from "./Orders/reducer";
import { ProductReducer } from "./Products/reducer";
import { UsersReducer } from "./Users/reducer";

const rootReducer = combineReducers({
  product: ProductReducer,
  carts: CartReducer,
  user: UsersReducer,
  order: OrdersReducer,
  login: LoginReducer,
});

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
