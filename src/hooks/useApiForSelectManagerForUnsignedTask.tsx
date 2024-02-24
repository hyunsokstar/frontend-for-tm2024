import React from 'react';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiForSelectManagerForUnsginedTask } from '@/api/apiForTodos';

interface IProps {
    pageNum: any,
    userId: any,
    todoStatusOption: any
}

const useApiForSelectManagerForUnsignedTask = ({ pageNum, userId, todoStatusOption }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast(); // useToast 훅 사용

    const mutationForSelectManagerForUnsignedTask = useMutation({
        mutationFn: apiForSelectManagerForUnsginedTask,
        onSuccess: (data: any) => {
            console.log("Data: ", data);
            console.log("type ?????: ", typeof pageNum, typeof userId, typeof todoStatusOption);

            console.log("pageNum, userId, todoStatusOption ?????", pageNum, userId, todoStatusOption);



            queryClient.refetchQueries({
                queryKey: ['uncompletedTodoList', parseInt(pageNum), userId, todoStatusOption],
            });

            // 성공적인 알림 메시지를 띄웁니다.
            toast({
                title: "매니저 선택 완료",
                description: "매니저가 성공적으로 선택되었습니다.",
                status: "success",
                duration: 2000, // 토스트 메시지가 보여지는 시간 (2초)
                isClosable: true, // 닫기 버튼 표시
            });
        },
        onError: (error: any) => {
            console.log("Error: ", error);

            // 에러가 발생한 경우, 에러 메시지를 토스트로 표시합니다.
            toast({
                title: "에러 발생",
                description: error.message,
                status: "error",
                duration: 2000, // 토스트 메시지가 보여지는 시간 (2초)
                isClosable: true, // 닫기 버튼 표시
            });
        },
    });

    return mutationForSelectManagerForUnsignedTask;
};

export default useApiForSelectManagerForUnsignedTask;
