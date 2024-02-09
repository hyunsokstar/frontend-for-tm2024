// store/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const idAdminSlice = createSlice({
    name: 'counter',
    initialState: {
        skilNoteId: 0,
    },
    reducers: {
        saveSkilNoteId: (state, action) => {
            state.skilNoteId = action.payload;
        },
    },
});

export const { saveSkilNoteId } = idAdminSlice.actions;
export default idAdminSlice.reducer;
