import React from 'react';
import { Box, Switch, Text, useToast } from '@chakra-ui/react';
import { UpdateUserInfoAboutCurrentStatusDto } from '@/types/typeForUserBoard';
import useApiForUpdateUserInfoAboutCurrentStatus from '@/hooks/useApiForUpdateUserInfoAboutCurrentStatus';

type Props = {
    userId: number;
    isOnline: boolean;
    pageNum: number;
};

const SwitchButtonForOnlineStatus: React.FC<Props> = ({ userId, isOnline, pageNum }) => {
    const toast = useToast();
    const updateUserInfoMutation = useApiForUpdateUserInfoAboutCurrentStatus(pageNum);

    const handleToggle = () => {
        const updateDto: UpdateUserInfoAboutCurrentStatusDto = {
            targetField: 'isOnline',
            isOnline: !isOnline
        };

        updateUserInfoMutation.mutate(
            { userId, updateDto },
            {
                onSuccess: () => {
                    toast({
                        title: `Status updated to ${!isOnline ? 'Online' : 'Offline'}`,
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                    });
                },
                onError: (error) => {
                    toast({
                        title: 'Failed to update status',
                        description: error.message,
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                    });
                }
            }
        );
    };

    return (
        <Box display="flex" alignItems="center">
            <Switch
                isChecked={isOnline}
                onChange={handleToggle}
                colorScheme="teal"
                size="lg"
            />
            <Text ml={3}>{isOnline ? 'Online' : 'Offline'}</Text>
        </Box>
    );
};

export default SwitchButtonForOnlineStatus;