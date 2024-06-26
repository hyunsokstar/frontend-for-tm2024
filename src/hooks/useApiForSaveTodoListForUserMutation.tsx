import React from 'react';
import { apiForSaveTodoRows } from '@/api/apiForTodos';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// todoStatusOption: "all_uncompleted" | "all_completed" | "idea" | "uncompleted" | "complete" | "entry";
interface IProps {
    pageNum: any,
    userId: any,
    todoStatusOption: "all_uncompleted" | "all_completed" | "idea" | "uncompleted" | "complete" | "entry";
}


const useApiForSaveTodoListForUserMutation = ({ pageNum, userId, todoStatusOption }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast(); // useToast 훅 사용

    const mutationForSaveTodoRows = useMutation({
        mutationFn: apiForSaveTodoRows,
        onSuccess: (result) => {
            console.log("result : ", result);

            console.log("typeof pagenum ", typeof pageNum);


            console.log("this is save todos ?????", todoStatusOption);

            if (todoStatusOption === "entry") {
                console.log("here this is entry???????", todoStatusOption);

                queryClient.refetchQueries({
                    queryKey: ['uncompletedTodoList', pageNum, userId, todoStatusOption]
                });

            } else if (todoStatusOption === "all_uncompleted" || todoStatusOption === "all_completed") {
                queryClient.refetchQueries({
                    queryKey: ['uncompletedTodoList', parseInt(pageNum), userId, "all_uncompleted"]
                });
                queryClient.refetchQueries({
                    queryKey: ['uncompletedTodoList', parseInt(pageNum), userId, "all_completed"]
                });

            } else {

                queryClient.refetchQueries({
                    queryKey: ['uncompletedTodoList', parseInt(pageNum), userId, todoStatusOption]
                });
                queryClient.refetchQueries({
                    queryKey: ['uncompletedTodoList', parseInt(pageNum), userId, "complete"]
                });
                queryClient.refetchQueries({
                    queryKey: ['uncompletedTodoList', parseInt(pageNum), userId, "idea"]
                });

            }

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

export default useApiForSaveTodoListForUserMutation