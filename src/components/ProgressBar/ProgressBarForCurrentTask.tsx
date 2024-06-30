import React, { useState, ChangeEvent } from 'react';
import { Box, Text, VStack, HStack, IconButton, Stack, Tooltip, Input, Slider, SliderTrack, SliderFilledTrack, SliderThumb, useBoolean } from '@chakra-ui/react';
import { FiUser, FiClipboard } from 'react-icons/fi';
import { FaRunning, FaMeh, FaSmile, FaUmbrellaBeach } from 'react-icons/fa';
import { IoChatbubblesOutline } from "react-icons/io5";
import { useRouter } from 'next/router';
import { IUser } from '@/types/typeForUserBoard';
import IconButtonForShowUserTaskCondition from '../Button/IconButtonForShowUserTaskCondition';
import SwitchButtonForOnlineStatus from '../Button/SwitchButtonForOnlineStatus';
import ModalButtonForTaskHistoryForUser from '../Modal/ModalButtonForTaskHistoryForUser';
import ModalButtonForUserTaskStatistics from '../Modal/ModalButtonForUserTaskStatics';
import ProfileImageForUserCard from '../ProfileImage/ProfileImageForUserCard';

interface ProgressBarForCurrentTaskProps {
    initialTask: string;
    initialProgress: number;
}

const ProgressBarForCurrentTask: React.FC<ProgressBarForCurrentTaskProps> = ({ initialTask, initialProgress }) => {
    const [task, setTask] = useState<string>(initialTask);
    const [progress, setProgress] = useState<number>(initialProgress);
    const [isHovered, setIsHovered] = useBoolean(false);

    const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    const handleProgressChange = (newProgress: number) => {
        setProgress(newProgress);
    };

    return (
        <VStack spacing={2} align="stretch" width="100%">
            <Tooltip label={`${progress}%`} placement="top" isOpen={isHovered}>
                <Box onMouseEnter={setIsHovered.on} onMouseLeave={setIsHovered.off}>
                    <Slider
                        aria-label="progress-slider"
                        value={progress}
                        onChange={handleProgressChange}
                        min={0}
                        max={100}
                    >
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </Box>
            </Tooltip>
            <Input
                value={task}
                onChange={handleTaskChange}
                placeholder="Current task"
            />
        </VStack>
    );
};

interface UserCardProps {
    user: IUser;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const router = useRouter();

    const statusIcon = (): JSX.Element => {
        switch (user.role) {
            case 'ninja': return <FaRunning />;
            case 'stressed': return <FaMeh />;
            case 'away': return <FaSmile />;
            case 'vacation': return <FaUmbrellaBeach />;
            default: return <FiUser />;
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
            <ProgressBarForCurrentTask
                initialTask="idea 제안 게시판 만드는중"
                initialProgress={50}
            />
            {/* Other UserCard content */}
        </Box>
    );
};

export default UserCard;