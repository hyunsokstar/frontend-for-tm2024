import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import TechNoteListForSelectNoteForTask from '../DataGrid/TechNoteListForSelectNoteForTask';

type Props = {
    toDoId: string
    pageInfo?: string
    buttonText: string;
    isMainOrSub: "main" | "sub";
    selectedUserId?: any;
};

// 노트 선택 모달
const ModalButtonForSelectNoteForTodo = ({ selectedUserId, toDoId, pageInfo, buttonText, isMainOrSub }: Props) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return (
        <>
            <Button size="xs" colorScheme="teal" leftIcon={<InfoIcon />} onClick={onOpen}>
                {buttonText}
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="full">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>노트 선택 for todo (테크 노트 먼저 만들고 그 하위에 스킬 노트 만들고 선택 해도 됨)</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* fix 22 */}
                        <TechNoteListForSelectNoteForTask
                            selectedUserId={selectedUserId}
                            toDoId={toDoId} onCloseForTechNoteModal={onclose} pageInfo={pageInfo} isMainOrSub={isMainOrSub}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose} >
                            닫기
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForSelectNoteForTodo;
