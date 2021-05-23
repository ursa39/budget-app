import { configureStore } from "@reduxjs/toolkit";
import currentReducer from "../features/current/currentSlice";
import { Record } from './types/Record'

export type StoreState = {
  current: Record[];
};

export default configureStore({
  reducer: {
    current: currentReducer,
  },
});
