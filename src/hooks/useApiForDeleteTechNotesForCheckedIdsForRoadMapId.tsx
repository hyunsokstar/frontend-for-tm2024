import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { apiForDeleteTechNotesForCheckedIds } from '@/api/apiForTechNotes';

type Props = {
    roadMapId: number;
    pageNum: number;
    searchOption: string;
    searchText: string;
    isBestByLikes: boolean;
    isBestByBookMarks: boolean;
}

const useApiForDeleteTechNotesForCheckedIdsForRoadMapId = ({
    roadMapId,
    pageNum,
    searchOption,
    searchText,
    isBestByLikes,
    isBestByBookMarks
}: Props) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: apiForDeleteTechNotesForCheckedIds,
        onSuccess: (result) => {
            console.log("result : ", result);
            if (result.success) {
                toast({
                    title: "Delete User",
                    description: result.message,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });

                // Refetch after successful deletion
                queryClient.invalidateQueries({
                    queryKey: [
                        'apiForGetTechNotesByRoadMapId',
                        roadMapId,
                        pageNum,
                        searchOption,
                        searchText,
                        isBestByLikes,
                        isBestByBookMarks
                    ]
                });
            } else {
                toast({
                    title: "삭제 실패",
                    description: result.message,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            }
        },
    });

    return mutation;
}

export default useApiForDeleteTechNotesForCheckedIdsForRoadMapId