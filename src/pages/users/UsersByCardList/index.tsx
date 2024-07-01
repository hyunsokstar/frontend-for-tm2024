import React, { useState } from 'react';
import { SimpleGrid, Box, Center, Spinner, Text } from '@chakra-ui/react';
import useApiForGetAllUsersData from '@/hooks/useApiForGetAllUsersData';
import UserCard from '@/components/Card/UserCard';

const UsersByCardList: React.FC = () => {
    const [pageNum, setPageNum] = useState(1);
    const { isPending, error, userList } = useApiForGetAllUsersData(pageNum);

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
                    <UserCard key={user.id} user={user} pageNum={pageNum} />
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default UsersByCardList;