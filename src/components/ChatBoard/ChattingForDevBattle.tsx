import { useEffect, useRef, useState } from "react";
import { GridItem, Box, Text, HStack, Avatar, Input, Flex, Button } from '@chakra-ui/react';
import { IMessage, IChatRoom } from '@/types/typeForDevBattle';
import { RealtimeChannel, createClient } from "@supabase/supabase-js";

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
    const [message, setMessage] = useState<string>('');
    const channel = useRef<RealtimeChannel>();
    console.log("loginUser : ", loginUser);

    const handleMessageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            console.log(`Sending message: ${message}`);

            channel.current?.send({
                type: "broadcast",
                event: "message",
                payload: { message },
            });

            setMessage('');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    const SUPABASE_PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3d3pweXZxcGt2ZWpha2VyZnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MzQyMzYsImV4cCI6MjAzMDExMDIzNn0.SoNUYo5AJSZN1eEA9cXLabQmIy4OO_24-PDv69Ki5lo";
    const SUPABASE_URL = "https://swwzpyvqpkvejakerfxp.supabase.co";

    useEffect(() => {
        const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
        channel.current = client.channel(`room-${chatRoom.id}`);

        const subscription = channel.current.on("broadcast", { event: "message" }, (payload: any) => {
            console.log(payload);
        }).subscribe();

        console.log("subscription : ", subscription);
        return () => {
            channel.current?.unsubscribe();
        };

    }, [chatRoom.id]);

    if (loginUser?.id === 0) {
        return (
            <GridItem gridColumn={{ base: '1/-1', md: '4/5', lg: '4/5' }} bg={'gray.200'} p={4}>
                <Box bg="white" borderRadius="md" boxShadow="md" p={4}>
                    <Text fontSize="2xl" fontWeight="bold" color="red.500" textAlign="center">
                        로그인 해주세요
                    </Text>
                </Box>
            </GridItem>
        );
    }

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
                            value={message}
                            onChange={handleMessageInputChange}
                            onKeyDown={handleKeyPress}
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
