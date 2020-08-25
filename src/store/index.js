import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { loadFromApi } from "./covid-actions";
import { login, logout, signup } from "./user-actions";
import userSaga from "./user-saga";
import covidSaga from "./covid-saga";
import userSlice from "./user-slice";
import covidSlice from "./covid-slice";

const sagaMware = createSagaMiddleware();

let store = null;

const getStore = () => {
  if (store) {
    return store;
  }
  store = configureStore({
    reducer: { user: userSlice.reducer, covid: covidSlice.reducer },
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: [
            loadFromApi.toString(),
            login.toString(),
            logout.toString(),
            signup.toString(),
          ],
        },
      }),
      sagaMware,
    ],
    devTools: process.env.NODE_ENV !== "production",
  });

  const rootSaga = function* () {
    yield all([userSaga(), covidSaga()]);
  };

  sagaMware.run(rootSaga);

  store.destroy = () => {
    store = null;
  };

  return store;
};

export default getStore;
