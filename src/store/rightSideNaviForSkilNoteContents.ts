// store/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const skilContentNaviSlice = createSlice({
    name: 'counter',
    initialState: {
        noteId: 0,
    },
    reducers: {
        saveNoteId: (state, action) => {
            state.noteId = action.payload;
        },
    },
});

export const { saveNoteId } = skilContentNaviSlice.actions;
export default skilContentNaviSlice.reducer;
