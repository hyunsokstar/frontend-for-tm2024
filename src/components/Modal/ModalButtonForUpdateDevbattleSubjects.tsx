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
    Input,
} from '@chakra-ui/react';
import { DevBattleResponse } from '@/types/typeForDevBattle';
import useApiForRemoveDevBattleById from '@/hooks/useApiForRemoveDevBattleById';
import ModalButtonForCreateDevBattle from './ModalButtonForCreateDevBattle';
import { AddIcon, DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { FaPencilAlt } from 'react-icons/fa';
import useApiForUpdateDevBattleSubject from '@/hooks/useApiForUpdateDevBattleSubject';

interface ModalButtonForUpdateDevbattleSubjectsProps {
    devBattles: DevBattleResponse[];
}

const ModalButtonForUpdateDevbattleSubjects: React.FC<ModalButtonForUpdateDevbattleSubjectsProps> = ({
    devBattles,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const removeDevBattle = useApiForRemoveDevBattleById();
    const updateDevBattleSubject = useApiForUpdateDevBattleSubject();
    const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
    const [editValue, setEditValue] = useState<{ [key: string]: string }>({});

    const handleEditClick = (id: number, subject: string) => {
        setEditMode((prev) => ({ ...prev, [id]: true }));
        setEditValue((prev) => ({ ...prev, [id]: subject }));
    };

    const handleCancelClick = (id: number) => {
        setEditMode((prev) => ({ ...prev, [id]: false }));
        setEditValue((prev) => ({ ...prev, [id]: '' }));
    };

    const handleChange = (id: number, value: string) => {
        setEditValue((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (id: number) => {
        updateDevBattleSubject.mutate({ id, subject: editValue[id] });
        setEditMode((prev) => ({ ...prev, [id]: false }));
    };

    return (
        <Box>
            <IconButton
                icon={<AddIcon />}
                aria-label="Add Subject"
                onClick={onOpen}
                colorScheme="green"
                size="sm"
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
                            <Flex key={devBattle.id} alignItems="center" mb={1} justifyContent="space-between">
                                <Box flex={1} mr={2}>
                                    {editMode[devBattle.id] ? (
                                        <Input
                                            value={editValue[devBattle.id]}
                                            onChange={(e) => handleChange(devBattle.id, e.target.value)}
                                            size={"xs"}
                                        />
                                    ) : (
                                        devBattle.subject
                                    )}
                                </Box>

                                {editMode[devBattle.id] ? (
                                    <Box display={"flex"} gap={1}>
                                        <IconButton
                                            size="xs"
                                            variant="outline"
                                            aria-label="Submit Edit"
                                            icon={<CheckIcon />}
                                            onClick={() => handleSubmit(devBattle.id)}
                                            bg="green.50"
                                        />
                                        <IconButton
                                            size="xs"
                                            variant="outline"
                                            aria-label="Cancel Edit"
                                            icon={<CloseIcon />}
                                            onClick={() => handleCancelClick(devBattle.id)}
                                            bg="red.50"
                                        />
                                    </Box>
                                ) : (
                                    <Box display={"flex"} gap={1}>
                                        <IconButton
                                            size="xs"
                                            variant="outline"
                                            aria-label="Update Dev Progress"
                                            icon={<FaPencilAlt />}
                                            bg="orange.50"
                                            onClick={() => handleEditClick(devBattle.id, devBattle.subject)}
                                        />
                                        <IconButton
                                            icon={<DeleteIcon />}
                                            aria-label="Delete Subject"
                                            colorScheme="red"
                                            size="xs"
                                            onClick={() => removeDevBattle.mutate(devBattle.id)}
                                        />
                                    </Box>
                                )}

                            </Flex>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ModalButtonForUpdateDevbattleSubjects;
