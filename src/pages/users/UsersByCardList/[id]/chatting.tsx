import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import useApiForGetUserChatRoomInfo from '@/hooks/useApiForGetUserChatRoomInfo';

const Chatting: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
    const { data, isLoading, isError } = useApiForGetUserChatRoomInfo(id as string);

    const [message, setMessage] = useState('');

    console.log("data : ", data);

    const handleMessageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        console.log('Message to send:', message);
        // TODO: Implement send message functionality
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
                        {data.messages.map((msg) => (
                            <Flex key={msg.id} alignItems="center" mb={2}>
                                {msg.writer.profileImage ? (
                                    <Avatar src={msg.writer.profileImage} name={msg.writer.nickname} size="sm" mr={2} />
                                ) : (
                                    <Avatar size="sm" name={msg.writer.nickname} bg="gray.200" color="gray.600" mr={2}>
                                        {msg.writer.email.charAt(0).toUpperCase()}
                                    </Avatar>
                                )}
                                <Text>{msg.content}</Text>
                            </Flex>
                        ))}
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
                            <Button ml={2} onClick={handleSendMessage} colorScheme="blue">
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