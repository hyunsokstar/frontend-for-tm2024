import { updateFavoriteDevSpec } from '@/api/apiForFavoriteDevSpec';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IProps {
}

const useApiForUpdateXXXXXX = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForUpdateXXXXXX = useMutation({
        mutationFn: updateFavoriteDevSpec,
        onSuccess: (data: any) => {
            console.log("XXXXXX updated successfully: ", data);
            toast({
                title: "XXXXXX updated successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });

            queryClient.refetchQueries({
                queryKey: ['apiForGetAllChallengesWithPageNum']
            });

        },
        onError: (error: any) => {
            console.error("Error updating challenge: ", error);
            toast({
                title: "Error updating challenge",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForUpdateXXXXXX;
};

export default useApiForUpdateXXXXXX;
