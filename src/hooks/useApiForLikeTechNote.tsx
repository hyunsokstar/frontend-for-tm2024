import { likeTechNote } from '@/api/apiForTechNotes';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useApiForLikeTechNote = (pageNum: any) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForLikeTechNote = useMutation({
        mutationFn: likeTechNote,
        onSuccess: (result: any) => {
            console.log("result : ", result);

            queryClient.refetchQueries({
                queryKey: ['apiForGetAllTechNoteList', pageNum] // Example queryKey, modify as needed
            });

            toast({
                title: "Tech note liked successfully",
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

export default useApiForLikeTechNote;
