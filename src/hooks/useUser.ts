// src/hooks/useUser.ts

import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { RootState } from '../store'; // RootState 불러오기
import { logoutUser, setLoginUser } from '@/store/userSlice';
import { apiForLoginCheckWithAccessToken, apiForLoginCheckWithRefreshToken } from '@/api/apiForUserBoard';

const useUser = () => {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const loginUser = useSelector((state: RootState) => state.user.loginUser);

    const logout = useCallback(() => {
        // 로그아웃 액션을 dispatch하여 상태 변경
        dispatch(logoutUser());

        // 로컬 스토리지에서 로그인 정보 제거
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }, [dispatch]);

    // 서버와의 통신을 통해 로그인 상태를 확인하는 로직
    const verifyLoginStatus = useCallback(async () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (accessToken && refreshToken) {
            try {
                const result = await apiForLoginCheckWithAccessToken(accessToken);
                // console.log("result for check login user : ", result);

                if (result.success) {
                    const { id, email, nickname, following, followers, cashPoints } = result.user;
                    // console.log("login success by access token");

                    // 받아온 정보를 이용하여 로그인 상태 갱신
                    dispatch(
                        setLoginUser({
                            id,
                            email,
                            nickname,
                            following,
                            followers,
                            cashPoints
                        })
                    );
                } else {
                    console.log("error : ", result.response.data);
                    const tokkenERROR = result.response.data.reason.name

                    if (tokkenERROR === "TokenExpiredError") {
                        console.log("토큰 기한이 지났습니다 refresh token 을 이용해 재발급을 시도 하겠습니다");
                        localStorage.removeItem('accessToken');

                        try {
                            console.log("refresh token : ", refreshToken);

                            const result = await apiForLoginCheckWithRefreshToken(refreshToken);
                            console.log("result : ", result);

                            if (result !== undefined && result.success) {
                                console.log("login success by refresh token");

                                const { id, email, nickname, following, followers } = result.user;

                                localStorage.setItem('accessToken', result.accessToken);
                                // 받아온 정보를 이용하여 로그인 상태 갱신
                                dispatch(
                                    setLoginUser({
                                        id,
                                        email,
                                        nickname,
                                        following,
                                        followers
                                    })
                                );
                            } else {
                                console.log("refresh token is invalid");
                                localStorage.removeItem('refreshToken');
                                dispatch(logoutUser())
                            }
                        } catch (error) {
                            console.log("error at userUser : ", error);
                        }
                    }
                }

            } catch (error: any) {
                console.log("access Token is empty : ", error);
            }
        }
    }, [dispatch]);


    // 컴포넌트가 마운트될 때와 로그아웃될 때 로그인 상태 확인 함수 실행
    useEffect(() => {
        verifyLoginStatus();
    }, [verifyLoginStatus]);

    return { isLoggedIn, loginUser, logout };
};

export default useUser;
