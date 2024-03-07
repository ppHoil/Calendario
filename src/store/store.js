import { configureStore } from '@reduxjs/toolkit'
import { calendarSlice } from './slices/categories'

export const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
  },
})