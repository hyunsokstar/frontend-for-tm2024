// src/hooks/useApiForAddChattingMessage.ts
import { apiForCreateMessage } from '@/api/apiForChatting';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useApiForAddChattingMessage = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: apiForCreateMessage,
        onSuccess: (data: any) => {
            queryClient.refetchQueries({
                queryKey: ['apiForFindAllDevBattleList'],
            });

            toast({
                title: "Message added successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.error("Error adding message: ", error);

            toast({
                title: "Error adding message",
                description: error.response?.data?.message || "An error occurred",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutation;
};

export default useApiForAddChattingMessage;
