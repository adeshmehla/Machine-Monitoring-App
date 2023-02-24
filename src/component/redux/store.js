import {configureStore} from '@reduxjs/toolkit'
import pageReducer from './pageSlice'
export const store = configureStore({
    reducer: {pageReducer},
  })
  