import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { apiForUpdateForSpecificDevSpecForNotArryTypeForTeamBattle } from '@/api/apiForDevBattle';

interface IProps {
    teamId: number; // Assuming the type
    fieldName: string;
    itemText: string;
}

const useApiForUpdateForSpecificDevSpecForNotArryTypeForTeamBattle = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation({
        mutationFn: ({ teamId, fieldName, itemText }: IProps) =>
            apiForUpdateForSpecificDevSpecForNotArryTypeForTeamBattle({
                teamId: teamId,
                fieldName: fieldName,
                itemText: itemText,
            }),
        onSuccess: (data: any) => {
            queryClient.refetchQueries({
                queryKey: ['apiForFindAllDevBattleList'],
            });

            toast({
                title: "Dev spec updated successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.error("Error updating dev spec: ", error);

            toast({
                title: "Error updating dev spec",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });
};

export default useApiForUpdateForSpecificDevSpecForNotArryTypeForTeamBattle;
