import { ITypeForParticipantsRow } from '@/types/typeForRoadMap';
import React, { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import DataGridForParticipantsForRoadMap from '../DataGrid/DataGridForParticipantsForRoadMap';

type Props = {
    participants: ITypeForParticipantsRow[];
    button_text: string;
};

const ModalButtonForParticipantsListForRoadMap: React.FC<Props> = ({ participants, button_text }) => {
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
                    <ModalHeader>Participants For RoadMap</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* 
                        <ul>
                            {participants.map((participant, index) => (
                                <li key={index}>{participant.user.email}</li>
                            ))}
                        </ul> 
                        */}

                        <DataGridForParticipantsForRoadMap participants={participants} />

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

export default ModalButtonForParticipantsListForRoadMap;
