import axios, { AxiosResponse } from "axios";
import { backendApi } from "./commonApi";
import { QueryFunctionContext } from "@tanstack/react-query";
import { ITypeForRoadMapRow, ReponseTypeForGetAllRoadMapList, SaveRoadMapsDto } from "@/types/typeForRoadMap";

const instance = axios.create({
    baseURL: `${backendApi}/roadmap`,
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

    // todo get, '' 로 요청해서 응답 받는 api 요청 함수 추가 
    // 함수 이름 apiForGetAllRoadMapList

);


export async function apiForGetAllRoadMapList(pageNum: number): Promise<ReponseTypeForGetAllRoadMapList> {
    try {
        const response: AxiosResponse = await instance.get(`?pageNum=${pageNum}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}

export const apiForSaveRoadMaps = (roadMaps: ITypeForRoadMapRow[]): Promise<AxiosResponse> => {

    console.log("roadMaps to pass backend: ", roadMaps);


    return instance.post('/saveRoadMaps', roadMaps)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error("Error occurred while saving roadmaps:", error);
            throw error;
        });
    // return true
};