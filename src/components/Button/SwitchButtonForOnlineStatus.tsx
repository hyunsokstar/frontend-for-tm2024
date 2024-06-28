import React, { useState } from 'react'
import { ChakraProvider, Box, Switch, Text } from '@chakra-ui/react'

type Props = {}

const SwitchButtonForOnlineStatus: React.FC<Props> = () => {
    const [isOnline, setIsOnline] = useState(false);

    const handleToggle = () => {
        setIsOnline(prevState => !prevState);
    }

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
    )
}

const App: React.FC = () => {
    return (
        <ChakraProvider>
            <Box p={5}>
                <SwitchButtonForOnlineStatus />
            </Box>
        </ChakraProvider>
    )
}

export default App;
