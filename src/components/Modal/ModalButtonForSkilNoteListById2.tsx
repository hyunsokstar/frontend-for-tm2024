import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import DataGridForSelectSkilNoteForTodo from '../DataGrid/DataGridForSelectSkilNoteForTodo';

type Props = {
    selectedUserId: any,
    TechNoteId: any;
    skilNoteLength: number
    toDoId: string;
    onCloseForTechNoteModal: () => void
    pageInfo?: string
    isMainOrSub: "main" | "sub"
};

const ModalButtonForSelectSkilNoteForTodo = ({
    selectedUserId,
    TechNoteId,
    skilNoteLength,
    toDoId,
    onCloseForTechNoteModal,
    pageInfo,
    isMainOrSub
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return (
        <>
            <Button
                onClick={onOpen}
                size={"sm"}
                variant={"outline"}
            >
                skilnotes (선택용?) ({skilNoteLength})
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>ModalButtonForSelectSkilNoteForTodo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <DataGridForSelectSkilNoteForTodo
                            selectedUserId={selectedUserId}
                            techNoteId={TechNoteId}
                            isOpen={isOpen}
                            toDoId={toDoId}
                            onCloseForTechNoteModal={onCloseForTechNoteModal}
                            onCloseForSkilNoteModal={onClose}
                            pageInfo={pageInfo}
                            isMainOrSub={isMainOrSub}
                        />
                    </ModalBody>

                    {/* You can add a footer with additional actions if needed */}
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        {/* Add more buttons or actions as needed */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForSelectSkilNoteForTodo;
