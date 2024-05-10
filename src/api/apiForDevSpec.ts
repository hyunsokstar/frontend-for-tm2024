import axios, { AxiosResponse } from "axios";
import { backendApi } from "./commonApi";
import { MutationFunction, QueryFunctionContext } from "@tanstack/react-query";
import { DtoForSaveTechNote, IParameterForLikeSkilNote, IParameterForLikeTechNote, IParameterForUpdateIsCompletedForSkilNote, IParameterForUpdateIsCompletedForTechNote, TechNote } from "@/types/typeForTechNote";
import { GroupedDevSpecs } from "@/types/typeForDevSpec";
// import { access } from "fs";

const instance = axios.create({
    baseURL: `${backendApi}/dev-spec`,
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

// export const apiForSaveTechNotes = ({ techNotesToSave, roadMapId }: DtoForSaveTechNote) => {
//     console.log("techNotesToSave at api : ", techNotesToSave, roadMapId);
//     return instance.post(
//         'saveTechNotes', { techNotesToSave, roadMapId }
//     ).then((response: any) => response.data)
// }


export const apiForGetAllGroupedByCategory = (): Promise<GroupedDevSpecs> => {
    return instance.get<GroupedDevSpecs>('grouped-by-category').then((response) => response.data);
}