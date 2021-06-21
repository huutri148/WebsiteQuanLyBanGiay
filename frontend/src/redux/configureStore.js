import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose;

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  Cart: {
    cartItems: cartItemsFromStorage,
  },
};
const configureStore = () => {
  const middlewares = [thunk];
  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers)
  );

  return store;
};
export default configureStore;
