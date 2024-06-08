import { createSlice } from '@reduxjs/toolkit';

const devBattleSlice = createSlice({
    name: 'dev-battle',
    initialState: {
        selectedDevBattleId: 0,
    },
    reducers: {
        setSelectedDevBattleId: (state, action) => {
            state.selectedDevBattleId = action.payload;
        },
    },
});

export const { setSelectedDevBattleId } = devBattleSlice.actions;
export default devBattleSlice.reducer;
