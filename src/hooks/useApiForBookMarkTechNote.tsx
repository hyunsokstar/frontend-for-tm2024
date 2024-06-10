import { bookMarkTechNote } from '@/api/apiForTechNotes';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useApiForBookMarkTechNote = (pageNum: number, roadMapId?: number) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForLikeTechNote = useMutation({
        mutationFn: bookMarkTechNote,
        onSuccess: (result: any) => {
            console.log("result : ", result);
            // Add your logic for refetching queries or other actions
            // Modify the queryKey as needed

            if (roadMapId) {
                queryClient.refetchQueries({
                    queryKey: ['apiForGetTechNotesByRoadMapId', roadMapId] // Example queryKey, modify as needed
                });
            }

            queryClient.refetchQueries({
                queryKey: ['apiForGetAllTechNoteList'] // Example queryKey, modify as needed
            });

            toast({
                title: "bookmark liked successfully",
                description: result.message,
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.log("error : ", error);

            toast({
                title: error.response.data.error,
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForLikeTechNote;
};

export default useApiForBookMarkTechNote;
