import { bookMarkSkilNoteContent } from '@/api/apiForSkilNote';
import { RootState } from '@/store';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const useApiForBookMarkSkilNoteContent = (skilNoteId: any, pageNum: any) => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const skilNoteId2 = useSelector((state: RootState) => state.idAdmin.skilNoteId);


    const mutationForBookMarkSkilNoteContent = useMutation({
        mutationFn: bookMarkSkilNoteContent,
        onSuccess: (result: any) => {
            console.log("result : ", result);
            console.log("skilNoteId2 check : ", skilNoteId2);

            // ['apiForGetSkilNoteContentListForSkilNoteId', skilNoteId, pageNum]
            queryClient.refetchQueries({
                queryKey: ['apiForGetSkilNoteContentListForSkilNoteId', skilNoteId, pageNum] // Example queryKey, modify as needed
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

    return mutationForBookMarkSkilNoteContent;
};

export default useApiForBookMarkSkilNoteContent;
