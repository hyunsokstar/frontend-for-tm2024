import React, { useState } from 'react';
import { GridItem, Box, Text, HStack, Avatar, Input, Flex, Button } from '@chakra-ui/react';
import { IMessage, IChatRoom } from '@/types/typeForDevBattle';

interface ChattingForDevBattleProps {
    chatRoom: IChatRoom;
    loginUser: {
        id: number;
        email: string;
        nickname: string;
        following: any[];
        followers: any[];
        cashPoints?: number | undefined;
        profileImage: string;
    };
}

const ChattingForDevBattle: React.FC<ChattingForDevBattleProps> = ({ chatRoom, loginUser }) => {
    const [messageInput, setMessageInput] = useState<string>('');

    const handleMessageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessageInput(event.target.value);
    };

    const handleSendMessage = () => {
        if (messageInput.trim() !== '') {
            // 여기에서 메시지 전송 로직을 추가할 수 있습니다.
            // 메시지를 전송하고, 입력값을 초기화하거나 다른 작업을 수행할 수 있습니다.
            console.log(`Sending message: ${messageInput}`);
            setMessageInput('');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <GridItem gridColumn={{ base: '1/-1', md: '4/5', lg: '4/5' }} bg={'gray.200'} p={4}>
            <Box bg="white" borderRadius="md" boxShadow="md" p={4}>
                <Box borderBottom="1px solid" borderColor="gray.200" pb={2} mb={2}>
                    <Text fontSize="lg" fontWeight="bold">
                        Chat
                    </Text>
                </Box>
                <Box overflowY="auto" maxH="300px">
                    {chatRoom.messages.map((message: IMessage) => (
                        <Flex
                            key={message.id}
                            mb={2}
                            justifyContent={message.writer.id === loginUser.id ? 'flex-start' : 'flex-end'}
                        >
                            <Flex
                                maxWidth="70%"
                                flexDirection={message.writer.id === loginUser.id ? 'row-reverse' : 'row'}
                            >
                                <Avatar
                                    name={message.writer.nickname}
                                    src={message.writer.profileImage}
                                    size="sm"
                                    bg={message.writer.id === loginUser.id ? 'yellow.300' : 'blue.300'}
                                    mr={message.writer.id === loginUser.id ? 0 : 2}
                                    ml={message.writer.id === loginUser.id ? 2 : 0}
                                />
                                <Box
                                    bg={message.writer.id === loginUser.id ? 'yellow.100' : 'blue.100'}
                                    p={2}
                                    borderRadius="md"
                                >
                                    <Text>{message.content}</Text>
                                </Box>
                            </Flex>
                        </Flex>
                    ))}
                </Box>
                <Box mt={4}>
                    <Flex>
                        <Input
                            placeholder="Type a message..."
                            value={messageInput}
                            onChange={handleMessageInputChange}
                            onKeyPress={handleKeyPress}
                        />
                        <Button ml={2} onClick={handleSendMessage}>
                            Send
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </GridItem>
    );
};

export default ChattingForDevBattle;
