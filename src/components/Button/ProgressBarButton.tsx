import React from 'react';
import { Box, Button, ButtonProps } from '@chakra-ui/react';

interface ProgressBarButtonProps extends ButtonProps {
    percentage: number;
    buttonText: string;
}

const ProgressBarButton: React.FC<ProgressBarButtonProps> = ({ percentage, buttonText, ...rest }) => {
    return (
        <Box display={"flex"} alignItems={"center"}>
            <Button
                {...rest}
                position="relative"
                width="180px"
                height="30px"
                padding="0"
                overflow="hidden"
                _focus={{ boxShadow: 'none' }}
                _hover={{ opacity: '0.8' }}
                size={"sm"}
                variant={"outline"}
            >
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    bottom="0"
                    bg="blue.400"
                    opacity={0.5}
                    width={`${percentage}%`}
                />
                {buttonText}
            </Button>
        </Box>
    );
};

export default ProgressBarButton;
