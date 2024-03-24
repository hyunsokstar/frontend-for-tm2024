import React, { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Box, IconButton } from '@chakra-ui/react';
import DataGridForMySkilNoteListForSelectNoteForChallenge from '../DataGrid/DataGridForMySkilNoteListForSelectNoteForChallenge';
import { FaStickyNote } from 'react-icons/fa'; // 노트 아이콘을 사용하기 위한 React 아이콘 라이브러리

type IProps = {
    subChallengeId: number;
    participantId: number;
    subChallengeName: string;
}

const ModalButtonForSelectNoteForChallengeReport: React.FC<IProps>
    = ({ subChallengeId, participantId, subChallengeName }) => {
        const [isOpen, setIsOpen] = useState(false);

        const handleOpenModal = () => {
            setIsOpen(true);
        };

        const handleCloseModal = () => {
            setIsOpen(false);
        };

        return (
            <Box>
                <IconButton
                    aria-label="Open note"
                    icon={<FaStickyNote />} // 노트 아이콘
                    variant="outline"
                    size="xs"
                    onClick={handleOpenModal} // 클릭 이벤트 핸들러
                    _hover={{ backgroundColor: "green.100" }}
                />
                <Modal isOpen={isOpen} onClose={handleCloseModal} size={"6xl"}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>select note for {subChallengeName}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            participantId: {participantId}
                            <DataGridForMySkilNoteListForSelectNoteForChallenge setIsOpen={setIsOpen} participantId={participantId} subChallengeId={subChallengeId} />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
                                닫기
                            </Button>
                            {/* 다른 작업을 수행하는 버튼 등을 추가할 수 있습니다 */}
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        );
    }

export default ModalButtonForSelectNoteForChallengeReport;
