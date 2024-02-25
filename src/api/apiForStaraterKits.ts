import axios from "axios";
import { backendApi } from "./commonApi";
import { ResponseTypeForStarterKitList } from "@/types/typeForStarterKit";

// 기본 설정을 포함한 axios instance 생성
const instance = axios.create({
    baseURL: `${backendApi}/starterkits`,
    withCredentials: true,
});

// 요청 인터셉터 설정
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

// apiForGetAllStarterKitList 함수 추가
export const apiForGetAllStarterKitList =
    async (pageNum: number): Promise<ResponseTypeForStarterKitList> => {
        try {
            const response = await instance.get(`/?pageNum=${pageNum}`);
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch starter kit list");
        }
    };

