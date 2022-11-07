import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const inputValue = createSlice({
    name: 'inputValue',
    initialState: '',
    reducers: {
        setInput: (state: string, action: PayloadAction<string>): string => action.payload
    }
})

export const { setInput } = inputValue.actions;

export default inputValue.reducer;