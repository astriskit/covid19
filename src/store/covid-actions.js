import { createAction } from "@reduxjs/toolkit";

export const setData = createAction("covid/set-data");
export const setLoading = createAction("covid/set-loading");
export const loadFromApi = createAction("covid/load-from-api");
