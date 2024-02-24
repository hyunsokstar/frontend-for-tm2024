import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { apiForDeleteSupplementaryTodosForCheckedRows, apiForDeleteTodosForCheckedRows } from '@/api/apiForTodos';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

interface IProps {
    pageNum: any,
    userId: any,
    todoStatusOption: "all_uncompleted" | "all_completed" | "idea" | "uncompleted" | "completed" | "entry";
}

const seApiForDeleteSupplementaryTodosForCheckedIds = ({ pageNum, userId, todoStatusOption }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast(); // useToast 훅 사용

    const loginUser = useSelector((state: RootState) => state.user.loginUser);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    const mutation = useMutation({
        mutationFn: apiForDeleteSupplementaryTodosForCheckedRows,
        onSuccess: (result) => {
            console.log("result : ", result);

            // if (pageInfo === "uncompletedTodosPageForUser") {
            //     queryClient.refetchQueries({
            //         queryKey: ['uncompletedTodoList', pageNum, loginUser.id],
            //     });
            // } else {
            //     queryClient.refetchQueries({
            //         queryKey: ['apiForGetAllTodoList', pageNum]
            //     });
            // }
            queryClient.refetchQueries({
                queryKey: ['uncompletedTodoList', pageNum, userId, todoStatusOption],
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

export default seApiForDeleteSupplementaryTodosForCheckedIds