import React, { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import useApiForGetParticipantsColliculmnsForSkilNote from '@/hooks/useApiForGetParticipantsColliculmnsForSkilNote';
import BasicDataGrid from '@/pages/Test/ReactDataGrid/Basic/BasicDataGrid';
import DataGridForCorriculumnsForSkilNotesForTechNoteId from '../DataGrid/DataGridForCorriculumnsForSkilNotesForTechNoteId';

interface IProps {
    techNoteId: number;
    userId: number;
}


const ModalButtonForParticipantCorriculamnsForSkilNote: React.FC<IProps> = ({ techNoteId, userId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);

    const { isLoading, error, data } = useApiForGetParticipantsColliculmnsForSkilNote({ techNoteId, userId })

    console.log("data : ", data);

    return (
        <>
            <Button onClick={onOpen} variant={"outline"} size={"sm"}>CurriCulumns ({data?.participants.length})</Button>

            <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* <BasicDataGrid /> */}
                        {data?.participants ?
                            <DataGridForCorriculumnsForSkilNotesForTechNoteId curriculmns={data?.participants} />
                            : "no data"}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}


export default ModalButtonForParticipantCorriculamnsForSkilNote;
