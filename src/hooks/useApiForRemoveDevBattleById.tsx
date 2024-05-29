import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { apiForRemoveDevBattleById } from '@/api/apiForDevBattle';

const useApiForRemoveDevBattleById = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: apiForRemoveDevBattleById,
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: ['apiForFindAllDevBattleList'],
            });

            toast({
                title: `DevBattle deleted successfully`,
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any, id) => {
            console.error(`Error deleting DevBattle with id ${id}: `, error);
            toast({
                title: "Error deleting DevBattle",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutation;
};

export default useApiForRemoveDevBattleById;
