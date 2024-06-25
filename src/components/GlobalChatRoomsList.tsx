// src/components/GlobalChatRoomsList.tsx
import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Spinner, Box, Text, Avatar, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useApiForGetAllChatRooms from '@/hooks/useApiForGetAllChatRooms';
import { formatDateTime } from '@/utils/dataUtil';
import useUser from '@/hooks/useUser';
import EnterButtonForSpecificGlobalChatRoom from './Button/EnterButtonForSpecificGlobalChatRoom'; // 수정된 부분

const GlobalChatRoomsList: React.FC = () => {
    const { data, error, isLoading } = useApiForGetAllChatRooms();
    const { isLoggedIn, loginUser } = useUser();
    const router = useRouter();

    const handleDeleteRoom = (id: string) => {
        // 삭제 처리 로직을 추가하세요.
        console.log(`Room with id ${id} deleted`);
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
                            <Th>User</Th>
                            <Th>Title</Th>
                            <Th>Owner</Th>
                            <Th>Created At</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data && data.map((room) => (
                            <Tr key={room.id}>
                                <Td>
                                    <Box display="flex" alignItems="center">
                                        <Avatar src={room.owner.profileImage} size="sm" mr="2" />
                                        <Box>
                                            <Text>{room.owner.email}</Text>
                                        </Box>
                                    </Box>
                                </Td>
                                <Td>{room.title}</Td>
                                <Td>{room.owner.nickname}</Td>
                                <Td>{formatDateTime(room.created_at)}</Td>
                                <Td>
                                    <EnterButtonForSpecificGlobalChatRoom roomId={room.id} /> {/* 수정된 부분 */}
                                    {isLoggedIn && loginUser.id === room.owner.id && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            borderColor="red.500"
                                            color="red.500"
                                            _hover={{ bg: "red.200" }}
                                            onClick={() => handleDeleteRoom(room.id)}
                                        >
                                            Delete
                                        </Button>
                                    )}
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
