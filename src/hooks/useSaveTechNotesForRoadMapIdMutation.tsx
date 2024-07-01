import React from 'react';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiForSaveTechNotes } from '@/api/apiForTechNotes';

type Props = {
    roadMapId: string | number;
    pageNum: number;
    searchOption: string;
    searchText: string;
    isBestByLikes: boolean;
    isBestByBookMarks: boolean;
}

const useSaveTechNotesForRoadMapIdMutation = ({
    roadMapId,
    pageNum,
    searchOption,
    searchText,
    isBestByLikes,
    isBestByBookMarks
}: Props) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForSaveTechNotes = useMutation({
        mutationFn: apiForSaveTechNotes,
        onSuccess: (result) => {
            if (result.status === "error") {
                toast({
                    title: "save tech note failure",
                    description: result.message,
                    status: "warning",
                    duration: 2000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "save tech note success",
                    description: result.message,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });

                // Refetch after successful save
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
            }
        },
        onError: (e) => {
            console.log("error for save technote : ", e);
            toast({
                title: "save tech note error",
                description: "An unexpected error occurred",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    });

    return mutationForSaveTechNotes;
};

export default useSaveTechNotesForRoadMapIdMutation;