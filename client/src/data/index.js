import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import userReducer from "./slice/userSlice";
import cameraSlice from "./slice/CameraSlice";

export const store = configureStore({
  reducer: {

    auth: authReducer,
    user: userReducer,
    camera :cameraSlice,
   
  },
});