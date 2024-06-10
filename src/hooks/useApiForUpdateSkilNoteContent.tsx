import React from 'react';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiForUpdateSkilNoteContent } from '@/api/apiForSkilNote';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const useApiForUpdateSkilNoteContent = (skilNoteId: any, pageNum: number) => {
    const queryClient = useQueryClient();
    const toast = useToast();
    // skilnoteContentNaviSlice
    // const noteId = useSelector((state: RootState) => state.skilnoteContentNaviSlice.noteId);

    const mutationForUpdateSkilNoteContent = useMutation({
        mutationFn: apiForUpdateSkilNoteContent,
        onSuccess: (result: any) => {

            console.log("mutation for update skilnote content check !?", skilNoteId, pageNum);
            // apiForGetSkilNoteContentListForSkilNoteId
            queryClient.refetchQueries({
                queryKey: ['apiForGetSkilNoteContentListForSkilNoteId', skilNoteId, pageNum]
            });

            toast({
                title: "update skilnote content success 12",
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

    return mutationForUpdateSkilNoteContent;
};

export default useApiForUpdateSkilNoteContent