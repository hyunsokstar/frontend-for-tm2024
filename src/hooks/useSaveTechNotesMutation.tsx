import React from 'react';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiForSaveTechNotes } from '@/api/apiForTechNotes';

const useSaveTechNotesMutation = () => {
    const queryClient = useQueryClient();
    const toast = useToast(); // useToast 훅 사용

    const mutationForSaveTodoRows = useMutation({
        mutationFn: apiForSaveTechNotes,
        onSuccess: (result) => {

            queryClient.refetchQueries({
                queryKey: ['apiForGetAllTechNoteList']
            });

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
            }

        },
        onError: (e) => {
            console.log("error for save technote : ", e);

        }
    });

    return mutationForSaveTodoRows;
};

export default useSaveTechNotesMutation