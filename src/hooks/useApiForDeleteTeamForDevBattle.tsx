import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { apiForDeleteTeamForDevBattle } from '@/api/apiForDevBattle';
// import { apiForDeleteTeamForDevBattle } from '@/api/apiForDevRelay';

const useApiForDeleteTeamForDevBattle = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: apiForDeleteTeamForDevBattle,
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: ['apiForFindAllDevBattleList'],
            });

            toast({
                title: "Team deleted successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.error("Error deleting team: ", error);
            toast({
                title: "Error deleting team",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutation;
};

export default useApiForDeleteTeamForDevBattle;
