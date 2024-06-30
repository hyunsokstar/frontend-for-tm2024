import React, { ChangeEvent, useState } from 'react';
import { Box, Text, VStack, HStack, IconButton, Tooltip, Flex, useBoolean, SliderTrack, Slider, SliderFilledTrack, SliderThumb, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { IUser } from '@/types/typeForUserBoard';
import IconButtonForShowUserTaskCondition from '../Button/IconButtonForShowUserTaskCondition';

interface UserCardProps {
    user: IUser;
}

interface ProgressBarForCurrentTaskProps {
    initialTask: string;
    initialProgress: number;
}

const ProgressBarForCurrentTask: React.FC<ProgressBarForCurrentTaskProps> = ({ initialTask, initialProgress }) => {
    const [task, setTask] = useState<string>(initialTask);
    const [progress, setProgress] = useState<number>(initialProgress);

    const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    const handleProgressChange = (newProgress: number) => {
        setProgress(Math.round(newProgress));
    };

    return (
        <VStack spacing={2} align="stretch" width="100%">
            <Box display="flex" gap={2} alignItems="center">
                <IconButtonForShowUserTaskCondition />
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
    );
};

const TaskStatusAndProgressBar: React.FC<UserCardProps> = ({ user }) => {
    const router = useRouter();

    return (
        <Box border="1px solid gray" borderRadius="lg" overflow="hidden" p="4" shadow="md">
            <ProgressBarForCurrentTask
                initialTask="idea 제안 게시판 만드는중"
                initialProgress={50}
            />
        </Box>
    );
};

export default TaskStatusAndProgressBar;