import { apiForSimpleCreateTodo } from '@/api/apiForTodos';
import { RootState } from '@/store';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';


interface IProps {
    pageInfo?: string
    todoStatusOption: "all_uncompleted" | "all_completed" | "idea" | "uncompleted" | "complete" | "entry";
    userId: any,

}
// queryKey: ['uncompletedTodoListForUser', pageNum, userId, todoStatusOption],
const useApiForSimpleCreateTodo = ({ pageInfo, userId, todoStatusOption }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const loginUser = useSelector((state: RootState) => state.user.loginUser);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    const mutationForSimpleCreateTodo = useMutation({
        mutationFn: apiForSimpleCreateTodo,
        onSuccess: (data: any) => {
            // console.log("Todo created successfully: ", data);
            let pageNum = 1

            // queryClient.refetchQueries({
            //     queryKey: ['uncompletedTodoList', pageNum, userId, todoStatusOption]
            // });
            queryClient.refetchQueries({
                queryKey: ['uncompletedTodoList', pageNum, todoStatusOption]
            });

            toast({
                title: "Todo created successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.error("Error creating todo: ", error);

            toast({
                title: "Error creating todo",
                description: error.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForSimpleCreateTodo;
};

export default useApiForSimpleCreateTodo;
