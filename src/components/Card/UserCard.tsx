import React from 'react';
import { Box, Image, Text, VStack, HStack, IconButton, Stack, Tooltip } from '@chakra-ui/react';
import { FiUser, FiClipboard } from 'react-icons/fi';
import { FaRunning, FaMeh, FaSmile, FaUmbrellaBeach } from 'react-icons/fa';
import { IoMdTime } from "react-icons/io";
import { MdOutlineTimeline } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { useRouter } from 'next/router';
import { IUser } from '@/types/typeForUserBoard';
import IconButtonForShowUserTaskCondition from '../Button/IconButtonForShowUserTaskCondition';
import SwitchButtonForOnlineStatus from '../Button/SwitchButtonForOnlineStatus';
import ModalButtonForTaskHistoryForUser from '../Modal/ModalButtonForTaskHistoryForUser';
import ModalButtonForUserTaskStatistics from '../Modal/ModalButtonForUserTaskStatics';

interface Todo {
    id: number;
    task: string;
    status: string;
    startTime: string | null;
    completedAt: string | null;
    deadline: string | null;
    elapsedTime: string | null;
    manager: {
        id: number;
        email: string;
        profileImage?: string;
    };
}


type UserCardProps = {
    user: IUser;
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const router = useRouter();

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

    const handleClipboardClick = () => {
        window.open(`/UserProfile/${user.id}`, '_blank');
    };

    const handleChatClick = () => {
        window.open(`/users/UsersByCardList/${user.id}/chatting`, '_blank');
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
                <Tooltip label="Task List" placement="top" hasArrow>
                    <IconButton
                        aria-label="Task"
                        icon={<FiClipboard />}
                        variant="outline"
                        colorScheme="teal"
                        onClick={handleClipboardClick}
                    />
                </Tooltip>
                <Tooltip label="Task History" placement="top" hasArrow>
                    <ModalButtonForTaskHistoryForUser user={user} />
                </Tooltip>
                <Tooltip label="Task Statics" placement="top" hasArrow>
                    <ModalButtonForUserTaskStatistics user={user} />
                </Tooltip>
                <Tooltip label="Chatting" placement="top" hasArrow>
                    <IconButton aria-label="Chat" icon={<IoChatbubblesOutline />} variant="outline" colorScheme="teal" onClick={handleChatClick} />
                </Tooltip>
            </HStack>
            <HStack spacing="4" mt="4" justify="center">
                <Stack direction="row" align="center">
                    <IconButtonForShowUserTaskCondition />
                </Stack>
                <Stack direction="row" align="center">
                    <SwitchButtonForOnlineStatus />
                </Stack>
            </HStack>
        </Box>
    );
};

export default UserCard;
