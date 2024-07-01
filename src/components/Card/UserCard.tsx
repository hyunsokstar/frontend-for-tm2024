import React, { useState, useEffect } from 'react';
import {
    Box,
    Text,
    VStack,
    HStack,
    IconButton,
    Tooltip,
    Flex,
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
import ProgressBarForCurrentTaskAndUserTaskCondition from '../ProgressBar/ProgressBarForCurrentTaskAndUserTaskCondition';

interface UserCardProps {
    user: IUser;
    pageNum: number;
}

const UserCard: React.FC<UserCardProps> = ({ user, pageNum }) => {
    const router = useRouter();

    const [localUser, setLocalUser] = useState(user);

    useEffect(() => {
        setLocalUser(user);
    }, [user]);

    // const handleOnlineStatusChange = (newIsOnline: boolean) => {
    //     setLocalUser(prevUser => ({ ...prevUser, isOnline: newIsOnline }));
    // };

    const statusIcon = (): JSX.Element => {
        switch (localUser.role) {
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
        window.open(`/UserProfile/${localUser.id}`, '_blank');
    };

    const handleChatClick = (): void => {
        window.open(`/users/UsersByCardList/${localUser.id}/chatting`, '_blank');
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" shadow="md">
            <ProfileImageForUserCard user={localUser} />
            <VStack spacing="2" align="start">
                <Text>{localUser.email}</Text>
                <Text>Phone: {localUser.phoneNumber}</Text>
                <Text>Frontend Level: {localUser.frontEndLevel}</Text>
                <Text>Backend Level: {localUser.backEndLevel}</Text>
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
                    <ModalButtonForTaskHistoryForUser user={localUser} />
                </Tooltip>
                <Tooltip label="Task Statics" placement="top" hasArrow>
                    <ModalButtonForUserTaskStatistics user={localUser} />
                </Tooltip>
                <Tooltip label="Chatting" placement="top" hasArrow>
                    <IconButton aria-label="Chat" icon={<IoChatbubblesOutline />} variant="outline" colorScheme="teal" onClick={handleChatClick} />
                </Tooltip>
                <Tooltip label="Online Status" placement="top" hasArrow>
                    <SwitchButtonForOnlineStatus
                        isOnline={localUser.isOnline ? localUser.isOnline : false}
                        userId={localUser.id}
                        pageNum={pageNum}
                    // onChange={handleOnlineStatusChange}
                    />
                </Tooltip>
            </HStack>
            <Flex w="100%" mt="4" justify="space-between" align="center">
                <Box flexBasis="100%" maxW="100%">
                    <ProgressBarForCurrentTaskAndUserTaskCondition user={localUser} pageNum={pageNum} />
                </Box>
            </Flex>
        </Box>
    );
};

export default UserCard;