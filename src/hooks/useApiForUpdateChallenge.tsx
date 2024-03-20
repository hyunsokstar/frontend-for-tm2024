import { apiForUpdateChallenge } from '@/api/apiForChallenge';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IProps {
    pageNum: number
}

const useApiForUpdateChallenge = ({ pageNum }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForUpdateChallenge = useMutation({
        mutationFn: apiForUpdateChallenge,
        onSuccess: (data: any) => {
            // 챌린지가 성공적으로 업데이트된 경우의 처리
            console.log("Challenge updated successfully: ", data);
            // 추가적으로 필요한 로직 구현
            toast({
                title: "Challenge updated successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });

            queryClient.refetchQueries({
                queryKey: ['apiForGetAllChallengesWithPageNum', pageNum]
            });

        },
        onError: (error: any) => {
            // 챌린지 업데이트 중 오류가 발생한 경우의 처리
            console.error("Error updating challenge: ", error);
            // 추가적으로 필요한 로직 구현
            toast({
                title: "Error updating challenge",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForUpdateChallenge;
};

export default useApiForUpdateChallenge;
