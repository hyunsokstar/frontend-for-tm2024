import axios, { AxiosResponse } from "axios";
import { backendApi } from "./commonApi";
import { QueryFunctionContext } from "@tanstack/react-query";
import { CreateSubChallengeDto, IChallengeRow, ICreateChallengeDto, IParamterForApiForUpdateChallenge, IUpdateChallengeDto, responseTypeForGetAllChallengeList } from "@/types/typeforChallenges";

const instance = axios.create({
    baseURL: `${backendApi}/challenges`,
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

export const apiForUpdateChallenge = async ({ isMainOrSub, challengeId, updateChallengeDto }: IParamterForApiForUpdateChallenge): Promise<any> => {
    try {
        const response = await instance.put(`/${challengeId}`, { isMainOrSub, updateChallengeDto });
        return response.data;
    } catch (error) {
        throw error; // 에러 객체 그대로 던지기
    }
};


export const apiForDeleteChallenge = async ({ isMainOrSub, challengeId }: any): Promise<void> => {
    try {
        await instance.delete(`/${isMainOrSub}/${challengeId}`);
    } catch (error) {
        throw error; // 에러 객체 그대로 던지기
    }
};


export const apiForCreateChallenge =
    async (createChallengeDto: ICreateChallengeDto): Promise<IChallengeRow> => {
        try {
            const response = await instance.post('', createChallengeDto);
            return response.data;
        } catch (error) {
            console.log("error : ", error);
            throw error; // 에러 객체 그대로 던지기
        }
    };


export const apiForGetAllChallengesWithPageNum = async (pageNum: number): Promise<responseTypeForGetAllChallengeList> => {
    try {
        const response = await instance.get(`?pageNum=${pageNum}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching challenges: ${error}`);
    }
};

export const apiForCreateSubChallenge = async (challengeId: number, createSubChallengeDto: CreateSubChallengeDto): Promise<AxiosResponse<any>> => {
    try {
        const response = await instance.post(`/${challengeId}/subChallenges`, createSubChallengeDto);
        return response;
    } catch (error) {
        throw error;
    }
};