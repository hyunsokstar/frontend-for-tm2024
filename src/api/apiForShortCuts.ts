import axios, { AxiosResponse } from "axios";
import { backendApi } from "./commonApi";
import { QueryFunctionContext } from "@tanstack/react-query";
import { ITypeForShortCutRow } from "@/types/typeForShortCut";

const instance = axios.create({
    baseURL: `${backendApi}/shortcuts`,
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
        return Promise.reject(error);
    }
);

// getAllShortCutList 요청 하는 API 함수 요청 함수 추가
export const apiForGetAllShortCutList = ({ queryKey }: QueryFunctionContext) => {
    const [_, pageNum] = queryKey;

    return instance
        .get('', {
            params: { pageNum: pageNum },
        })
        .then((response) => {
            return response.data;
        });
};

export const apiForSaveShortCuts = (shortcuts: ITypeForShortCutRow[]): Promise<AxiosResponse> => {
    console.log("shortcuts to pass backend: ", shortcuts);

    return instance.post('/saveShortCuts', shortcuts)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error("Error occurred while save shortcuts:", error);
            throw error;
        });
    // return true
};

