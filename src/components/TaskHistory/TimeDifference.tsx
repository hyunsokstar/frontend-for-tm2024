import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const getPipesCount = (minutes: number): number => {
    return Math.ceil(minutes / 10);
};

const formatTimeDifference = (minutes: number): string => {
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    const remainingMinutes = minutes % 60;
    return `${days}일 ${hours}시간 ${remainingMinutes}분`;
};

interface TimeDifferenceProps {
    timeDifference: number;
}

const TimeDifference: React.FC<TimeDifferenceProps> = ({ timeDifference }) => {
    const pipesCount = getPipesCount(timeDifference);
    const formattedTime = formatTimeDifference(timeDifference);

    if (pipesCount <= 7) {
        const topPipes = Math.floor(pipesCount / 2);
        const bottomPipes = pipesCount - topPipes - 1; // -1 for the time text

        return (
            <Flex direction="column" alignItems="center" my={2}>
                {Array.from({ length: topPipes }).map((_, i) => (
                    <Text key={`top-${i}`} lineHeight="1">|</Text>
                ))}
                <Text mt={1} mb={1}>{formattedTime}</Text>
                {Array.from({ length: bottomPipes }).map((_, i) => (
                    <Text key={`bottom-${i}`} lineHeight="1">|</Text>
                ))}
            </Flex>
        );
    } else {
        return (
            <Flex direction="column" alignItems="center" my={2}>
                {Array.from({ length: 3 }).map((_, i) => (
                    <Text key={`top-${i}`} lineHeight="1">||</Text>
                ))}
                <Text mt={1} mb={1}>{formattedTime}</Text>
                {Array.from({ length: 3 }).map((_, i) => (
                    <Text key={`bottom-${i}`} lineHeight="1">||</Text>
                ))}
            </Flex>
        );
    }
};

export default TimeDifference;