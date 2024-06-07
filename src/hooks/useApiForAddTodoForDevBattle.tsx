
import { apiForAddTodoForDevBattle } from '@/api/apiForDevBattle';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';


interface IProps {
}

const useApiForAddTodoForDevBattle = ({ }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();


    const mutationForAddTodoForDevBattle = useMutation({
        mutationFn: apiForAddTodoForDevBattle,
        onSuccess: (data: any) => {

            queryClient.refetchQueries({
                queryKey: ['apiForFindAllDevBattleList'],
            });

            toast({
                title: "todo added sucessfuly",
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

    return mutationForAddTodoForDevBattle;
};

export default useApiForAddTodoForDevBattle;
