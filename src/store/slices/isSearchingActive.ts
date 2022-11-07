import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const isSearchingActive = createSlice({
    name: 'isSearchingActive',
    initialState: false,
    reducers: {
        setIsSearchingActive: (state: boolean): boolean => !state
    }
})

export const { setIsSearchingActive } = isSearchingActive.actions;

export default isSearchingActive.reducer;