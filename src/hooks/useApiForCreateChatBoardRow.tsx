import React from 'react';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiForCreateChatBoardRow } from '@/api/apiForTodos';
import { ITypeForSaveChatBoardForTodo } from '@/types/typeforTodos';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';


const useApiForCreateChatBoardRow = (pageNum: number, todoStatusOption: any) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const loginUser = useSelector((state: RootState) => state.user.loginUser);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    const mutationForCreateChatBoardRow = useMutation<ITypeForSaveChatBoardForTodo, any, any, any>({
        mutationFn: apiForCreateChatBoardRow,
        onSuccess: (result: any) => {
            // console.log("userId : ?????", typeof userId, userId);
            // queryKey: ['uncompletedTodoList', pageNum, userId, todoStatusOption],

            queryClient.refetchQueries({
                queryKey: ['uncompletedTodoList', pageNum, todoStatusOption]
            });

            toast({
                title: "Chat board row created successfully",
                description: result.message,
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.log("error : ", error);

            toast({
                title: error.response.data.error,
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });

        },
    });
    return mutationForCreateChatBoardRow;

};

export default useApiForCreateChatBoardRow;
