import { all, put, takeLatest, call } from "redux-saga/effects";
import {
  login as loginAction,
  logout as logoutAction,
  signup as signupAction,
  setToken,
  setLoading,
} from "./user-actions";
import {
  login as loginService,
  logout as logoutService,
  signup as signupService,
} from "../api";

const login = function* (action) {
  try {
    yield put(setLoading(true));
    const {
      payload: { username, password, onSuccess },
    } = action;
    const res = yield loginService(username, password);
    yield put(setToken(res.data.token));
    yield call(onSuccess, res);
  } catch (err) {
    console.error(`Sign-up error: ${err.message}`);
    yield call(action.payload.onFail, err);
  } finally {
    yield put(setLoading(false));
  }
};

const logout = function* (action) {
  try {
    yield put(setLoading(true));
    yield call(logoutService);
    yield put(setToken(""));
    yield call(action.payload.onSuccess);
  } catch (err) {
    console.error(`Logout error: ${err.message}`);
    yield call(action.payload.onFail);
  } finally {
    yield put(setLoading(false));
  }
};

const signup = function* (action) {
  try {
    yield put(setLoading(true));
    const {
      payload: { username, password, onSuccess },
    } = action;
    yield signupService(username, password); //no-verify-email
    yield call(onSuccess);
  } catch (err) {
    console.error(`Login-error: ${err.message}`);
    yield call(action.payload.onFail, err);
  } finally {
    yield put(setLoading(false));
  }
};

const watchForLogin = function* () {
  yield takeLatest(loginAction.toString(), login);
};

const watchForLogout = function* () {
  yield takeLatest(logoutAction.toString(), logout);
};

const watchForSignup = function* () {
  yield takeLatest(signupAction.toString(), signup);
};

const userSaga = function* () {
  yield all([watchForLogin(), watchForLogout(), watchForSignup()]);
};

export default userSaga;
