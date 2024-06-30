import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {
    Box,
    Grid,
    GridItem,
    Heading,
    Text,
    VStack,
    List,
    ListItem,
    useMediaQuery,
    Input,
    Button,
    Flex,
    Avatar,
    useToast,
} from '@chakra-ui/react';
import useApiForGetUserChatRoomInfo from '@/hooks/useApiForGetUserChatRoomInfo';
import useApiForAddMessageToUserChatRoom from '@/hooks/useApiForAddMessageToUserChatRoom';
import { RealtimeChannel, createClient } from "@supabase/supabase-js";
import { useQueryClient } from '@tanstack/react-query';
import MessagesForGlobalChattingRoom from '@/components/ChatMessages/MessagesForGlobalChattingRoom';


const Chatting: React.FC = () => {
    const router = useRouter();
    const { userId } = router.query;
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
    const { data, isLoading, isError } = useApiForGetUserChatRoomInfo(userId as string);
    const [chatRoomId, setChatRoomId] = useState<string | undefined>(undefined);
    const addMessage = useApiForAddMessageToUserChatRoom(chatRoomId as string, userId);
    const toast = useToast();
    const channel = useRef<RealtimeChannel>();
    const queryClient = useQueryClient();

    const [message, setMessage] = useState('');

    // 환경 변수에서 SUPABASE 키와 URL 가져오기
    const SUPABASE_PUBLIC_KEY = process.env.SUPABASE_PUBLIC_KEY || "";
    const SUPABASE_URL = process.env.SUPABASE_URL || "";

    useEffect(() => {
        const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
        channel.current = client.channel(`room-${chatRoomId}`);

        const subscription = channel.current.on("broadcast", { event: "message" }, (payload: any) => {
            console.log("payload:", payload);
            console.log("chatRoomId check : ", chatRoomId);

            queryClient.refetchQueries({
                queryKey: ['userChatRooms', userId],
            });
        }).subscribe();

        console.log("subscription : ", subscription);
        return () => {
            channel.current?.unsubscribe();
        };

    }, [chatRoomId]);

    useEffect(() => {
        if (data && data.id) {
            setChatRoomId(data.id);
        }
    }, [data]);

    console.log("data : ", data);

    const handleMessageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (!chatRoomId) {
            toast({
                title: "Error",
                description: "Chat room ID is not available.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            return;
        }

        if (message.trim() === '') {
            toast({
                title: "Empty message",
                description: "Please enter a message before sending.",
                status: "warning",
                duration: 2000,
                isClosable: true,
            });
            return;
        }

        channel.current?.send({
            type: "broadcast",
            event: "message",
            payload: { message },
        });

        addMessage.mutate(
            { content: message },
        );
        setMessage('');
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    if (isLoading) {
        return <Box>Loading...</Box>;
    }

    if (isError || !data) {
        return <Box>Error fetching chat room!</Box>;
    }

    return (
        <Grid
            templateColumns={isLargerThan768 ? 'repeat(6, 1fr)' : '1fr'}
            gap={4}
            h="100vh"
        >
            <GridItem colSpan={isLargerThan768 ? 5 : 6}>
                <VStack align="stretch" h="90vh" p={4} spacing={4}>
                    <Heading>{data.title}</Heading>
                    <Text>Owner: {data.owner.email}</Text>
                    <Box flex={1} overflowY="auto" borderWidth={1} borderRadius="md" p={4} bg="gray.50">
                        <MessagesForGlobalChattingRoom messages={data.messages ? data.messages : []} />
                    </Box>
                    <Box mt={4} p={4} borderWidth={1} borderRadius="md" bg="gray.100">
                        <Flex>
                            <Input
                                placeholder="Type a message..."
                                value={message}
                                onChange={handleMessageInputChange}
                                onKeyDown={handleKeyPress}
                                bg="white"
                                borderColor="gray.300"
                            />
                            <Button
                                ml={2}
                                onClick={handleSendMessage}
                                colorScheme="blue"
                                isDisabled={!chatRoomId}
                            >
                                Send
                            </Button>
                        </Flex>
                    </Box>
                </VStack>
            </GridItem>

            {isLargerThan768 && (
                <GridItem colSpan={1} bg="gray.100" p={4} overflowY="auto">
                    <Heading size="md" mb={4}>Participants</Heading>
                    <List display="flex" flexDirection="column" alignItems="stretch" spacing={1}>
                        {data.users.map((participant) => (
                            <ListItem key={participant.id} display="flex" alignItems="center">
                                {participant.profileImage ? (
                                    <Avatar src={participant.profileImage} name={participant.nickname} size={"sm"} />
                                ) : (
                                    <Avatar size="sm" name={participant.nickname} bg="gray.200" color="gray.600">
                                        {participant.email.charAt(0).toUpperCase()}
                                    </Avatar>
                                )}
                                <Text ml={2}>{participant.email}</Text>
                            </ListItem>
                        ))}
                    </List>
                </GridItem>
            )}
        </Grid>
    );
};

export default Chatting;