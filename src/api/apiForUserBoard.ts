import axios, { AxiosResponse } from "axios";
import { backendApi } from "./commonApi";
import { QueryFunctionContext } from "@tanstack/react-query";
import { IParamterTypeForLogin } from "@/types/typeForAuthentication";
import { IUser, RowTypeForPaymentHistoryData } from "@/types/typeForUserBoard";

const instance = axios.create({
    baseURL: `${backendApi}/users`,
    withCredentials: true,
});

instance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const apiForAddUser = ({
    email,
    nickname,
    password
}: any) => {

    console.log("email : ", email);
    console.log("nickname : ", nickname);
    console.log("password : ", password);

    return instance.post(
        '',
        {
            email,
            nickname,
            password
        }
    ).then((response: any) => response.data)
}

export async function apiForGetUsersPaymentHistory():
    Promise<AxiosResponse<any>> {
    try {
        const response = await instance.get('/payment-history');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}

// 1122
export const apiForSaveOrUpdateUserInfoForChecked = async (data: IUser[]) => {
    try {
        const response = await instance.put('/', data); // 여기서 data를 PUT 요청으로 보냄
        return response.data; // 응답 데이터를 반환하거나 필요에 따라 다른 처리를 수행할 수 있음
    } catch (error) {
        // 에러 처리
        console.error('Error updating users:', error);
        throw error; // 에러를 호출한 쪽으로 다시 던짐
    }
}


export const apiForLoginCheckWithRefreshToken = async (refreshToken: string) => {
    console.log("refresh token check : ", refreshToken);

    const headers = {
        Authorization: `Basic ${refreshToken}`
    };

    try {
        const response = await instance.post("login-check-by-refreshToken", {}, { headers });
        return response.data;
    } catch (error) {
        // throw new Error("error when login check by refresh token: " + error);
        console.log("error : ", error);
        // return error
    }
};

export const apiForLoginCheckWithAccessToken = async (accessToken: string) => {
    const headers = {
        Authorization: `Bearer ${accessToken}`
    };

    // console.log("로그인 요청 with token ", accessToken);

    try {
        const response = await instance.post("login-check-by-accessToken", {}, { headers });
        return response.data;
    } catch (error) {
        console.log("error : ", error);

        // throw new Error('Failed to perform login check');
        return error
    }
};


export const apiForLogin = async ({ email, password }: IParamterTypeForLogin): Promise<any> => {
    try {
        const response = await instance.post(
            'login', // 이렇게 실제 로그인 엔드포인트에 맞게 경로를 지정해야 합니다.
            {
                email,
                password,
            }
        );
        return response.data;
    } catch (error) {
        throw error; // 에러를 던져서 처리할 수 있도록 합니다.
    }
};



export const apiForGetAllUsers = ({
    queryKey,
}: QueryFunctionContext) => {
    const [_, pageNum] = queryKey;

    return instance
        .get(``, {
            params: { pageNum: pageNum },
        })
        .then((response) => {

            return response.data;
        }).catch((error) => {
            console.log("error : ", error);
            if (error.response.data.reason === "ExpiredToken") {

            } else {

            }
        });
};

export const apiForDeleteUsersForCheckedIds = (checkedIds: any[]): Promise<any> => {
    console.log('Checked IDs (row delete api ):', checkedIds); // checkedIds 로그 출력

    // 요청을 보내는 부분
    return instance.delete(``, { data: { checkedIds } })
        .then((response) => {
            // 성공 시 처리
            return response.data;
        })
        .catch((error) => {
            // 에러 처리
            throw error; // 에러를 그대로 던지기
        });
};

export const apiForUpdateProfileImage = ({ email, profileImage }: any) => {

    return instance.put(`update-image`, { email, image: profileImage })
        .then((response) => {
            // 성공 시 처리
            return response.data;
        })
        .catch((error) => {
            // 에러 처리
            console.log("api error : ", error);

            return error; // 에러를 그대로 던지기
        });

}

export const apiForGetAllUserEmails = async (): Promise<string[]> => {
    try {
        const response = await instance.get('getUserEmailsByArray'); // 이메일 목록을 반환하는 엔드포인트에 맞게 경로를 지정합니다.
        return response.data; // 이메일 목록을 반환합니다.
    } catch (error) {
        throw error; // 에러를 던져서 처리할 수 있도록 합니다.
    }
};


export const apiForUpdateUserCashPoints =
    ({ cashPointsToBuy, merchantUid }: { cashPointsToBuy: number, merchantUid: string }) => {
        console.log("cashPointsToBuy : ", { cashPointsToBuy });
        console.log("merchantUid : ", merchantUid);

        return instance.put(`buyPoints`, { cashPointsToBuy, merchantUid })
            .then((response) => {
                // 성공 시 처리
                return response.data;
            })
            .catch((error) => {
                // 에러 처리
                console.log("api error : ", error);

                return error; // 에러를 그대로 던지기
            });

    } 