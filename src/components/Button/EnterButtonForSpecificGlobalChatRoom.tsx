// src/components/Button/EnterButtonForSpecificGlobalChatRoom.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';

interface Props {
    roomId: string;
}

const EnterButtonForSpecificGlobalChatRoom: React.FC<Props> = ({ roomId }) => {
    const router = useRouter();

    const handleEnterRoom = () => {
        window.open(`/global-chat-rooms/${roomId}`, '_blank'); // 새 탭에서 열기
    };

    return (
        <Button
            variant="outline"
            size="sm"
            borderColor="black"
            _hover={{ bg: "gray.200" }}
            onClick={handleEnterRoom}
            mr="2"
        >
            Enter
        </Button>
    );
};

export default EnterButtonForSpecificGlobalChatRoom;
