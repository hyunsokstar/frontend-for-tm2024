import React from 'react';
import { apiForSaveSupplementaryTodoRows, apiForSaveTodoRows } from '@/api/apiForTodos';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IProps {
    pageNum: any,
    userId: any,
    todoStatusOption: "all_uncompleted" | "all_completed" | "idea" | "uncompleted" | "complete" | "entry";
}

const useApiForSaveSupplementaryTodoListForUserMutation = ({ pageNum, userId, todoStatusOption }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast(); // useToast 훅 사용

    const mutationForSaveTodoRows = useMutation({
        // mutationFn: apiForSaveTodoRows,
        mutationFn: apiForSaveSupplementaryTodoRows,
        onSuccess: (result: any) => {
            console.log("result : ", result);

            queryClient.refetchQueries({
                queryKey: ['uncompletedTodoList', pageNum, userId, todoStatusOption]
            });

            toast({
                title: "save todo rows success",
                description: result.message,
                status: "success",
                duration: 2000, // 토스트 메시지가 보여지는 시간 (2초)
                isClosable: true, // 닫기 버튼 표시
            });
        },
        onError: (error: any) => {
            // ...
            console.log("error : ", error);
            toast({
                title: error.response.data.error,
                description: error.response.data.message,
                status: "error",
                duration: 2000, // 토스트 메시지가 보여지는 시간 (2초)
                isClosable: true, // 닫기 버튼 표시
            });

        },
    });

    return mutationForSaveTodoRows;
};

export default useApiForSaveSupplementaryTodoListForUserMutation

