import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import {
    apiForUpdateDevProgressForTeam,
} from '@/api/apiForDevBattle';
import { IUpdateDevProgressForTeamDto, ResponseForUpdateDevProgressForTeam } from '@/types/typeForDevBattle';

const useApiForUpdateDevProgressForTeam = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation({
        mutationFn: apiForUpdateDevProgressForTeam,
        onSuccess: (data: ResponseForUpdateDevProgressForTeam) => {
            queryClient.refetchQueries({
                queryKey: ['apiForFindAllDevBattleList'],
            });

            toast({
                title: "Dev progress updated successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: unknown) => {
            console.error("Error updating dev progress: ", error);

            toast({
                title: "Error updating dev progress",
                description: (error as any)?.response?.data?.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });
};

export default useApiForUpdateDevProgressForTeam;
