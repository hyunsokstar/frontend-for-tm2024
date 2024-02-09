// store/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const pageInfoSlice = createSlice({
    name: 'pageInfo',
    initialState: {
        pageInfo: 0,
    },
    reducers: {
        // increment: state => {
        //     state.pageInfo += 1;
        // },
        // decrement: state => {
        //     state.value -= 1;
        // },
        savePageInfo: (state, action) => {
            state.pageInfo = action.payload;
        },

    },
});

export const { savePageInfo } = pageInfoSlice.actions;
export default pageInfoSlice.reducer;
