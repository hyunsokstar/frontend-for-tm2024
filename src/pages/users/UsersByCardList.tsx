import React from 'react';
import { SimpleGrid, Box, Center, Spinner, Text } from '@chakra-ui/react';
import useApiForGetAllUsersData from '@/hooks/useApiForGetAllUsersData';
import UserCard from '@/components/Card/UserCard';

const UsersByCardList: React.FC = () => {
    const { isPending, error, userList } = useApiForGetAllUsersData(1);

    if (isPending) {
        return (
            <Center h="100vh">
                <Spinner size="xl" />
            </Center>
        );
    }

    if (error) {
        return (
            <Center h="100vh">
                <Text>Error loading users</Text>
            </Center>
        );
    }

    return (
        <Box p="4">
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="4">
                {userList.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default UsersByCardList;
