// src/features/calendarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    date: new Date(),
    activities: [], // Store both today's and past activities
    futurePlans: []
  },
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    addActivity: (state, action) => {
      const newActivity = action.payload;
      state.activities.push(newActivity); // Add the new activity
    },
    setFuturePlans: (state, action) => {
      state.futurePlans.push(action.payload);
    }
  }
});

export const { setDate, addActivity, setFuturePlans } = calendarSlice.actions;
export default calendarSlice.reducer;
