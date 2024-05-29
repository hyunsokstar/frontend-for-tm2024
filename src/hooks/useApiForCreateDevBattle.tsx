import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { apiForCreateDevBattle } from '@/api/apiForDevBattle';

const useApiForCreateDevBattle = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: apiForCreateDevBattle,
        onSuccess: (data) => {
            queryClient.refetchQueries({
                queryKey: ['apiForFindAllDevBattleList'],
            });

            toast({
                title: "DevBattle created successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.error("Error creating DevBattle: ", error);

            toast({
                title: "Error creating DevBattle",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutation;
};

export default useApiForCreateDevBattle;
