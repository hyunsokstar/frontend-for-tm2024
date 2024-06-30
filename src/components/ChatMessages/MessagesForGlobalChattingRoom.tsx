import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import useUser from '@/hooks/useUser';
import { IMessageForGlobalChatRoom } from '@/types/typeForChatting';
import ProfileImageForUserCard from '../ProfileImage/ProfileImageForUserCard';

interface IProps {
    messages: IMessageForGlobalChatRoom[];
}

const MessagesForGlobalChattingRoom: React.FC<IProps> = ({ messages }) => {
    const { isLoggedIn, loginUser, logout } = useUser();

    return (
        <Box flex={1} overflowY="auto" borderWidth={1} borderRadius="md" p={4}>
            {messages.map((message) => {
                const isOwnMessage = loginUser.nickname === message.writer.nickname;
                return (
                    <Flex key={message.id} mb={2} justify={isOwnMessage ? "flex-start" : "flex-end"}>
                        <Box display="flex" alignItems="center" mr={isOwnMessage ? 2 : 2} ml={isOwnMessage ? 0 : 2}>
                            <ProfileImageForUserCard user={message.writer} size="40px" /> {/* 크기 옵션 전달 */}
                        </Box>
                        <Box>
                            {/* <Text fontWeight="bold">{message.writer.nickname}</Text> */}
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
