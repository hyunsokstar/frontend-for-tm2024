// src/store/index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import userSlice from './userSlice';
import rightSideNaviForSkilNoteContents from './rightSideNaviForSkilNoteContents';
import idAdminSlice from './idAdminSlice';
import pageInfoSlice from './pageInfoSlice';
import devBattleSlice from './devBattleSlice';

type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    user: userSlice,
    counter: counterSlice,
    skilnoteContentNaviSlice: rightSideNaviForSkilNoteContents,
    idAdmin: idAdminSlice,
    pageInfo: pageInfoSlice,
    devBattle: devBattleSlice
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
export type { RootState };