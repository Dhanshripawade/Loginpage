import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import consultantReducer from "./consultant/consultantSlice"


const store = configureStore({
  reducer: {
   
    auth : authReducer,
    consultant : consultantReducer,
  },
});

export default store;
