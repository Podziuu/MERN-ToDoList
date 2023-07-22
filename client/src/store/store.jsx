import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./slices/ui-slice";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
