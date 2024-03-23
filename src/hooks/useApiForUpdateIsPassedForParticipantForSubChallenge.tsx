import { apiForUpdateIsPassedForParticipantForSubChallenge } from '@/api/apiForChallenge';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IProps {
    subChallengeId: number;
    participantId: number;
}

const useApiForUpdateIsPassedForParticipantForSubChallenge = ({ subChallengeId, participantId }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForUpdateIsPassed = useMutation({
        mutationFn: (isPassed: boolean) => apiForUpdateIsPassedForParticipantForSubChallenge(subChallengeId, participantId, isPassed),
        onSuccess: (data: any) => {
            console.log("isPassed updated successfully: ", data);
            toast({
                title: data.data.message,
                status: "success",
                duration: 2000,
                isClosable: true,
            });

            // 추가적으로 필요한 로직 구현
            // 서버의 데이터를 다시 가져오는 등의 로직이 필요하면 여기에 추가
            queryClient.refetchQueries({
                queryKey: ['apiForGetAllParticipantsListForSubchallenges', subChallengeId],
            });
        },
        onError: (error: any) => {
            // isPassed 업데이트 중 오류가 발생한 경우의 처리
            console.error("Error updating isPassed: ", error);
            // 추가적으로 필요한 로직 구현
            toast({
                title: "Error updating isPassed",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForUpdateIsPassed;
};

export default useApiForUpdateIsPassedForParticipantForSubChallenge;
