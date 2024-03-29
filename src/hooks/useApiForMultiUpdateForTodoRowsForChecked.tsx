import React from 'react';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiForMultiUpdateTodoRowsForChecked } from '@/api/apiForTodos';

interface IProps {
    pageNum: any,
    userId: any,
    todoStatusOption: "all_uncompleted" | "all_completed" | "idea" | "uncompleted" | "complete" | "entry";
}

const useApiForMultiUpdateForTodoRowsForChecked = ({ pageNum, userId, todoStatusOption }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForultiUpdateForTodoRowsForChecked = useMutation({
        mutationFn: apiForMultiUpdateTodoRowsForChecked,
        onSuccess: (result: any) => {
            queryClient.refetchQueries({
                queryKey: ['uncompletedTodoList', pageNum, userId, todoStatusOption],
            });

            toast({
                title: "multi update for todo rows success",
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

    return mutationForultiUpdateForTodoRowsForChecked;
};

export default useApiForMultiUpdateForTodoRowsForChecked