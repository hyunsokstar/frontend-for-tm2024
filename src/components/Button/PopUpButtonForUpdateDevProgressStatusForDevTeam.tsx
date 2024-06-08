import React from 'react';
import { Button, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, Box, useColorModeValue } from '@chakra-ui/react';
import { DevStatus } from '@/types/typeForDevBattle';
import useApiForUpdateDevProgressStatusForDevBattle from '@/hooks/useApiForUpdateDevProgressStatusForDevBattle';

type Props = {
    devProgressId: number;
    status: DevStatus;
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'ready':
            return 'yellow';
        case 'in_progress':
            return 'green';
        case 'test':
            return 'orange';
        case 'complete':
            return 'red';
        default:
            return 'yellow';
    }
};

const PopUpButtonForUpdateDevProgressStatusForDevTeam = ({ devProgressId, status }: Props) => {
    const bgColor = useColorModeValue(`${getStatusColor(status)}.400`, `${getStatusColor(status)}.700`);
    const borderColor = useColorModeValue(`${getStatusColor(status)}.500`, `${getStatusColor(status)}.600`);
    const hoverBgColor = useColorModeValue(`${getStatusColor(status)}.500`, `${getStatusColor(status)}.600`);

    // 커스텀 훅 사용
    const { mutate: updateDevProgressStatus } = useApiForUpdateDevProgressStatusForDevBattle();

    // 상태 업데이트 핸들러
    const handleStatusUpdate = async (newStatus: string) => {
        try {
            await updateDevProgressStatus({ devProgressId, status: newStatus });
        } catch (error) {
            console.error("Error updating dev progress: ", error);
            // 에러 처리는 훅 내부에서 처리하므로 따로 필요 없음
        }
    };

    return (
        <Popover placement='top-start'>
            <PopoverTrigger>
                <Button
                    size="xs"
                    bg={bgColor}
                    borderColor={borderColor}
                    _hover={{ bg: hoverBgColor }}
                    aria-label={`Status ${status}`}
                    width={"100px"}
                >
                    {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader fontWeight='semibold'>Update Status</PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                    <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1}>
                        {/* 각 상태별 버튼에 업데이트 핸들러 추가 */}
                        <Button size="sm" variant="outline" colorScheme="yellow" onClick={() => handleStatusUpdate('ready')}>Ready</Button>
                        <Button size="sm" variant="outline" colorScheme="green" onClick={() => handleStatusUpdate('in_progress')}>In Progress</Button>
                        <Button size="sm" variant="outline" colorScheme="orange" onClick={() => handleStatusUpdate('test')}>Test</Button>
                        <Button size="sm" variant="outline" colorScheme="red" onClick={() => handleStatusUpdate('complete')}>Complete</Button>
                    </Box>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default PopUpButtonForUpdateDevProgressStatusForDevTeam;
