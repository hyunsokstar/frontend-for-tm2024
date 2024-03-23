import React, { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Box } from '@chakra-ui/react';
import DataGridForMySkilNoteListForSelectNoteForChallenge from '../DataGrid/DataGridForMySkilNoteListForSelectNoteForChallenge';

type IProps = {
    subChallengeName: string;
}

const ModalButtonForSelectNoteForChallengeReport: React.FC<IProps>
    = ({ subChallengeName }) => {
        const [isOpen, setIsOpen] = useState(false);

        const handleOpenModal = () => {
            setIsOpen(true);
        };

        const handleCloseModal = () => {
            setIsOpen(false);
        };

        return (
            <Box>
                <Button onClick={handleOpenModal} variant={"outline"} size={"xs"}>note</Button>
                <Modal isOpen={isOpen} onClose={handleCloseModal} size={"6xl"}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>select note for {subChallengeName}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <DataGridForMySkilNoteListForSelectNoteForChallenge />
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
