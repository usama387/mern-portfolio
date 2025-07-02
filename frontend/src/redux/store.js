import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authApi";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware),
});

// this api end point is hit when page is reloaded to keep user authenticated
const initializeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.getUserProfileDetails.initiate({}, { forceRefetch: true })
  );
};

initializeApp();
