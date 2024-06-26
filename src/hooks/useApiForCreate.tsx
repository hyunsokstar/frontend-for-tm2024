import { apiForAddItemToSpecificFieldForDevSpec } from '@/api/apiForDevBattle';
import { RootState } from '@/store';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';


interface IProps {
}

const useApiForSimpleCreateXXXXXXXXXX = ({ }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();


    const useApiForSimpleCreateXXXXXX = useMutation({
        mutationFn: apiForAddItemToSpecificFieldForDevSpec,
        onSuccess: (data: any) => {

            queryClient.refetchQueries({
                queryKey: ['apiForFindAllDevBattleList'],
            });

            toast({
                title: "Item Added to  SpecificField For DevSpec",
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

    return useApiForSimpleCreateXXXXXX;
};

export default useApiForSimpleCreateXXXXXXXXXX;
