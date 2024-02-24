import { apiForSimpleCreateSupplementaryTodo, apiForSimpleCreateTodo } from '@/api/apiForTodos';
import { RootState } from '@/store';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';


interface IProps {
    pageNum: any,
    userId: any,
    todoStatusOption: "all_uncompleted" | "all_completed" | "idea" | "uncompleted" | "completed" | "entry";
}

const useApiForSimpleCreateSupplementaryTodo = ({ pageNum, userId, todoStatusOption }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const loginUser = useSelector((state: RootState) => state.user.loginUser);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    const useApiForSimpleCreateSupplementaryTodo = useMutation({
        mutationFn: apiForSimpleCreateSupplementaryTodo,
        onSuccess: (data: any) => {
            // console.log("Todo created successfully: ", data);
            let pageNum = 1


            queryClient.refetchQueries({
                queryKey: ['uncompletedTodoList', pageNum, userId, todoStatusOption],
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
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return useApiForSimpleCreateSupplementaryTodo;
};

export default useApiForSimpleCreateSupplementaryTodo;
