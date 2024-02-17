import React from 'react';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiForSaveSkilNotes } from '@/api/apiForSkilNote';

interface IProps {
    techNoteId?: number,
    pageNum: number
}

const useSaveSkilNotesMutation = ({ techNoteId, pageNum }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast(); // useToast 훅 사용

    const mutationForSaveTodoRows = useMutation({
        mutationFn: apiForSaveSkilNotes,
        onSuccess: (result) => {

            if (techNoteId) {
                queryClient.refetchQueries({
                    queryKey: ['apiForGetSkillNotesByTechNoteId', techNoteId, pageNum]
                });
            } else {
                queryClient.refetchQueries({
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

        }
    });

    return mutationForSaveTodoRows;
};

export default useSaveSkilNotesMutation 