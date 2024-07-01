import React, { useState } from 'react';
import {
    Box,
    Text,
    VStack,
    HStack,
    IconButton,
    Tooltip,
    Flex,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Input,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { IUser } from '@/types/typeForUserBoard';
import IconButtonForShowUserTaskCondition from '../Button/IconButtonForShowUserTaskCondition';

interface UserCardProps {
    user: IUser;
}

const TaskStatusAndProgressBar: React.FC<UserCardProps> = ({ user }) => {
    const [task, setTask] = useState<string>(user.currentTask || '');
    const [progress, setProgress] = useState<number>(user.currentTaskProgressPercent);

    const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    const handleProgressChange = (newProgress: number) => {
        setProgress(Math.round(newProgress));
    };

    return (
        <Box border="1px solid gray" borderRadius="lg" overflow="hidden" p="4" shadow="md">
            <VStack spacing={2} align="stretch" width="100%">
                <Box display="flex" gap={5} alignItems="center">
                    <IconButtonForShowUserTaskCondition performanceLevel={user.performanceLevel} />
                    <Box flex={1} position="relative">
                        <Slider
                            aria-label="progress-slider"
                            value={progress}
                            onChange={handleProgressChange}
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
                    <Input
                        value={task}
                        onChange={handleTaskChange}
                        placeholder="Current task"
                        size="sm"
                    />
                </Box>
            </VStack>
        </Box>
    );
};

export default TaskStatusAndProgressBar;
