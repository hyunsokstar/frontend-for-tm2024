import { updateFavoriteDevSpec } from '@/api/apiForFavoriteDevSpec';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';


const useApiForUpdateBoilerPlateInfoForFavoriteDevSpec = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForUpdateRelatedProjectInfo = useMutation({
        mutationFn: updateFavoriteDevSpec,
        onSuccess: (data: any) => {
            console.log("FavoriteDevSpec updated successfully: ", data);
            toast({
                title: "FavoriteDevSpec updated successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });

            queryClient.refetchQueries({
                queryKey: ['getAllFavoriteDevSpecs']
            });

        },
        onError: (error: any) => {
            console.error("Error updating FavoriteDevSpec: ", error);
            // toast({
            //     title: "Error updating FavoriteDevSpec",
            //     description: error.config.response.data.message,
            //     status: "error",
            //     duration: 2000,
            //     isClosable: true,
            // });
        },
    });

    return mutationForUpdateRelatedProjectInfo;
};

export default useApiForUpdateBoilerPlateInfoForFavoriteDevSpec;
