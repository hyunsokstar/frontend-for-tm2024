import React from 'react';
import { Box, Image, Text, VStack, HStack, IconButton, Switch, Stack } from '@chakra-ui/react';
import { FiMessageSquare, FiUser, FiClipboard } from 'react-icons/fi';
import { FaRunning, FaMeh, FaSmile, FaUmbrellaBeach } from 'react-icons/fa';
import { IoMdTime } from "react-icons/io";
import { MdOutlineTimeline } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";


import { IUser } from '@/types/typeForUserBoard';
import IconButtonForShowUserTaskCondition from '../Button/IconButtonForShowUserTaskCondition';

type UserCardProps = {
    user: IUser;
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const statusIcon = () => {
        switch (user.role) {
            case 'ninja':
                return <FaRunning />;
            case 'stressed':
                return <FaMeh />;
            case 'away':
                return <FaSmile />;
            case 'vacation':
                return <FaUmbrellaBeach />;
            default:
                return <FiUser />;
        }
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" shadow="md">
            <Image src={user.profileImage} alt={`${user.nickname} profile image`} borderRadius="full" boxSize="150px" mx="auto" mb="4" />
            <VStack spacing="2" align="start">
                <Text fontSize="xl" fontWeight="bold">{user.nickname}</Text>
                <Text>{user.email}</Text>
                <Text>Role: {user.role}</Text>
                <Text>Gender: {user.gender}</Text>
                <Text>Phone: {user.phoneNumber}</Text>
                <Text>Frontend Level: {user.frontEndLevel}</Text>
                <Text>Backend Level: {user.backEndLevel}</Text>
            </VStack>
            <HStack spacing="4" mt="4" justify="center">
                <IconButton aria-label="Task" icon={<FiClipboard />} variant="outline" colorScheme="teal" />
                <IconButton aria-label="Task" icon={<IoMdTime />} variant="outline" colorScheme="teal" />
                <IconButton aria-label="Task" icon={<MdOutlineTimeline />} variant="outline" colorScheme="teal" />
                <IconButton aria-label="Chat" icon={<IoChatbubblesOutline />} variant="outline" colorScheme="teal" />
            </HStack>
            <HStack spacing="4" mt="4" justify="center">

                IconButtonForShowUserTaskCondition
                <Stack direction="row" align="center">
                    <IconButtonForShowUserTaskCondition />
                </Stack>

                <Stack direction="row" align="center">
                    <Text>Online</Text>
                    <Switch size="lg" colorScheme="teal" />
                </Stack>
            </HStack>
        </Box>
    );
};

export default UserCard;
