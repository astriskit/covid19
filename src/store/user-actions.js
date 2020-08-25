import { createAction } from "@reduxjs/toolkit";

export const login = createAction("user/login");
export const logout = createAction("user/logout");
export const setToken = createAction("user/set-token");
export const setLoading = createAction("user/set-loading");
export const signup = createAction("user/signup");
