import { put, takeLatest, call, select } from "redux-saga/effects";
import { loadFromApi, setLoading, setData } from "./covid-actions";
import { loadCovidData } from "../api";

const loadData = function* (action) {
  try {
    const token = yield select(({ user }) => user.token);
    if (!token) {
      throw new Error("User not authenticated!");
    }
    yield put(setLoading(true));
    const res = yield loadCovidData();
    yield put(setData(res.data));
  } catch (err) {
    console.error(`Data-fetching-error: ${err.message}`);
    if (action.payload?.onFail) {
      yield call(action.payload.onFail, err);
    }
  } finally {
    yield put(setLoading(false));
  }
};

const watchForLoad = function* (...args) {
  yield takeLatest(loadFromApi.toString(), loadData);
};

const covidSaga = function* () {
  yield watchForLoad();
};

export default covidSaga;
