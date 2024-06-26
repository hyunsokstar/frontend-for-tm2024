// src/hooks/useApiForAddGlobalChatRoomMessage.ts
import { apiForAddMessageToGlobalChatRoom } from '@/api/apiForChatting';
import { CreateMessageDtoForGlobolChatRoom } from '@/types/typeForChatting';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useApiForAddGlobalChatRoomMessage = (chatRoomId: string) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: (createMessageDto: CreateMessageDtoForGlobolChatRoom) =>
            apiForAddMessageToGlobalChatRoom(chatRoomId, createMessageDto),
        onSuccess: (data: any) => {
            queryClient.refetchQueries({
                queryKey: ['globalChatRoom', chatRoomId],
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

export default useApiForAddGlobalChatRoomMessage;
