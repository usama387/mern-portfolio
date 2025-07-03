import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { authApi } from "@/features/api/authApi";
import { projectApi } from "@/features/api/projectApi";

// Combine all reducers into a single root reducer and the passed in store.js.
const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [projectApi.reducerPath]: projectApi.reducer,
  auth: authReducer,
});

export default rootReducer;
