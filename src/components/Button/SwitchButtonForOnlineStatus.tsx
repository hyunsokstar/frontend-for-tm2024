import React from 'react';
import { Box, Switch, Text } from '@chakra-ui/react';

type Props = {
    isOnline: boolean;
    onChange: (isOnline: boolean) => void;
};

const SwitchButtonForOnlineStatus: React.FC<Props> = ({ isOnline, onChange }) => {
    const handleToggle = () => {
        onChange(!isOnline);
    };

    return (
        <Box display="flex" alignItems="center">
            <Switch isChecked={isOnline} onChange={handleToggle} colorScheme="teal" size="lg" />
            <Text ml={3}>{isOnline ? 'Online' : 'Offline'}</Text>
        </Box>
    );
};

export default SwitchButtonForOnlineStatus;
