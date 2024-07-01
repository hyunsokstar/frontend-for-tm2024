import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { apiForDeleteSkilNotesForCheckedIds } from '@/api/apiForSkilNote';

interface IProps {
    techNoteId?: number;
    pageNum: number;
    searchOption?: string;
    searchText?: string;
    isBestByLikes?: boolean;
    isBestByBookMarks?: boolean;
}

const useApiForDeleteSkilNotesForCheckedIds = ({
    techNoteId,
    pageNum,
    searchOption,
    searchText,
    isBestByLikes,
    isBestByBookMarks
}: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: apiForDeleteSkilNotesForCheckedIds,
        onSuccess: (result) => {
            console.log("result : ", result);

            if (techNoteId) {
                queryClient.invalidateQueries({
                    queryKey: [
                        'apiForGetSkillNotesByTechNoteId',
                        techNoteId,
                        pageNum,
                        searchOption,
                        searchText,
                        isBestByLikes,
                        isBestByBookMarks
                    ]
                });
            } else {
                queryClient.invalidateQueries({
                    queryKey: ['apiForGetAllSkilNoteList']
                });
            }

            toast({
                title: "Delete skilnote Success",
                description: result.message,
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error) => {
            console.error("Error deleting skilnotes:", error);
            toast({
                title: "Delete skilnote Error",
                description: "An unexpected error occurred",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    });

    return mutation;
}

export default useApiForDeleteSkilNotesForCheckedIds;