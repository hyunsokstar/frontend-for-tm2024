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
import DataGridForSkilNoteListForTechNoteId2 from '../DataGrid/DataGridForSkilNoteListForTechNoteId2';

type Props = {
    TechNoteId: any;
    skilNoteLength: number
};

const ModalBuuttonForSkilNoteListById = ({ TechNoteId, skilNoteLength }: Props) => {
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
                skilnotes ({skilNoteLength})
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal For SkilNote List By TechNoteId 1</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <DataGridForSkilNoteListForTechNoteId2 techNoteId={TechNoteId} isOpen={isOpen} />
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

export default ModalBuuttonForSkilNoteListById;
