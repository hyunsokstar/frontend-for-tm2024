import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { like, dislike } from '@/api/apiForFavoriteDevSpec';




const useApiForUpdateLikeCountForFavoriteDevSpec = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForLike = useMutation({
        mutationFn: like,
        onSuccess: (data: any) => {
            console.log("Like updated successfully: ", data);
            toast({
                title: "Like updated successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });

            queryClient.invalidateQueries({
                queryKey: ['getAllFavoriteDevSpecs'],
            });
        },
        onError: (error: any) => {
            console.error("Error updating like: ", error);
            toast({
                title: "Error updating like",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForLike;
};


export { useApiForUpdateLikeCountForFavoriteDevSpec };
