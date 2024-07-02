import { apiForUpdateRefSkilnoteForTodo } from '@/api/apiForTodos';
import { RootState } from '@/store';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

interface IProps {
    pageNum: any,
    userId: any,
    todoStatusOption: "all_uncompleted" | "all_completed" | "idea" | "uncompleted" | "complete" | "entry";
}

const useApiForUpdateRefSkilnoteForTodo = ({ pageNum, userId, todoStatusOption }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const loginUser = useSelector((state: RootState) => state.user.loginUser);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    const mutationForUpdateRefSkilnoteForTodo = useMutation({
        mutationFn: apiForUpdateRefSkilnoteForTodo,
        onSuccess: (result: any) => {
            // 성공 시 처리 로직을 추가합니다.
            toast({
                title: "Update Ref Skilnote for Todo success ?",
                description: result.message,
                status: "success",
                duration: 2000,
                isClosable: true,
            });

            if (userId === "allUser") {
                queryClient.refetchQueries({
                    queryKey: ['uncompletedTodoListForUser', pageNum, userId, todoStatusOption],
                });
            } else {
                // queryKey: ['uncompletedTodoListForUser', pageNum, selectedUserId, todoStatusOption],
                queryClient.refetchQueries({
                    queryKey: ['uncompletedTodoListForUser', pageNum, userId, todoStatusOption],
                });
            }

            // if (pageInfo === "uncompletedTodosPageForUser") {
            //     queryClient.refetchQueries({
            //         queryKey: ['uncompletedTodoList', pageNum, loginUser.id],
            //     });
            // } else {
            //     queryClient.refetchQueries({
            //         queryKey: ['apiForGetAllTodoList', pageNum]
            //     });
            // }


        },
        onError: (error: any) => {
            // 에러 시 처리 로직을 추가합니다.
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

    return mutationForUpdateRefSkilnoteForTodo;
};

export default useApiForUpdateRefSkilnoteForTodo;
