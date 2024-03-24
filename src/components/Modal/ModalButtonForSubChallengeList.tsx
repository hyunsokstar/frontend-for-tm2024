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
import { IChallengeRow, SubChallengeRow } from '@/types/typeforChallenges';
import ModalButtonForCreateSubChallenge from './ModalButtonForCreateSubChallenge';

type Props = {
    pageNum: number;
    buttonText: string;
    subChallenges: SubChallengeRow[];
    challenge: IChallengeRow
};

const ModalButtonForSubChallengeList: React.FC<Props> = ({
    pageNum,
    buttonText,
    challenge,
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
                    <ModalHeader>{challenge.challengeName}'s subchallenges</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box display={"flex"} justifyContent={"flex-end"} m={2}>
                            <ModalButtonForCreateSubChallenge challengeId={challenge.id} pageNum={pageNum} />
                        </Box>

                        <DataGridForSubChallenges
                            mainChallenge={challenge}
                            pageNum={pageNum}
                            subChallenges={subChallenges}
                        />

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
