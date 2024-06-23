import { useEffect, useRef, useState } from "react";
import { GridItem, Box, Text, HStack, Avatar, Input, Flex, Button } from '@chakra-ui/react';
import { IMessage, IChatRoom } from '@/types/typeForDevBattle';
import { RealtimeChannel, createClient } from "@supabase/supabase-js";
import useApiForAddChattingMessage from "@/hooks/useApiForCreateChattingMessage";
import { useQueryClient } from "@tanstack/react-query";

interface ChattingForDevBattleProps {
    chatRoom: IChatRoom;
    loginUser: {
        id: number;
        email: string;
        nickname: string;
        following: any[];
        followers: any[];
        cashPoints?: number | undefined;
        profileImage?: string;
    };
}

const ChattingForDevBattle: React.FC<ChattingForDevBattleProps> = ({ chatRoom: initialChatRoom, loginUser }) => {
    const [message, setMessage] = useState<string>('');
    const [chatRoom, setChatRoom] = useState<IChatRoom>(initialChatRoom);
    const channel = useRef<RealtimeChannel>();
    const mutation = useApiForAddChattingMessage();
    const queryClient = useQueryClient();

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

            // useApiForAddChattingMessage 를 이용한 채팅 메시지 추가
            mutation.mutate({ chatRoomId: chatRoom.id, content: message });

            setMessage('');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    // 환경 변수에서 SUPABASE 키와 URL 가져오기
    const SUPABASE_PUBLIC_KEY = process.env.SUPABASE_PUBLIC_KEY || "";
    const SUPABASE_URL = process.env.SUPABASE_URL || "";

    useEffect(() => {
        const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
        channel.current = client.channel(`room-${chatRoom.id}`);

        const subscription = channel.current.on("broadcast", { event: "message" }, (payload: any) => {
            console.log("payload:", payload);
            queryClient.refetchQueries({
                queryKey: ['apiForFindAllDevBattleList'],
            });
        }).subscribe();

        console.log("subscription : ", subscription);
        return () => {
            channel.current?.unsubscribe();
        };

    }, [chatRoom.id, mutation, queryClient]);

    useEffect(() => {
        setChatRoom(initialChatRoom);
    }, [initialChatRoom]);

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
                <Box overflowY="auto" minH="75vh">
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
