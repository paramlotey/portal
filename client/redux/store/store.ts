import { configureStore } from "@reduxjs/toolkit";
import { profileApi } from "../api/profileApi";

const store = configureStore({
  reducer: {
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(profileApi.middleware),
});

export default store;
