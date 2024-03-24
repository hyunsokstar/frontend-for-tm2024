import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useToast } from '@chakra-ui/react';
import { IBriefingForSubChallengeRow } from '@/types/typeforChallenges';
import React, { useState, useEffect } from 'react';
import ChatBoardForBriefingsForSubChallenge from '../ChatBoard/ChatBoardForBriefingsForSubChallenge';
import useUser from '@/hooks/useUser';

type Props = {
    pageNum: number;
    subChallengeId: number;
    writerIdForSubChallenge: number;
    briefingsForSubChallenge: IBriefingForSubChallengeRow[];
}

const ModalButtonForBriefingListForSubChallenge: React.FC<Props> = ({ pageNum, writerIdForSubChallenge, subChallengeId, briefingsForSubChallenge }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState<any>();
    const { isLoggedIn, loginUser, logout } = useUser();

    const toast = useToast();

    useEffect(() => {
        if (!isLoggedIn) {
            handleCloseModal();
            toast({
                title: "로그인이 필요합니다",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
        }

        if (writerIdForSubChallenge === loginUser.id) {
            setPosition("manager")
        } else {
            setPosition("commenter")
        }

    }, [isLoggedIn]);

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
                    <ModalHeader>Brifings For Sub Challenge </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* briefingsForSubChallenge를 사용하여 모달 내용을 렌더링할 수 있습니다 */}
                        position: {position}
                        <ChatBoardForBriefingsForSubChallenge
                            pageNum={pageNum}
                            position={position}
                            subChallengeId={subChallengeId}
                            briefingsForSubChallenge={briefingsForSubChallenge}
                        />
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
