import axios, { AxiosResponse } from "axios";
import { backendApi } from "./commonApi";
import { MutationFunction, QueryFunctionContext } from "@tanstack/react-query";
import { DtoForSaveTechNote, IParameterForLikeSkilNote, IParameterForLikeTechNote, IParameterForUpdateIsCompletedForSkilNote, IParameterForUpdateIsCompletedForTechNote, TechNote } from "@/types/typeForTechNote";
// import { access } from "fs";

const instance = axios.create({
    baseURL: `${backendApi}/technotes`,
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

export const apiForSaveTechNotes = ({ techNotesToSave, roadMapId }: DtoForSaveTechNote) => {
    console.log("techNotesToSave at api : ", techNotesToSave, roadMapId);
    return instance.post(
        'saveTechNotes', { techNotesToSave, roadMapId }
    ).then((response: any) => response.data)
}


export const apiForGetAllTechNoteList = ({ queryKey }: QueryFunctionContext) => {
    const [_, pageNum, searchOption, searchText, isBestByLikes, isBestByBookMarks] = queryKey;

    // console.log("userId at api function : ", userId);
    return instance
        .get("", {
            params: {
                pageNum,
                searchOption,
                searchText,
                isBestByLikes,
                isBestByBookMarks
            },
        })
        .then((response) => {
            return response.data;
        });

};

export const apiForDeleteTechNotesForCheckedIds = (checkedIds: any[]): Promise<any> => {
    console.log('apiForDeleteTechNotesForCheckedIds check data:', checkedIds);

    return instance.delete(`deleteCheckedRows`, { data: { checkedIds } })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error; // 에러를 그대로 던지기
        });
};

export const apiForSearchTechNoteBySearchOptionAndSearchText: MutationFunction<
    AxiosResponse<any, any>,
    [string, string]
> = async (variables: [string, string]) => {
    const [searchOption, searchText] = variables;
    try {
        const response = await instance.get(`search?searchOption=${searchOption}&searchText=${searchText}`);
        console.log("response : ", response);

        return response
    } catch (error) {
        // 에러 처리 로직을 추가할 수 있습니다.
        throw error;
    }
};

// 좋아요 요청 날리기
export const likeTechNote = async ({ userId, techNoteId }: IParameterForLikeTechNote): Promise<AxiosResponse> => {
    try {
        const response = await instance.post('/likeTechNote', { userId, techNoteId });
        return response;
    } catch (error) {
        throw error;
    }
};

export const likeSkilNote = async ({ userId, skilNoteId }: IParameterForLikeSkilNote): Promise<AxiosResponse> => {
    // alert(skilNoteId)
    try {
        const response = await instance.post('/likeSkilNote', { userId, skilNoteId });
        return response;
    } catch (error) {
        throw error;
    }
};

export const bookMarkTechNote = async ({ userId, techNoteId }: IParameterForLikeTechNote): Promise<AxiosResponse> => {
    try {
        const response = await instance.post('/bookMarkTechNote', { userId, techNoteId });
        return response;
    } catch (error) {
        throw error;
    }
};

export const bookMarkSkilNote = async ({ userId, skilNoteId }: IParameterForLikeSkilNote): Promise<AxiosResponse> => {
    try {
        const response = await instance.post('/bookMarkSkilNote', { userId, skilNoteId });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiForUpdateIsCompletedForTechNote = async ({ techNoteId, userId }: IParameterForUpdateIsCompletedForTechNote) => {
    try {
        const response = await instance.put('/participants/completed', { techNoteId, userId });
        console.log("response : ", response);
        return response;
    } catch (error) {
        throw error;
    }
}

export const apiForRegisterParticipantsForTechNote = async ({ techNoteId, userId }: IParameterForUpdateIsCompletedForTechNote) => {
    try {
        const response = await instance.post('/participants', { techNoteId, userId });
        console.log("response : ", response);
        return response;
    } catch (error) {
        throw error;
    }
}

// export const apiForRegisterParticipantsForSkilNote =
//     async ({ skilNoteId, userId }: IParameterForUpdateIsCompletedForSkilNote) => {
//         try {
//             const response = await instance.post('/participants', { skilNoteId, userId });
//             console.log("response : ", response);
//             return response;
//         } catch (error) {
//             throw error;
//         }
//     }