// src\api\apiForDevRelay.ts
import axios, { AxiosResponse } from "axios";
import { backendApi } from "./commonApi";
import {
    AssignmentCategory,
    CategoryForDevAssignmentDto,
    CategoryResponse,
    CreateDevAssignmentDto,
    DevAssignmentRow,
    IParameterForCreateCategoryForSubject,
    IParameterForCreateDevAssignmentSubmission,
    IParameterForUpdateCategoryForDevAssignment,
    SubjectForCategoryRow
} from "@/types/typeForDevRelay";

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

export const createDevAssignmentSubmission = async ({
    devAssignmentId,
    createDevAssignmentSubmissionDto
}: IParameterForCreateDevAssignmentSubmission
) => {
    console.log("devAssignmentId for create submission :::::::::::", devAssignmentId);
    console.log("createDevAssignmentSubmissionDto for create submission :::::::::::", createDevAssignmentSubmissionDto);

    try {
        const response: any = await instance.post(
            `dev-assignment/${devAssignmentId}/dev-assignment-submission`,
            createDevAssignmentSubmissionDto
        );
        return response.data;
    } catch (error) {
        throw error
    }
};

export const apiForDeleteDevAssignmentSubmission = async (
    id: number
): Promise<AxiosResponse<{ message: string }>> => {
    return instance.delete(`/dev-assignment-submission/${id}`);
};

export const apiForDeleteDevAssignmentById = (
    id: number
): Promise<AxiosResponse<{ message: string }>> => {
    return instance.delete(`/dev-assignment/${id}`);
};

export const apiForCreateCategoryForSubject = async ({ subjectId, name }: IParameterForCreateCategoryForSubject): Promise<AxiosResponse> => {

    console.log("name at api function : ", name);


    try {
        const response = await instance.post(`subject/${subjectId}/category`, { name });
        return response;
    } catch (error) {
        throw error;
    }
}

export const apiForDeleteCategory = (id: number): Promise<AxiosResponse<CategoryResponse>> => {
    return instance.delete(`/categories/${id}`);
};

export const apiForDeleteSubject = (id: number): Promise<AxiosResponse<{ id: number; name: string }>> => {
    return instance.delete(`/subjects/${id}`);
};

export const apiForcreateSubjectForCategory = async (
    name: string
): Promise<SubjectForCategoryRow> => {
    const url = "/subjects";

    try {
        const response: AxiosResponse<SubjectForCategoryRow> = await instance.post(
            url,
            { name } // 직접 요청 본문에 name 필드를 설정합니다.
        );

        return response.data;
    } catch (error) {
        console.error(error);
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

export async function getAllCategoriesForSubject(subjectId?: number): Promise<AssignmentCategory[]> {
    try {
        const response = await instance.get(`/categories-by-subject/${subjectId}`);
        return response.data;
    } catch (error) {
        console.error("카테고리를 가져오는 중 에러 발생:", error);
        throw error;
    }
}

export const getAllSubjects = async (): Promise<SubjectForCategoryRow[]> => {
    try {
        const response: AxiosResponse<SubjectForCategoryRow[]> = await instance.get("/subjects");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateCategoryForDevAssignment = async ({ id, updateCategoryDto }: IParameterForUpdateCategoryForDevAssignment): Promise<CategoryForDevAssignmentDto> => {
    try {
        const response = await instance.put(`/category-for-dev-assignment/${id}`, updateCategoryDto);
        return response.data;
    } catch (error) {
        throw new Error("카테고리 업데이트에 실패했습니다.");
    }
};

export async function apiForCreateDevAssignment(categoryId: number, createDevAssignmentDto: CreateDevAssignmentDto) {
    try {
        const response: any = await instance.post(`/${categoryId}/create-dev-assignment`, createDevAssignmentDto);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
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
