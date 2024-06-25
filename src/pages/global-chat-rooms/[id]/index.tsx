// src/pages/global-chat-rooms/[id]/index.tsx
import React from 'react';
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
    Image,
    Avatar,
} from '@chakra-ui/react';
import useApiForGetGlobalChatRoomById from '@/hooks/useApiForGetGlobalChatRoomById';
import MessagesForGlobalChattingRoom from '@/components/ChatMessages/MessagesForGlobalChattingRoom';

const ChatRoomPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

    const { data, isLoading, isError } = useApiForGetGlobalChatRoomById(id as string);

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
                <VStack align="stretch" h="full" p={4} spacing={4}>
                    <Heading>{data.title}</Heading>
                    <Text>Owner: {data.owner.email}</Text>
                    <Box flex={1} overflowY="auto" borderWidth={1} borderRadius="md" p={4}>
                        {/* 채팅 메시지 영역 */}

                        <MessagesForGlobalChattingRoom messages={data.messages ? data.messages : []} />
                    </Box>
                    {/* 메시지 입력 필드를 여기에 추가 */}
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

export default ChatRoomPage;
