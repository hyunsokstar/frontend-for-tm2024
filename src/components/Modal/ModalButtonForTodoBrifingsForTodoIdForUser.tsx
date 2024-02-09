import { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Box } from '@chakra-ui/react';
import { IBriefing } from '@/types/typeforTodos';
import ChatBoardForBriefingBoardForUser from '../ChatBoard/ChatBoardForBriefingBoardForUser';

interface IProps {
    todoWriterEmail: string;
    todoId: string;
    briefings: IBriefing[];
    pageNum: string;
}

const ModalButtonForTodoBrifingsForTodoIdForUser = ({ pageNum, todoWriterEmail, todoId, briefings }: IProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return (
        <Box>
            <Button onClick={onOpen} size={"xs"} >briefings ({briefings ? briefings.length : ""}) </Button>
            <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Todo 브리핑을 위한 모달</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ChatBoardForBriefingBoardForUser
                            pageNum={pageNum}
                            todoId={todoId}
                            todoWriterEmail={todoWriterEmail}
                            briefings={briefings}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            닫기
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};
export default ModalButtonForTodoBrifingsForTodoIdForUser;