import { ITypeForParticipantsRow } from '@/types/typeForRoadMap';
import React, { useState } from 'react';
import { Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Center, Box } from '@chakra-ui/react';
import DataGridForParticipantsForTechNote from '../DataGrid/DataGridForParticipantsForTechNote';

type Props = {
    participants: ITypeForParticipantsRow[];
    button_text: string;
    techNoteTitle: string;
    techNoteId: number;
};

const ModalButtonForParticipantsListForTechNote: React.FC<Props> = ({
    participants,
    button_text,
    techNoteTitle,
    techNoteId
}) => {
    const [isOpen, setIsOpen] = useState(false);

    console.log("participants : ", participants);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Button onClick={handleOpenModal} size="sm" variant={"outlined"} border={"1px solid green"}>
                {button_text} ({participants.length})
            </Button>
            <Modal isOpen={isOpen} onClose={handleCloseModal} size="6xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Participants For Tech Note</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center mb={2}>
                            <Text fontSize="xl" fontFamily="heading">
                                TechNote: {techNoteTitle}
                            </Text>
                        </Center>

                        <Box display={"flex"} justifyContent={"flex-end"} p={1}>
                            <Button>Register</Button>
                        </Box>

                        <DataGridForParticipantsForTechNote
                            participants={participants}
                            techNoteId={techNoteId}
                        />
                    </ModalBody>
                    <ModalFooter>
                        {/* 모달 하단에 필요한 내용이 있다면 여기에 추가할 수 있습니다. */}
                        <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForParticipantsListForTechNote;
