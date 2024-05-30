import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { apiForDeleteDevProgressForTeam } from '@/api/apiForDevBattle';

const useApiForDeleteDevProgressForTeam = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForDeleteDevProgressForTeam = useMutation({
        mutationFn: apiForDeleteDevProgressForTeam,
        onSuccess: () => {

            queryClient.refetchQueries({
                queryKey: ['apiForFindAllDevBattleList'],
            });

            toast({
                title: "Task deleted successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.error("Error deleting subject: ", error);
            toast({
                title: "Error deleting subject",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForDeleteDevProgressForTeam;
};

export default useApiForDeleteDevProgressForTeam;