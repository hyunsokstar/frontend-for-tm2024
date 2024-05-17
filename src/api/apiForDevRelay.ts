// src\api\apiForDevRelay.ts
import axios, { AxiosResponse } from "axios";
import { backendApi } from "./commonApi";
import { AssignmentCategory, CreateDevAssignmentSubmission, DevAssignmentRow, IParameterForCreateDevAssignmentSubmission } from "@/types/typeForDevRelay";

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
export const findAllDevAssingments = async (selectedCategory: AssignmentCategory | null): Promise<DevAssignmentRow[]> => {
    try {
        const response = await instance.get('dev-assignments', {
            params: {
                category: selectedCategory // 선택된 카테고리를 쿼리 파라미터로 전달
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createDevAssignmentSubmission = async ({
    devAssignmentId,
    createDevAssignmentSubmissionDto
}: IParameterForCreateDevAssignmentSubmission
) => {
    try {
        const response: AxiosResponse = await instance.post(
            `${devAssignmentId}/dev-assignment-submission`,
            createDevAssignmentSubmissionDto
        );
        return response.data;
    } catch (error) {
        throw new Error(`Failed to create dev assignment submission: ${error}`);
    }
};