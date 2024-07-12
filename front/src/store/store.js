import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userApiSlice from "./userApiSlice";
import planReducer from "./PlanApislice";

const store = configureStore({
  reducer: {
    userApi: userApiSlice,
    auth: authReducer,
    plan: planReducer,
  },

  devTools: true, // Enable Redux DevTools only in non-production environment
});

export default store;
