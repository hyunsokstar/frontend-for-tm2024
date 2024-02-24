import { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Box } from '@chakra-ui/react';
import useApiForGetAllTodoBriefingsForTodoId from '@/hooks/useApiForGetAllTodoBriefingsForTodoId';
import { IBriefing } from '@/types/typeforTodos';
import ChatBoardForBriefingBoard from '../ChatBoard/ChatBoardForBriefingBoard';

interface IProps {
    todoWriterEmail: string;
    todoId: string;
    briefings: IBriefing[];
    pageNum?: string;
    pageInfo?: string;
    isMainOrSub: "main" | "sub"
}

const ModalButtonForTodoBrifingsForTodoId = ({ pageNum, todoWriterEmail, todoId, briefings, pageInfo, isMainOrSub }: IProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return (
        <Box>
            <Button onClick={onOpen} size={"xs"} >briefings ({briefings ? briefings.length : ""}) </Button>
            <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Todo 브리핑을 위한 모달1</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* 여기에 채팅창 또는 내용을 넣어주세요 */}
                        {/* 채팅창 */}
                        <ChatBoardForBriefingBoard
                            todoId={todoId}
                            todoWriterEmail={todoWriterEmail}
                            briefings={briefings}
                            pageInfo={pageInfo}
                            isMainOrSub={isMainOrSub}
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
export default ModalButtonForTodoBrifingsForTodoId;