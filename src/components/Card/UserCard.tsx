import React, { useState } from 'react';
import {
    Box,
    Text,
    VStack,
    HStack,
    IconButton,
    Tooltip,
    Flex,
    Switch,
} from '@chakra-ui/react';
import { FiUser, FiClipboard } from 'react-icons/fi';
import { FaRunning, FaMeh, FaSmile, FaUmbrellaBeach } from 'react-icons/fa';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { IUser } from '@/types/typeForUserBoard';
import IconButtonForShowUserTaskCondition from '../Button/IconButtonForShowUserTaskCondition';
import SwitchButtonForOnlineStatus from '../Button/SwitchButtonForOnlineStatus';
import ModalButtonForTaskHistoryForUser from '../Modal/ModalButtonForTaskHistoryForUser';
import ModalButtonForUserTaskStatistics from '../Modal/ModalButtonForUserTaskStatics';
import ProfileImageForUserCard from '../ProfileImage/ProfileImageForUserCard';
import ProgressBarForCurrentTask from '../ProgressBar/ProgressBarForCurrentTask';

interface UserCardProps {
    user: IUser;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const router = useRouter();

    const [isOnline, setIsOnline] = useState(user.isOnline);

    const handleOnlineStatusChange = (newIsOnline: boolean) => {
        setIsOnline(newIsOnline);
    };

    const statusIcon = (): JSX.Element => {
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

    const handleClipboardClick = (): void => {
        window.open(`/UserProfile/${user.id}`, '_blank');
    };

    const handleChatClick = (): void => {
        window.open(`/users/UsersByCardList/${user.id}/chatting`, '_blank');
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" shadow="md">
            <ProfileImageForUserCard user={user} />
            <VStack spacing="2" align="start">
                <Text>{user.email}</Text>
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
                <Tooltip label="Online Status" placement="top" hasArrow>
                    <SwitchButtonForOnlineStatus isOnline={isOnline ? isOnline : false} onChange={handleOnlineStatusChange} />
                </Tooltip>
            </HStack>
            <Flex w="100%" mt="4" justify="space-between" align="center">
                <Box flexBasis="100%" maxW="100%">
                    <ProgressBarForCurrentTask user={user} />
                </Box>
            </Flex>
        </Box>
    );
};

export default UserCard;
