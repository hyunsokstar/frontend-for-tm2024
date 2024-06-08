// src\api\apiForDevRelay.ts
import axios, { AxiosResponse } from "axios";
import { backendApi } from "./commonApi";
import { CreateDevBattleDto, DevBattleResponse, IAddTodoForDevBattleDto, IDevSpecForTeamBattleUpdateDto, IParameterForAddDevProgressForTeam, IParameterForAddMemberToDevBattle, IParameterForAddTeamToDevBattle, IParameterForTeamBattleUpdateDto, IParameterForUpdateDevProgress, IParameterForUpdateForSpecificDevSpecForNotArryTypeForTeamBattle, ITypeForParameterForAddTodoForDevBattle, IUpdateDevProgressForTeamDto, ParameterForCreateDevBattleDto, ResponseForUpdateDevProgressForTeam } from "@/types/typeForDevBattle";


const instance = axios.create({
    baseURL: `${backendApi}/dev-battle`,
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

export const apiForUpdateDevProgressStatusForDevBattle = async (
    devProgressId: number,
    status: string
): Promise<{ message: string; devProgress: any }> => {
    try {
        const response = await instance.patch(`/dev-progress/${devProgressId}/update-status`, { status });
        return response.data;
    } catch (error) {
        throw error
    }
};

export async function apiForAddTodoForDevBattle(
    { devBattleId, addTodoForDevBattleDto }: ITypeForParameterForAddTodoForDevBattle,
): Promise<AxiosResponse<any>> {
    const response = await instance
        .post(`/${devBattleId}/todo`, addTodoForDevBattleDto);

    return response;
}

export const apiForUpdateDevProgressForTeam = ({
    progressId, updateDevProgressForTeamDto
}: IParameterForUpdateDevProgress): Promise<ResponseForUpdateDevProgressForTeam> => {
    return instance.patch(`/dev-progress/${progressId}`, updateDevProgressForTeamDto);
};

export const apiForUpdateForSpecificDevSpecForNotArryTypeForTeamBattle = async (
    parameters: IParameterForUpdateForSpecificDevSpecForNotArryTypeForTeamBattle
): Promise<AxiosResponse<{ message: string }>> => {
    const { teamId, fieldName, itemText } = parameters;
    const response = await instance.patch<{ message: string }>(
        `/team/${teamId}/update-dev-spec/${fieldName}`,
        { itemText }
    );
    return response;
};

export const apiForAddItemToSpecificFieldForDevSpec = (
    { teamId,
        devSpecForTeamBattleUpdateDto
    }: IParameterForTeamBattleUpdateDto
): Promise<AxiosResponse<void>> => {
    const url = `/team/${teamId}/update-dev-spec-specific-field`;
    return instance.patch(url, devSpecForTeamBattleUpdateDto);
};

export const apiForDeleteDevProgressForTeam = (idForProgressForDevBattle: number): Promise<void> => {
    return instance.delete(`/progressForDevBattle/${idForProgressForDevBattle}`)
        .then(() => {
            console.log("Task deleted successfully");
        })
        .catch((error) => {
            console.error("Error deleting task: ", error);
            throw error;
        });
};

export const apiForDevProgressForTeam = ({ teamId, addDevProgressForTeamDto }: IParameterForAddDevProgressForTeam): Promise<AxiosResponse<DevBattleResponse>> => {
    return instance.post(`/teams/${teamId}/progress`, addDevProgressForTeamDto);
};

export async function apiForAddMemberToTeam({ teamId, memberId }: IParameterForAddMemberToDevBattle) {
    try {
        const response: AxiosResponse<any> = await instance.post(`/teams/${teamId}/member/${memberId}`);
        if (response.status === 201) {
            console.log("Member has been added to the team");
            return response.data;
        } else if (response.status === 200) {
            console.log("Member has been removed from the team");
            return response.data;
        } else {
            throw new Error("Unexpected status code");
        }
    } catch (error) {
        console.error("Error occurred while adding member to the team", error);
        throw error;
    }
}

export const apiForDeleteTeamForDevBattle = async (teamId: number): Promise<void> => {
    try {
        await instance.delete(`/teams/${teamId}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// AddTeamToDevBattleDto
export const apiForAddTeamToDevBattle = async ({ devBattleId, addTeamToDevBattleDto }: IParameterForAddTeamToDevBattle): Promise<DevBattleResponse> => {
    try {
        const response: AxiosResponse<DevBattleResponse> = await instance.post(`/${devBattleId}/add-team`, addTeamToDevBattleDto);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const apiForCreateDevBattle = ({ createDevBattleDto }: ParameterForCreateDevBattleDto) => {
    return instance.post<DevBattleResponse>("/", createDevBattleDto);
};

export const apiForRemoveDevBattleById = (id: number) => {
    return instance.delete(`/${id}`);
};

export async function apiForFindAllDevBattleList(): Promise<DevBattleResponse[]> {
    try {
        const response: AxiosResponse<DevBattleResponse[]> = await instance.get('');
        // console.log("response for dev battle : ", response);
        return response.data;
    } catch (error) {
        console.error("Error while fetching dev battles: ", error);
        throw error;
    }
}