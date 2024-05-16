// src\api\apiForDevRelay.ts
import axios, { AxiosResponse } from "axios";
import { backendApi } from "./commonApi";
import { QueryFunctionContext } from "@tanstack/react-query";
import { access } from "fs";
import { DevRelayResponse } from "@/types/typeForDevRelay";

const instance = axios.create({
    baseURL: `${backendApi}/dev-relay`,
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


// findAllDevRelays 함수 정의
export const findAllDevRelays = async (): Promise<DevRelayResponse[]> => {
    try {
        const response = await instance.get('dev-assignments');
        return response.data;
    } catch (error) {
        throw error;
    }
};
