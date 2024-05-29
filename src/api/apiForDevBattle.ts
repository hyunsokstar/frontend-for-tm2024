// src\api\apiForDevRelay.ts
import axios, { AxiosResponse } from "axios";
import { backendApi } from "./commonApi";
import { DevBattleResponse } from "@/types/typeForDevBattle";


const instance = axios.create({
    baseURL: `${backendApi}/dev-battle`,
    withCredentials: true,
});

instance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        // console.log("access token 유무 확인 : ", accessToken);

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        alert("여기서 막았나?")
        return Promise.reject(error);
    }
);

export const apiForRemoveDevBattleById = (id: number) => {
    return instance.delete(`/${id}`);
};

// 여기에 추가 해줘
export async function apiForFindAllDevBattleList(): Promise<DevBattleResponse[]> {
    try {
        const response: AxiosResponse<DevBattleResponse[]> = await instance.get('');
        // console.log("response for dev battle : ", response);
        return response.data;
    } catch (error) {
        console.error("Error while fetching dev battles: ", error);
        throw error;
    }
}