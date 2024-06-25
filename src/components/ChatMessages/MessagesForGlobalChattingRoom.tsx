// src/components/MessagesForGlobalChattingRoom.tsx
import React from 'react';
import { Box, Text, Avatar, Flex } from '@chakra-ui/react';
import useUser from '@/hooks/useUser';
import { IMessageForGlobalChatRoom } from '@/types/typeForChatting';

interface IProps {
    messages: IMessageForGlobalChatRoom[]
}

const MessagesForGlobalChattingRoom = ({ messages }: IProps) => {
    const { isLoggedIn, loginUser, logout } = useUser();

    return (
        <Box flex={1} overflowY="auto" borderWidth={1} borderRadius="md" p={4}>
            {messages.map((message) => {
                const isOwnMessage = loginUser.nickname === message.writer.nickname;
                return (
                    <Flex key={message.id} mb={2} justify={isOwnMessage ? "flex-start" : "flex-end"}>
                        <Box display="flex" alignItems="center" mr={isOwnMessage ? 2 : 0} ml={isOwnMessage ? 0 : 2}>
                            <Avatar
                                name={message.writer.nickname}
                                src={message.writer.profileImage || undefined}
                                bg={message.writer.profileImage ? "transparent" : "gray.300"}
                            />
                        </Box>
                        <Box>
                            <Text fontWeight="bold">{message.writer.nickname}</Text>
                            <Text>{message.content}</Text>
                            <Text color="gray.500" fontSize="sm">
                                {new Date(message.created_at).toLocaleString()}
                            </Text>
                        </Box>
                    </Flex>
                );
            })}
        </Box>
    );
};

export default MessagesForGlobalChattingRoom;
