import { apiForAddMessageToUserChatRoom } from '@/api/apiForChatting';
import { CreateMessageDtoForGlobolChatRoom } from '@/types/typeForChatting';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useApiForAddMessageToUserChatRoom = (chatRoomId: string, userId: any) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    console.log("chatRoomId : ", chatRoomId);


    const mutation = useMutation({
        mutationFn: (createMessageDto: CreateMessageDtoForGlobolChatRoom) =>
            apiForAddMessageToUserChatRoom(chatRoomId, createMessageDto),
        onSuccess: (data: any) => {
            queryClient.refetchQueries({
                queryKey: ['userChatRooms', userId],
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

export default useApiForAddMessageToUserChatRoom;