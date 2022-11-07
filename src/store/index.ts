import { configureStore } from '@reduxjs/toolkit'
import inputValue from './slices/inputValue.slice'
import isSearchingActive from './slices/isSearchingActive';

export const store = configureStore({
  reducer: {
        inputValue,
        isSearchingActive
    }
}) 

export default store;

export type RootState = ReturnType<typeof store.getState>