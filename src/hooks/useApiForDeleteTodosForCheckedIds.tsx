import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { apiForDeleteTodosForCheckedRows } from '@/api/apiForTodos';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

type IProps = {
    pageNum: any,
    userId?: any;
    todoStatusOption: "all_uncompleted" | "all_completed" | "idea" | "uncompleted" | "complete" | "entry";
}

const useApiForDeleteTodosForCheckedIds = ({ pageNum, userId, todoStatusOption }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast(); // useToast 훅 사용

    const mutation = useMutation({
        mutationFn: apiForDeleteTodosForCheckedRows,
        onSuccess: (result) => {
            console.log("result : ", result);

            if (result.success === false) {
                toast({
                    title: "error occured when delete todos",
                    description: result.message,
                    status: "warning",
                    duration: 2000, // 토스트 메시지가 보여지는 시간 (2초)
                    isClosable: true, // 닫기 버튼 표시
                });

                return
            }

            console.log("todoStatusOption for delete: ", todoStatusOption);

            if (userId === "allUser") {
                queryClient.refetchQueries({
                    queryKey: ['uncompletedTodoListForUser', pageNum, userId, "all_uncompleted"],
                });
            } else {
                // queryKey: ['uncompletedTodoListForUser', pageNum, selectedUserId, todoStatusOption],
                queryClient.refetchQueries({
                    queryKey: ['uncompletedTodoListForUser', pageNum, userId, "uncompleted"],
                });
            }

            toast({
                title: "delete todos for checked ids success",
                description: result.message,
                status: "success",
                duration: 2000, // 토스트 메시지가 보여지는 시간 (2초)
                isClosable: true, // 닫기 버튼 표시
            });

        },
        onError: (error: any) => {
            console.log("error : ", error);

            const message = error.response.data.message

            toast({
                title: "error occured when delete todos",
                description: message,
                status: "error",
                duration: 2000, // 토스트 메시지가 보여지는 시간 (2초)
                isClosable: true, // 닫기 버튼 표시
            });

        },
    });

    return mutation;
}

export default useApiForDeleteTodosForCheckedIds