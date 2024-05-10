import axios, { AxiosResponse } from "axios";
import { backendApi } from "./commonApi";
import { FavoriteDevSpecRow } from "@/types/typeForFavoriteDevSpec";

const instance = axios.create({
    baseURL: `${backendApi}/favorite-dev-spec`,
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

export const getAllFavoriteDevSpecs = async (): Promise<FavoriteDevSpecRow[]> => {
    try {
        const response: AxiosResponse<FavoriteDevSpecRow[]> = await instance.get('/');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// 여기에 추가
export const createFavoriteDevSpec = async (data: FavoriteDevSpecRow): Promise<FavoriteDevSpecRow> => {
    try {
        const response: AxiosResponse<FavoriteDevSpecRow> = await instance.post('/', data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};