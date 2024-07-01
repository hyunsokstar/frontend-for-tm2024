import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Text,
    VStack,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Input,
    Button,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { IUser } from '@/types/typeForUserBoard';
import IconButtonForShowUserTaskCondition from '../Button/IconButtonForShowUserTaskCondition';
import useApiForUpdateUserInfoAboutCurrentStatus from '@/hooks/useApiForUpdateUserInfoAboutCurrentStatus';

interface UserCardProps {
    user: IUser;
    pageNum: number;
}

const ProgressBarForCurrentTaskAndUserTaskCondition: React.FC<UserCardProps> = ({ user, pageNum }) => {
    const [task, setTask] = useState<string>(user.currentTask || '');
    const [progress, setProgress] = useState<number>(user.currentTaskProgressPercent || 0);
    const updateUserInfoMutation = useApiForUpdateUserInfoAboutCurrentStatus(pageNum);

    useEffect(() => {
        setTask(user.currentTask || '');
        setProgress(user.currentTaskProgressPercent || 0);
    }, [user]);

    const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    const updateTask = useCallback(() => {
        updateUserInfoMutation.mutate({
            userId: user.id,
            updateDto: {
                targetField: 'currentTask',
                currentTask: task
            }
        });
    }, [updateUserInfoMutation, user.id, task]);

    const handleTaskKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            updateTask();
        }
    };

    const handleProgressChange = (newProgress: number) => {
        const roundedProgress = Math.round(newProgress);
        setProgress(roundedProgress);
    };

    const handleProgressChangeEnd = (newProgress: number) => {
        const roundedProgress = Math.round(newProgress);
        updateUserInfoMutation.mutate({
            userId: user.id,
            updateDto: {
                targetField: 'currentTaskProgressPercent',
                currentTaskProgressPercent: roundedProgress
            }
        });
    };

    return (
        <Box border="1px solid gray" borderRadius="lg" overflow="hidden" p="4" shadow="md">
            <VStack spacing={2} align="stretch" width="100%">
                <Box display="flex" gap={5} alignItems="center">
                    <IconButtonForShowUserTaskCondition
                        performanceLevel={user.performanceLevel}
                        pageNum={pageNum}
                        userId={user.id}
                    />
                    <Box flex={1} position="relative">
                        <Slider
                            aria-label="progress-slider"
                            value={progress}
                            onChange={handleProgressChange}
                            onChangeEnd={handleProgressChangeEnd}
                            min={0}
                            max={100}
                            size="lg"
                        >
                            <SliderTrack bg="gray.200" height="10px" borderRadius="full">
                                <SliderFilledTrack bg="teal.500" />
                            </SliderTrack>
                            <SliderThumb boxSize={8} bg="white" borderColor="teal.500" borderWidth={2}>
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    width="100%"
                                    height="100%"
                                    borderRadius="full"
                                >
                                    <Text
                                        fontSize="xs"
                                        fontWeight="bold"
                                        color="teal.500"
                                        fontFamily="sans-serif"
                                        lineHeight="1"
                                    >
                                        {progress}%
                                    </Text>
                                </Box>
                            </SliderThumb>
                        </Slider>
                    </Box>
                </Box>
                <Box>
                    <InputGroup size="sm">
                        <Input
                            value={task}
                            onChange={handleTaskChange}
                            onKeyDown={handleTaskKeyPress}
                            placeholder="Current task"
                            pr="4.5rem"
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={updateTask}>
                                Update
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Box>
            </VStack>
        </Box>
    );
};

export default ProgressBarForCurrentTaskAndUserTaskCondition;