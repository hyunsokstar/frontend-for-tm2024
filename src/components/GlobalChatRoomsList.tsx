// src/components/GlobalChatRoomsList.tsx
import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Spinner, Box, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useApiForGetAllChatRooms from '@/hooks/useApiForGetAllChatRooms';
import { formatDateTime } from '@/utils/dataUtil';

const GlobalChatRoomsList: React.FC = () => {
    const { data, error, isLoading } = useApiForGetAllChatRooms();
    const router = useRouter();

    const handleEnterRoom = (id: string) => {
        router.push(`/global-chat-rooms/${id}`);
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Text color="red.500">Error: {error.message}</Text>
            </Box>
        );
    }

    return (
        <Box padding="4">
            <Text fontSize="2xl" marginBottom="4">Global Chat Rooms</Text>
            <TableContainer>
                <Table variant="striped" colorScheme="teal">
                    <Thead>
                        <Tr>
                            <Th>Title</Th>
                            <Th>Owner</Th>
                            <Th>Created At</Th>
                            <Th>Enter</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data && data.map((room) => (
                            <Tr key={room.id}>
                                <Td>{room.title}</Td>
                                <Td>{room.owner.nickname}</Td>
                                <Td>{formatDateTime(room.created_at)}</Td>
                                <Td>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        borderColor="black"
                                        _hover={{ bg: "gray.200" }}
                                        onClick={() => handleEnterRoom(room.id)}
                                    >
                                        Enter
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default GlobalChatRoomsList;
