import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Box } from '@chakra-ui/react';
import useApiForGetAllParticipantsListForSubchallenges from '@/hooks/useApiForGetAllParticipantsListForSubchallenges';
import DataGridForChallengersForSubChallenges from '../DataGrid/DataGridForChallengersForSubChallenges';

interface Props {
    subChallengeId: number;
    subChallengeName: string;
}

const ModalButtonForAllParticipantsForSubChallenges: React.FC<Props> = ({ subChallengeId, subChallengeName }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const { isLoading, error, data: dataForChallengers } = useApiForGetAllParticipantsListForSubchallenges(subChallengeId);
    console.log("data for participants: ???", dataForChallengers);

    const handleConfirm = () => {
        // 여기에 모달 버튼이 클릭되었을 때의 동작을 추가하세요
        console.log('Modal button clicked for subChallengeId:', subChallengeId);
        setIsOpen(false);
    };

    if (!dataForChallengers) {
        return <Box> Loading ..</Box>
    }

    return (
        <>
            <Button onClick={handleOpen} variant={"outline"} size={"xs"} >participants({dataForChallengers.data.participantsForSubChallenge.length})</Button>
            <Modal isOpen={isOpen} onClose={handleClose} size={"6xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{subChallengeName} 's participants</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <DataGridForChallengersForSubChallenges subChallengeId={subChallengeId} participantsForSubChallenge={dataForChallengers.data.participantsForSubChallenge} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleConfirm}>
                            Confirm
                        </Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForAllParticipantsForSubChallenges;
