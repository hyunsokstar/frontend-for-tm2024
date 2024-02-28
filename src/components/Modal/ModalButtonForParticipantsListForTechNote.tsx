import { ITypeForParticipantsRow } from '@/types/typeForRoadMap';
import React, { useEffect, useState } from 'react';
import { Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Center, Box } from '@chakra-ui/react';
import DataGridForParticipantsForTechNote from '../DataGrid/DataGridForParticipantsForTechNote';
import useUser from '@/hooks/useUser';
import useApiForRegisterParticipantsForTechNote from '@/hooks/useApiForRegisterParticipantsForTechNote';

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
    const { isLoggedIn, loginUser, logout } = useUser();

    const [participantList, setParticipantList] = useState<ITypeForParticipantsRow[]>([]);

    const userId = loginUser.id;
    const mutationForRegisterParticipantsForTechNote = useApiForRegisterParticipantsForTechNote(); // 커스텀 훅 호출

    console.log("participants : ", participants);

    const registerButtonClick = () => {
        mutationForRegisterParticipantsForTechNote.mutate({ userId, techNoteId })
    };

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {

        console.log("participants : ", participants);


        setParticipantList(participants)

    }, [participants])


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
                            <Button size="md" variant="outline" onClick={registerButtonClick}>
                                Register
                            </Button>
                        </Box>

                        <DataGridForParticipantsForTechNote
                            participants={participantList}
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
