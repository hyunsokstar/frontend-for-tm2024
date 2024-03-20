import axios, { AxiosResponse } from "axios";
import { backendApi } from "./commonApi";
import { QueryFunctionContext } from "@tanstack/react-query";
import { IChallengeRow, ICreateChallengeDto, responseTypeForGetAllChallengeList } from "@/types/typeforChallenges";

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

export const apiForDeleteChallenge = async (challengeId: number): Promise<void> => {
    try {
        await instance.delete(`/${challengeId}`);
    } catch (error) {
        throw new Error(`Error deleting challenge: ${error}`);
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
