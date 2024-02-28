import { ITypeForParticipantsRow } from '@/types/typeForRoadMap';
import React, { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Box } from '@chakra-ui/react';
import DataGridForParticipantsForRoadMap from '../DataGrid/DataGridForParticipantsForRoadMap';
import DataGridForParticipantsForSkilNote from '../DataGrid/DataGridForParticipantsForSkilNote';
import useApiForRegisterParticipantsForSkilNote from '@/hooks/useApiForRegisterParticipantsForSkilNote';
import useUser from '@/hooks/useUser';

type Props = {
    participants: ITypeForParticipantsRow[];
    button_text: string;
    skilNoteId: number;
    techNoteId?: number;
};

const ModalButtonForParticipantsListForSkilNote: React.FC<Props>
    = ({ button_text, participants, skilNoteId, techNoteId }) => {
        const [isOpen, setIsOpen] = useState(false);
        const mutationForRegisterParticipantsForSkilNote = useApiForRegisterParticipantsForSkilNote(techNoteId); // 커스텀 훅 호출

        const { isLoggedIn, loginUser, logout } = useUser();
        const userId = loginUser.id;

        console.log("participants : ", participants);

        const handleOpenModal = () => {
            setIsOpen(true);
        };

        const handleCloseModal = () => {
            setIsOpen(false);
        };

        const registerButtonClick = () => {
            mutationForRegisterParticipantsForSkilNote.mutate({ userId, skilNoteId, techNoteId })
        };

        return (
            <>
                <Button onClick={handleOpenModal} size="sm" variant={"outlined"} border={"1px solid green"}>
                    {button_text} ({participants.length})
                </Button>
                <Modal isOpen={isOpen} onClose={handleCloseModal} size="6xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Participants For Skil Note</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box display={"flex"} justifyContent={"flex-end"} p={1}>
                                <Button size="md" variant="outline" onClick={registerButtonClick}>
                                    Register
                                </Button>
                            </Box>

                            <DataGridForParticipantsForSkilNote participants={participants} />

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

export default ModalButtonForParticipantsListForSkilNote;
