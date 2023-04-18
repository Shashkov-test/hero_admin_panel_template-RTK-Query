/* import { createStore, combineReducers, compose, applyMiddleware } from "redux"; */
import { configureStore } from "@reduxjs/toolkit";
/* import ReduxThunk from "redux-thunk"; */
import heroes from "../components/heroesList/heroesSlice";
import filters from "../components/heroesFilters/heroesFiltersSlice";

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

/* const enhancer =
  (createStore) =>
  (...args) => {
    const store = createStore(...args);

    const oldDispatch = store.dispatch;

    store.dispatch = (action) => {
      if (typeof action === "string") {
        return oldDispatch({
          type: action,
        });
      }
      return oldDispatch(action);
    };
    return store;
  }; */

/* const rootReducer = combineReducers({ heroes, filters }); */

const store = configureStore({
  reducer: {
    heroes,
    filters,
  },
  middleware: (curryGetDefaultMiddleware) =>
    curryGetDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV != "production",
});

/* const store = createStore(
  rootReducer,
  compose(
    enhancer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  compose(
    applyMiddleware(ReduxThunk, stringMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
); */

export default store;
