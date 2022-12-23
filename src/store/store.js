import { calendarSlice, uiSlice, userSlice } from "./";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: { 
    user: userSlice.reducer,
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer, 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
})
