import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { IBriefingForSubChallengeRow } from '@/types/typeforChallenges';
import React, { useState } from 'react';
import ChatBoardForBriefingsForSubChallenge from '../ChatBoard/ChatBoardForBriefingsForSubChallenge';

type Props = {
    briefingsForSubChallenge: IBriefingForSubChallengeRow[];
}

const ModalButtonForBriefingListForSubChallenge: React.FC<Props> = ({ briefingsForSubChallenge }) => {
    const [isOpen, setIsOpen] = useState(false);

    console.log("briefingsForSubChallenge : ", briefingsForSubChallenge);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Button variant="outline" size="xs" onClick={handleOpenModal}>
                briefings ({briefingsForSubChallenge.length})
            </Button>

            <Modal isOpen={isOpen} onClose={handleCloseModal} size={"6xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* briefingsForSubChallenge를 사용하여 모달 내용을 렌더링할 수 있습니다 */}
                        <ChatBoardForBriefingsForSubChallenge briefingsForSubChallenge={briefingsForSubChallenge} />
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="outline" onClick={handleCloseModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalButtonForBriefingListForSubChallenge;
