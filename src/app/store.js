import { configureStore } from '@reduxjs/toolkit'
import currentReducer from '../features/current/currentSlice';

export default configureStore({
  reducer: {
    current: currentReducer,
  },
})
