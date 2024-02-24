import axios, { AxiosResponse } from "axios";
import { backendApi } from "./commonApi";
import { QueryFunctionContext } from "@tanstack/react-query";
import { IParameterForSeleteTaskForUnsignedTask, IParameterForUpdateRefSkilNoteForTodo, ITypeForSaveChatBoardForTodo, MultiUpdateTodoDto, parameterTypeForCreateChatBoardRow } from "@/types/typeforTodos";

const instance = axios.create({
    baseURL: `${backendApi}/todos`,
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

export const apiForUpdateRefSkilnoteForTodo =
    async ({ todoId, isMainOrSub }: IParameterForUpdateRefSkilNoteForTodo): Promise<AxiosResponse> => {
        console.log("todoId check : ", todoId);

        try {
            const response = await instance.post(
                `/${todoId}/updateRefSkilNote`, { isMainOrSub }
            );
            return response;
        } catch (error) {
            // 에러 처리 로직을 추가할 수 있습니다.
            throw error;
        }
    };

export const apiForCreateChatBoardRow =
    (
        {
            todoId,
            userId,
            content,
            position,
            isMainOrSub,
            refImage
        }: parameterTypeForCreateChatBoardRow
    ): any => {
        const dtoForChatBoard = {
            userId,
            position,
            content,
            isMainOrSub,
            refImage
        }

        return instance.post(
            `${todoId}/create/briefing`, dtoForChatBoard
        ).then((response: any) => response.data)
    }

export const apiForGetAllTodoList = ({ queryKey }: QueryFunctionContext) => {
    const [_, pageNum] = queryKey;
    // console.log("pageNum : ", pageNum);

    return instance
        .get('', {
            params: { pageNum: pageNum },
        })
        .then((response) => {
            return response.data;
        });
};

export const apiForUncompletedTodoListForUserId = ({ queryKey }: QueryFunctionContext) => {
    const [_, pageNum, userId, todoStatusOption] = queryKey;

    return instance
        .get('forUser', {
            params: {
                pageNum: pageNum,
                userId: userId,
                todoStatusOption: todoStatusOption
            },
        })
        .then((response) => {
            return response.data;
        });
};

interface dtoForSaveTodos {
    id: any,
    email: string;
    todo: string;
    status: string;
    startTime: string;
    deadline: Date;
}

export const apiForSaveTodoRows = async ({ todoRowsForSave }: any) => {
    console.log("todoForSave ( at api ) : ", todoRowsForSave);

    const response = await instance.post(
        'saveTodos', todoRowsForSave
    );
    return response.data;
}

export const apiForDeleteTodosForCheckedRows = (checkedIds: number[]): Promise<any> => {
    console.log('checkedIds at api', checkedIds);

    return instance.delete(`/deleteTodosForCheckedRows`, { data: { checkedIds } })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log("error : ", error);

            throw error; // 에러를 그대로 던지기
        });
};

export const apiForDeleteSupplementaryTodosForCheckedRows = (checkedIds: number[]): Promise<any> => {
    console.log('checkedIds at api', checkedIds);

    return instance.delete(`/deleteSupplementaryTodosForCheckedRows`, { data: { checkedIds } })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log("error : ", error);

            throw error; // 에러를 그대로 던지기
        });
};

export const apiForgetAllTodoBriefingsByTodoId = async (todoId: string): Promise<AxiosResponse<any>> => {
    try {
        const response = await instance.get(`/${todoId}/briefings`);
        return response.data;
    } catch (error) {
        // 여기에 원하는 에러 핸들링을 추가하세요.
        throw error;
    }
};

// 1122
export const apiForSelectRefSkilnoteForTodo = async ({
    toDoId,
    skilNoteId,
    isMainOrSub
}: any): Promise<AxiosResponse> => {
    console.log("toDoId? : ", toDoId, "skilNoteId?", skilNoteId);
    console.log("isMainOrSub : ", isMainOrSub);

    try {
        const response = await instance.post("selectSkilNoteForTodo", {
            toDoId,
            skilNoteId,
            isMainOrSub
        });
        return response;
    } catch (error) {
        throw error;
    }

};

export const apiForGetMoreTodoList = (lastId: any) => {

    return instance
        .get('/loadMoreTodosForScroll', {
            params: { lastId: lastId },
        })
        .then((response) => {
            return response.data;
        });
};

export const apiForSimpleCreateTodo = ({
    task,
    deadline,
    email,
    rowNum,
    todoStatusOption
}: {
    task: string,
    deadline: Date,
    email: string,
    rowNum: number,
    todoStatusOption: string;
}) => {
    console.log("hi");
    const dtoForCreateSimpleCreateTodo = {
        task,
        deadline,
        email,
        rowNum,
        todoStatusOption
    }

    return instance.post(
        "simpleCreateTodo", dtoForCreateSimpleCreateTodo
    ).then((response: any) => response.data)
}

export const apiForSimpleCreateSupplementaryTodo = ({
    parentTodoId,
    task,
    deadline,
    email,
    rowNum,
}: {
    parentTodoId: number,
    task: string,
    deadline: Date,
    email: string,
    rowNum: number,
}) => {
    console.log("hi");
    const dtoForCreateSimpleCreateTodo = {
        parentTodoId,
        task,
        deadline,
        email,
        rowNum,
    }

    return instance.post(
        "simpleCreateSupplementaryTodo", dtoForCreateSimpleCreateTodo
    ).then((response: any) => response.data)
}

export const apiForSaveSupplementaryTodoRows =
    ({ supplementaryTodoRowsForSave, parentTodoId }: any) => {
        console.log("todoForSave ( at api ) : ", supplementaryTodoRowsForSave);

        return instance.post(
            'saveSupplementaryTodos',
            { supplementaryTodoRowsForSave, parentTodoId } // 데이터를 하나의 객체로 묶어 전달
        ).then((response: any) => response.data)
    }

export const apiForMultiUpdateTodoRowsForChecked = (
    dtoForMultiUpdateTodoRowsForChecked
        : MultiUpdateTodoDto
) => {

    console.log("dtoForMultiUpdateTodoRowsForChecked : ", dtoForMultiUpdateTodoRowsForChecked);

    return instance.post(
        'multiUpdateTodoRowsForChecked', dtoForMultiUpdateTodoRowsForChecked
    ).then((response: any) => response.data)

}

export const apiForMultiUpdateSupplementaryTodoRowsForChecked = (
    dtoForMultiUpdateSupplementaryTodoRowsForChecked
        : MultiUpdateTodoDto
) => {
    return instance.post(
        'multiUpdateSupplementaryTodoRowsForChecked', dtoForMultiUpdateSupplementaryTodoRowsForChecked
    ).then((response: any) => response.data)

}

// export const apiForUpdateTodoStatusFromReadyToProgress
// isMain, todoId,  

// apiForSelectManagerForUnsignedTask(todoId, comment.writer)

export const apiForSelectManagerForUnsginedTask =
    ({ todoId, writerId }: IParameterForSeleteTaskForUnsignedTask) => {

        console.log("todoId, writerId : ", todoId, writerId);

        return instance.post(
            'selectManagerForUnsignedTask', { todoId, writerId }
        ).then((response: any) => response.data)
    }
