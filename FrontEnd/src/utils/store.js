import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";


const appStore = configureStore({
  reducer: {
    // search: searchSlice,
    user: userSlice
  },
});

export default appStore;
