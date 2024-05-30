import { apiForAddMemberToTeam } from '@/api/apiForDevBattle';
import { } from '@/api/apiForTodos';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';


interface IProps {
}

const useApiForAddMemeberToDevBattleTeam = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForAddMemeberToDevBattleTeam = useMutation({
        mutationFn: apiForAddMemberToTeam,
        onSuccess: (data: any) => {

            console.log("success data: ", data);


            queryClient.refetchQueries({
                queryKey: ['apiForFindAllDevBattleList'],
            });

            toast({
                title: "Member Registered successfully",
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

    return mutationForAddMemeberToDevBattleTeam;
};

export default useApiForAddMemeberToDevBattleTeam;
