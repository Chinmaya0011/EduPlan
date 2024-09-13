// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from '../features/calendarSlice';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer
  }
});
