import { AxiosResponse } from "axios";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForAddParticipantForSubChallenge } from "@/api/apiForChallenge";

interface IProps {
    subChallengeId: number;
}

const useApiForAddParticipantForSubChallenge = ({ subChallengeId }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForAddParticipant = useMutation<AxiosResponse<any>, Error, any>({
        mutationFn: (noteUrl: string) => apiForAddParticipantForSubChallenge(subChallengeId, noteUrl),
        onSuccess: (data: any) => {
            // 참가자가 성공적으로 추가된 경우의 처리
            console.log("Participant added successfully: ", data);
            console.log("subChallengeId ??? ", subChallengeId);
            // 추가적으로 필요한 로직 구현
            toast({
                title: data.data.message,
                status: "success",
                duration: 2000,
                isClosable: true,
            });

            queryClient.refetchQueries({
                queryKey: ['apiForGetAllParticipantsListForSubchallenges', subChallengeId]
            });
        },
        onError: (error: any) => {
            // 참가자 추가 중 오류가 발생한 경우의 처리
            console.error("Error adding participant: ", error);
            // 추가적으로 필요한 로직 구현
            toast({
                title: "Error adding participant",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForAddParticipant;
};

export default useApiForAddParticipantForSubChallenge;
