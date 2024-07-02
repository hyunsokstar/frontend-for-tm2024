import { apiForSelectRefSkilnoteForTodo } from '@/api/apiForTodos';
import { RootState } from '@/store';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const useApiForSelectRefSkilnoteForTodo = (pageNum: number, selectedUserId: any, pageInfo?: string) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const loginUser = useSelector((state: RootState) => state.user.loginUser);

    const mutationForSelectRefSkilnoteForTodo = useMutation({
        mutationFn: apiForSelectRefSkilnoteForTodo,
        onSuccess: (result: any) => {
            // 성공 시 처리 로직을 추가합니다.
            toast({
                title: "Select Ref Skilnote for Todo success",
                description: result.message,
                status: "success",
                duration: 2000,
                isClosable: true,
            });

            // queryKey: ['uncompletedTodoListForUser', pageNum, selectedUserId, todoStatusOption],
            if (selectedUserId === "allUser") {
                queryClient.refetchQueries({
                    queryKey: ['uncompletedTodoListForUser', pageNum, selectedUserId, "all_uncompleted"],
                });
            } else {
                // queryKey: ['uncompletedTodoListForUser', pageNum, selectedUserId, todoStatusOption],
                queryClient.refetchQueries({
                    queryKey: ['uncompletedTodoListForUser', pageNum, selectedUserId, "uncompleted"],
                });
            }

            // if (pageInfo === "uncompletedTodosPageForUser") {
            //     console.log("실행 for user");
            //     queryClient.refetchQueries({
            //         queryKey: ['uncompletedTodoList', pageNum, undefined, "all_uncompleted"] // 수정 필요한 부분
            //     });
            // } else {
            //     console.log("실행 for all user");
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

    return mutationForSelectRefSkilnoteForTodo;
};

export default useApiForSelectRefSkilnoteForTodo;
