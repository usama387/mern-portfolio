import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authApi";
import { projectApi } from "@/features/api/projectApi";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware, projectApi.middleware),
});

// This API endpoint is hit when the page is reloaded to keep the user authenticated
const initializeApp = async () => {
  try {
    const result = await appStore.dispatch(
      authApi.endpoints.getUserProfileDetails.initiate({}, { forceRefetch: true })
    );

    // Gracefully ignore 401 errors for unauthenticated users
    if ('error' in result && result.error.status !== 401) {
      // Log only unexpected errors
      console.error("Unexpected error while fetching user:", result.error);
    }

  } catch (err) {
    console.error("Error in initializeApp:", err);
  }
};

initializeApp();
