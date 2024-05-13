import axios, { AxiosResponse } from "axios";
import { backendApi } from "./commonApi";
import { FavoriteDevSpecRow, FavoriteDevSpecRowForCreate, IDtoTypeForUpdateFavoriteDevSpecCompany, UpdateFavoriteDevSpecParameter } from "@/types/typeForFavoriteDevSpec";

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

export const updateCompany = async ({ id, company }: IDtoTypeForUpdateFavoriteDevSpecCompany): Promise<void> => {
    try {
        const response: AxiosResponse<void> = await instance.put(`${id}/company`, { company });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const like = (id: number): Promise<AxiosResponse<FavoriteDevSpecRow>> => {
    return instance.patch(`/${id}/like`);
};

export const dislike = (id: number): Promise<AxiosResponse<FavoriteDevSpecRow>> => {
    return instance.patch(`/${id}/dislike`);
};

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
export const createFavoriteDevSpec = async (data: FavoriteDevSpecRowForCreate): Promise<FavoriteDevSpecRow> => {
    try {
        const response: AxiosResponse<FavoriteDevSpecRow> = await instance.post('/', data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateFavoriteDevSpec = async ({ id, data }: UpdateFavoriteDevSpecParameter): Promise<any> => {

    console.log("id : ", id);
    console.log("data : ", data);


    try {
        const response = await instance.put(`${id}/boiler-plate`, data);
        return response;
    } catch (error: any) {
        throw error
    };
}
