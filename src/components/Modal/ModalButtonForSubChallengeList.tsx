import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text,
    Box,
} from '@chakra-ui/react';
import DataGridForSubChallenges from '../DataGrid/DataGridForSubChallenges';
import { SubChallengeRow } from '@/types/typeforChallenges';

type Props = {
    buttonText: string;
    subChallenges: SubChallengeRow[];
};

const ModalButtonForSubChallengeList: React.FC<Props> = ({
    buttonText,
    subChallenges,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => setIsOpen(false);

    return (
        <>
            <Button size="xs" variant="outline" onClick={() => setIsOpen(true)}>{buttonText} ({subChallenges.length})</Button>
            <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{buttonText}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <DataGridForSubChallenges subChallenges={subChallenges} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            닫기
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForSubChallengeList;
