import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './dataSlice'
import optionsSlice from './optionsSlice'

export const store = configureStore({
  reducer: {
    data: dataSlice,
    options: optionsSlice
  }
})
