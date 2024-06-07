import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import DataGridForTechNoteList3 from '../DataGrid/DataGridForTechNoteList3';

type Props = {
    toDoId: string
    pageInfo?: string
    buttonText: string;
    isMainOrSub: "main" | "sub";
};

// 노트 선택 모달
const ModalButtonForSelectNoteForTodo = ({ toDoId, pageInfo, buttonText, isMainOrSub }: Props) => {
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
                    <ModalHeader>참조 노트 선택</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <DataGridForTechNoteList3 toDoId={toDoId} onCloseForTechNoteModal={onclose} pageInfo={pageInfo} isMainOrSub={isMainOrSub} />
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
