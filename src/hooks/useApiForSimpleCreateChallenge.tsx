import { IChallengeRow, ICreateChallengeDto } from '@/types/typeforChallenges';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { apiForCreateChallenge } from '@/api/apiForChallenge';

interface IProps {
    pageNum: number
}

const useApiForSimpleCreateChallenge = ({ pageNum }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const loginUser = useSelector((state: RootState) => state.user.loginUser);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    const mutationForSimpleCreateChallenge = useMutation<IChallengeRow, Error, ICreateChallengeDto>({
        mutationFn: apiForCreateChallenge,
        onSuccess: (data: IChallengeRow) => {
            // 챌린지가 성공적으로 생성된 경우의 처리
            console.log("Challenge created successfully: ", data);
            // 추가적으로 필요한 로직 구현
            toast({
                title: "Challenge created successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });

            queryClient.refetchQueries({
                queryKey: ['apiForGetAllChallengesWithPageNum', pageNum]
            });

        },
        onError: (error: any) => {
            // 챌린지 생성 중 오류가 발생한 경우의 처리
            console.error("Error creating challenge: ", error);
            // 추가적으로 필요한 로직 구현
            toast({
                title: "Error creating challenge",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForSimpleCreateChallenge;
};

export default useApiForSimpleCreateChallenge;
