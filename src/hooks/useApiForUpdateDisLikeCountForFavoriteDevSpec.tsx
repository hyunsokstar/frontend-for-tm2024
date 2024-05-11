import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { like, dislike } from '@/api/apiForFavoriteDevSpec';



const useApiForUpdateDislikeCountForFavoriteDevSpec = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForDislike = useMutation({
        mutationFn: dislike,
        onSuccess: (data: any) => {
            console.log("Dislike updated successfully: ", data);
            toast({
                title: "Dislike updated successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });

            queryClient.invalidateQueries({
                queryKey: ['getAllFavoriteDevSpecs'],
            });
        },
        onError: (error: any) => {
            console.error("Error updating dislike: ", error);
            toast({
                title: "Error updating dislike",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForDislike;
};

export default useApiForUpdateDislikeCountForFavoriteDevSpec