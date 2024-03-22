import { AxiosResponse } from "axios";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateSubChallengeDto } from "@/types/typeforChallenges";
import { apiForCreateSubChallenge } from "@/api/apiForChallenge";

interface IProps {
    challengeId: number;
    pageNum: number;
}

const useApiForCreateSubChallenge = ({ challengeId, pageNum }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForCreateSubChallenge = useMutation<AxiosResponse<any>, Error, CreateSubChallengeDto>({
        mutationFn: (createSubChallengeDto: CreateSubChallengeDto) => apiForCreateSubChallenge(challengeId, createSubChallengeDto),
        onSuccess: (data: AxiosResponse<any>) => {
            // 서브 챌린지가 성공적으로 생성된 경우의 처리
            console.log("Sub challenge created successfully: ", data);
            // 추가적으로 필요한 로직 구현
            toast({
                title: "Sub challenge created successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });

            queryClient.refetchQueries({
                queryKey: ['apiForGetAllChallengesWithPageNum', pageNum]
            });

        },
        onError: (error: any) => {
            // 서브 챌린지 생성 중 오류가 발생한 경우의 처리
            console.error("Error creating sub challenge: ", error);
            // 추가적으로 필요한 로직 구현
            toast({
                title: "Error creating sub challenge",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForCreateSubChallenge;
};

export default useApiForCreateSubChallenge;
