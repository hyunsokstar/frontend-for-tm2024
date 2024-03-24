import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { AxiosError, AxiosResponse } from 'axios';
import { CreateBriefingForSubChallengeDto } from '@/types/typeforChallenges';
import { apiForCreateBriefingForSubChallenge } from '@/api/apiForChallenge';

const useCreateBriefingForSubChallengeMutation = (pageNum: number) => {
    const toast = useToast();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: apiForCreateBriefingForSubChallenge,
        onSuccess: () => {
            toast({
                title: 'Briefing for sub-challenge created successfully',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
            // Optionally refetch relevant queries after successful mutation
            queryClient.refetchQueries({
                queryKey: ['apiForGetAllChallengesWithPageNum', pageNum],
            });
        },
        onError: (error) => {
            toast({
                title: 'Error creating briefing',
                description: error.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        },
    }
    );

    return mutation;
};

export default useCreateBriefingForSubChallengeMutation;
