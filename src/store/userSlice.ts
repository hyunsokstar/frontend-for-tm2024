// src/store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    isLoggedIn: boolean;
    loginUser: {
        id: number;
        email: string;
        nickname: string;
        following: any[];
        followers: any[];
        cashPoints?: number;
    };
}

const initialState: UserState = {
    isLoggedIn: false,
    loginUser: {
        id: 0,
        email: '',
        nickname: '',
        following: [],
        followers: [],
        cashPoints: 0
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoginUser: (
            state, action:
                PayloadAction<{
                    id: number,
                    email: string;
                    nickname: string,
                    following: any[],
                    followers: any[],
                    cashPoints?: number
                }>) => {
            const { id, email, nickname, following, followers, cashPoints } = action.payload;
            state.loginUser = {
                id,
                email,
                nickname,
                following,
                followers,
                cashPoints
            };
            state.isLoggedIn = true; // 로그인 상태 변경
        },
        logoutUser: (state) => {
            state.isLoggedIn = false; // 로그아웃 상태 변경
            state.loginUser = {
                id: 0,
                email: '',
                nickname: '',
                following: [],
                followers: [],
                cashPoints: 0
            };
        },
    },
});

export const { setLoginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;