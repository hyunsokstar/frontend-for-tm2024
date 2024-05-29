
import { apiForAddTeamToDevBattle } from '@/api/apiForDevBattle';
import { apiForSimpleCreateSupplementaryTodo, apiForSimpleCreateTodo } from '@/api/apiForTodos';
import { RootState } from '@/store';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IProps {
}

const useApiForAddTeamToDevBattle = () => {
    const queryClient = useQueryClient();
    const toast = useToast();


    const mutationForAddTeamToDevBattle = useMutation({
        mutationFn: apiForAddTeamToDevBattle,
        onSuccess: (data: any) => {

            queryClient.refetchQueries({
                queryKey: ['apiForFindAllDevBattleList'],
            });

            toast({
                title: "Todo created successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.error("Error creating todo: ", error);

            toast({
                title: "Error creating todo",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForAddTeamToDevBattle;
};

export default useApiForAddTeamToDevBattle;
