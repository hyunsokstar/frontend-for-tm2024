import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { DevBattleResponse } from '@/types/typeForDevBattle';
import { apiForUpdateDevBattleSubject } from '@/api/apiForDevBattle';

interface IUpdateDevBattleSubjectProps {
    id: number;
    subject: string;
}

const useApiForUpdateDevBattleSubject = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation<AxiosResponse<{ message: string, devBattle: DevBattleResponse }>, any, IUpdateDevBattleSubjectProps>({
        mutationFn: ({ id, subject }) => apiForUpdateDevBattleSubject(id, subject),
        onSuccess: (data) => {
            queryClient.refetchQueries({
                queryKey: ['apiForFindAllDevBattleList'],
            });
            toast({
                title: "DevBattle updated successfully",
                description: data.data.message,
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error) => {
            console.error("Error updating devBattle: ", error);

            toast({
                title: "Error updating devBattle",
                description: error.response?.data?.message || error.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });
};

export default useApiForUpdateDevBattleSubject;
