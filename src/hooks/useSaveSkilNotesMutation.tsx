import React from 'react';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiForSaveSkilNotes } from '@/api/apiForSkilNote';

interface IProps {
    techNoteId?: number,
    pageNum: number,
    searchOption?: string,
    searchText?: string,
    isBestByLikes?: boolean,
    isBestByBookMarks?: boolean
}

const useSaveSkilNotesMutation = ({
    techNoteId,
    pageNum,
    searchOption,
    searchText,
    isBestByLikes,
    isBestByBookMarks
}: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForSaveSkilNotes = useMutation({
        mutationFn: apiForSaveSkilNotes,
        onSuccess: (result) => {
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

            if (result.status === "error") {
                toast({
                    title: "save skil note failure",
                    description: result.message,
                    status: "warning",
                    duration: 2000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "save skil note success",
                    description: result.message,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
            }
        },
        onError: (e) => {
            console.log("error for save skilnote : ", e);
            toast({
                title: "save skil note error",
                description: "An unexpected error occurred",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    });

    return mutationForSaveSkilNotes;
};

export default useSaveSkilNotesMutation;