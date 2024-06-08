import React, { useState } from 'react';
import {
    Flex,
    Box,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    IconButton,
} from '@chakra-ui/react';
import { DevBattleResponse } from '@/types/typeForDevBattle';
import useApiForRemoveDevBattleById from '@/hooks/useApiForRemoveDevBattleById';
import ModalButtonForCreateDevBattle from './ModalButtonForCreateDevBattle';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

interface ModalButtonForUpdateDevbattleSubjectsProps {
    devBattles: DevBattleResponse[];
}

const ModalButtonForUpdateDevbattleSubjects: React.FC<ModalButtonForUpdateDevbattleSubjectsProps> = ({
    devBattles,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const removeDevBattle = useApiForRemoveDevBattleById();

    return (
        <Box>
            <IconButton
                icon={<AddIcon />}
                aria-label="Add Subject"
                onClick={onOpen}
                colorScheme="green"
                size="xs"
                mr={2}
                mb={1}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update DevBattle Subjects</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Box display={"flex"} justifyContent={"flex-end"} mb={2}>
                            <ModalButtonForCreateDevBattle />
                        </Box>

                        {devBattles.map((devBattle) => (
                            <Flex key={devBattle.id} alignItems="center" mb={2} justifyContent="space-between">
                                <Box flex="1">{devBattle.subject}</Box>
                                <IconButton
                                    icon={<DeleteIcon />}
                                    aria-label="Delete Subject"
                                    colorScheme="red"
                                    size="xs"
                                    onClick={() => removeDevBattle.mutate(devBattle.id)}
                                />
                            </Flex>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ModalButtonForUpdateDevbattleSubjects
