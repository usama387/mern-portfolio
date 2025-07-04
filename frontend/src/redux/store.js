import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authApi";
import { projectApi } from "@/features/api/projectApi";
import Cookies from "js-cookie";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware, projectApi.middleware),
});

// this api end point is hit when page is reloaded to keep user authenticated
const initializeApp = async () => {
  const token = Cookies.get("token");

  if (!token) {
    console.log("No token found. Skipping user profile fetch.");
    return; // Don't try to fetch profile if not logged in
  }

  try {
    await appStore.dispatch(
      authApi.endpoints.getUserProfileDetails.initiate({}, { forceRefetch: true })
    );
  } catch (err) {
    console.error("Failed to fetch user profile:", err);
  }
};

initializeApp();
