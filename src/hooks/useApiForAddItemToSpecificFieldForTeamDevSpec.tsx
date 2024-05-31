import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { addLibraryToFavoriteDevSpec } from '@/api/apiForFavoriteDevSpec';
import { apiForAddItemToSpecificFieldForDevSpec } from '@/api/apiForDevBattle';
import { IDevSpecForTeamBattleUpdateDto } from '@/types/typeForDevBattle';

interface IProps {
    teamId: number; // Assuming the type
    devSpecForTeamBattleUpdateDto: IDevSpecForTeamBattleUpdateDto
}

const useApiForAddItemToSpecificFieldForTeamDevSpec = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation({
        mutationFn: ({
            teamId,
            devSpecForTeamBattleUpdateDto
        }: IProps) => apiForAddItemToSpecificFieldForDevSpec({
            teamId: teamId,
            devSpecForTeamBattleUpdateDto: devSpecForTeamBattleUpdateDto
        }),
        onSuccess: (data: any) => {
            queryClient.refetchQueries({
                queryKey: ['apiForFindAllDevBattleList'],
            });

            toast({
                title: "Library added successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.error("Error adding library: ", error);

            toast({
                title: "Error adding library",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });
};

export default useApiForAddItemToSpecificFieldForTeamDevSpec;
