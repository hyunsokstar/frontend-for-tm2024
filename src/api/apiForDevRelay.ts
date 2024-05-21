// src\api\apiForDevRelay.ts
import axios, { AxiosResponse } from "axios";
import { backendApi } from "./commonApi";
import { AssignmentCategory, CategoryForDevAssignmentDto, CreateDevAssignmentDto, CreateDevAssignmentSubmission, DevAssignmentRow, IParameterForCreateDevAssignmentSubmission } from "@/types/typeForDevRelay";

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

export async function apiForCreateDevAssignment(categoryId: number, createDevAssignmentDto: CreateDevAssignmentDto) {
    try {
        const response: any = await instance.post(`/${categoryId}/create-dev-assignment`, createDevAssignmentDto);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const apiForCreateCategory = async (categoryDto: CategoryForDevAssignmentDto): Promise<AxiosResponse> => {
    try {
        const response = await instance.post('category', categoryDto);
        return response;
    } catch (error) {
        throw new Error(`Error creating category: ${error}`);
    }
}

export const findDevAssignmentsByCategory = async (categoryId: number): Promise<DevAssignmentRow[]> => {
    try {
        const response = await instance.get(`/${categoryId}/dev-assignments`);
        return response.data;
    } catch (error) {
        // 에러 처리 로직 추가
        throw error;
    }
};


export async function getAllCategories(): Promise<AssignmentCategory[]> {
    try {
        const response = await instance.get('/categories');
        return response.data;
    } catch (error) {
        console.error("카테고리를 가져오는 중 에러 발생:", error);
        throw error;
    }
}

export async function getDevAssignmentsByCategory(categoryId: number): Promise<DevAssignmentRow[]> {
    try {
        const response = await instance.get(`/${categoryId}/dev-assignments`);
        return response.data;
    } catch (error) {
        console.error("DevAssignment 리스트를 가져오는 중 에러 발생:", error);
        throw error;
    }
}


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