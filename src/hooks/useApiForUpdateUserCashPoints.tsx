import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiForUpdateUserCashPoints } from '@/api/apiForUserBoard';

const useApiForUpdateUserCashPoints = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForUpdateUserCashPoints = useMutation({
        mutationFn: apiForUpdateUserCashPoints,
        onSuccess: (result) => {
            // 성공 시 처리
            console.log("update user cash points success:", result);

            // 성공 토스트 메시지 표시
            toast({
                title: "Cash points updated",
                description: result.message,
                status: "success",
                duration: 2000,
                isClosable: true,
            });

            // 페이지 이동
            router.push('/PaymentHistory');

            return result.data;
        },
        onError: (error) => {
            // 에러 시 처리
            console.error("update user cash points error:", error);

            // 에러 토스트 메시지 표시
            toast({
                title: "Error updating cash points",
                description: error.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });

            return error;
        },
    });

    return mutationForUpdateUserCashPoints;
};

export default useApiForUpdateUserCashPoints;
