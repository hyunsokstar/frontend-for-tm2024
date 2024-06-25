// src\api\apiForChatting.ts
import axios, { AxiosResponse } from "axios";
import { backendApi } from "./commonApi";
import { CreateDevBattleDto, DevBattleResponse, IAddTodoForDevBattleDto, IDevSpecForTeamBattleUpdateDto, IParameterForAddDevProgressForTeam, IParameterForAddMemberToDevBattle, IParameterForAddTeamToDevBattle, IParameterForTeamBattleUpdateDto, IParameterForUpdateDevProgress, IParameterForUpdateForSpecificDevSpecForNotArryTypeForTeamBattle, ITypeForParameterForAddTodoForDevBattle, IUpdateDevProgressForTeamDto, ParameterForCreateDevBattleDto, ResponseForUpdateDevProgressForTeam } from "@/types/typeForDevBattle";
import { GlobalChatRoomResponse, IParameterForAddChattingMessage, ITypeForGetAllChatRooms } from "@/types/typeForChatting";


const instance = axios.create({
    baseURL: `${backendApi}/chatting`,
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

export const apiForGetGlobalChatRoomById = async (id: string): Promise<GlobalChatRoomResponse> => {
    try {
        const response: AxiosResponse<GlobalChatRoomResponse> = await instance.get(`/global-chat-rooms/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching global chat room:', error);
        throw error;
    }
};

export const apiForGetAllGlobalChatRooms = async (): Promise<ITypeForGetAllChatRooms> => {
    try {
        const response: AxiosResponse<ITypeForGetAllChatRooms> = await instance.get('/global-chat-rooms');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 메시지 생성을 위한 API 함수 추가
export const apiForCreateMessage = async ({ chatRoomId, content }: IParameterForAddChattingMessage): Promise<AxiosResponse> => {
    try {
        const response = await instance.post(`/chatroom/${chatRoomId}/message`, { content });
        return response;
    } catch (error) {
        console.error("Failed to create message:", error);
        throw error;
    }
};