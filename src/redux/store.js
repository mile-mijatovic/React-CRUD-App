import { configureStore } from "@reduxjs/toolkit";

// Root reducer
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  // Middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // Enable devTool in development mode
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
