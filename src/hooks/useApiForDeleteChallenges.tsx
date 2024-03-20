import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { apiForDeleteChallenge } from '@/api/apiForChallenge';

const useApiForDeleteChallenges = (pageNum: number) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: apiForDeleteChallenge,
        onSuccess: () => {
            toast({
                title: "챌린지 삭제 성공",
                status: "success",
                duration: 2000,
                isClosable: true,
            });

            queryClient.refetchQueries({
                queryKey: ['apiForGetAllChallengesWithPageNum', pageNum],
            });

        },
        onError: (error: any) => {
            toast({
                title: "챌린지 삭제 실패",
                description: error.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutation;
}

export default useApiForDeleteChallenges;
