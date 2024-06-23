import React from 'react';
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import ChattingForDevBattle from '../ChatBoard/ChattingForDevBattle';
import { IChatRoom } from '@/types/typeForDevBattle';


interface Props {
    chatRoom: IChatRoom | null;
    loginUser: any; // loginUser의 타입을 적절히 정의해주세요.
}

const ModalButtonForDevTeamChatting: React.FC<Props> = ({ chatRoom, loginUser }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    console.log("chatRoom :", chatRoom);
    console.log("loginUser :", loginUser);


    return (
        <>
            <Button onClick={onOpen} border={"1px solid black"} size="xs" variant={"outline"} ml={1}>Chat</Button>

            <Modal isOpen={isOpen} onClose={onClose} size="6xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Dev Team Chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {chatRoom ? (
                            <ChattingForDevBattle chatRoom={chatRoom} loginUser={loginUser} isModal={true} />
                        ) : (
                            <Box>No Chat Room Available</Box>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForDevTeamChatting;
