import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { apiForDeleteTodosForCheckedRows } from '@/api/apiForTodos';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

type IProps = {
    pageNum: any,
    pageInfo?: string
    todoStatusOption: "all_uncompleted" | "all_completed" | "idea" | "uncompleted" | "completed";
}

const useApiForDeleteTodosForCheckedIds = ({ pageNum, pageInfo, todoStatusOption }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast(); // useToast 훅 사용

    const loginUser = useSelector((state: RootState) => state.user.loginUser);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    const mutation = useMutation({
        mutationFn: apiForDeleteTodosForCheckedRows,
        onSuccess: (result) => {
            console.log("result : ", result);

            if (!result.success) {
                toast({
                    title: "error occured when delete todos",
                    description: result.message,
                    status: "warning",
                    duration: 2000, // 토스트 메시지가 보여지는 시간 (2초)
                    isClosable: true, // 닫기 버튼 표시
                });

                return
            }

            queryClient.refetchQueries({
                queryKey: ['uncompletedTodoList', parseInt(pageNum), loginUser.id, todoStatusOption],
            });

            toast({
                title: "delete todos for checked ids success",
                description: result.message,
                status: "success",
                duration: 2000, // 토스트 메시지가 보여지는 시간 (2초)
                isClosable: true, // 닫기 버튼 표시
            });

        },
        onError: (error: any) => {

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