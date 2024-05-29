import React, { useState } from 'react';
import {
    Flex,
    Input,
    IconButton,
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
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { DevBattleResponse } from '@/types/typeForDevBattle';
import useApiForRemoveDevBattleById from '@/hooks/useApiForRemoveDevBattleById';
import ModalButtonForCreateDevBattle from './ModalButtonForCreateDevBattle';

interface ModalButtonForUpdateDevbattleSubjectsProps {
    devBattles: DevBattleResponse[];
}

const ModalButtonForUpdateDevbattleSubjects: React.FC<ModalButtonForUpdateDevbattleSubjectsProps> = ({
    devBattles,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [subjects, setSubjects] = useState<{ [id: number]: string }>({});
    const [isEditMode, setIsEditMode] = useState<{ [id: number]: boolean }>({});
    const removeDevBattle = useApiForRemoveDevBattleById();

    const handleSubjectChange = (id: number, newSubject: string) => {
        setSubjects((prevSubjects) => ({
            ...prevSubjects,
            [id]: newSubject,
        }));
    };

    const handleUpdateSubject = (id: number) => {
        // 여기에 서버로 업데이트 요청을 보내는 로직을 추가하세요.
        console.log(`Update subject for id ${id} to ${subjects[id]}`);
        setIsEditMode((prevIsEditMode) => ({
            ...prevIsEditMode,
            [id]: false,
        }));
    };

    const handleDeleteSubject = (id: number) => {
        // 여기에 서버로 삭제 요청을 보내는 로직을 추가하세요.
        removeDevBattle.mutate(id);
    };

    const toggleEditMode = (id: number) => {
        setIsEditMode((prevIsEditMode) => ({
            ...prevIsEditMode,
            [id]: !prevIsEditMode[id],
        }));
    };

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
                                {isEditMode[devBattle.id] ? (
                                    <Input
                                        value={subjects[devBattle.id] || devBattle.subject}
                                        onChange={(e) => handleSubjectChange(devBattle.id, e.target.value)}
                                        mr={2}
                                        size={"sm"}
                                    />
                                ) : (
                                    <Box flex="1">{devBattle.subject}</Box>
                                )}
                                <Flex>
                                    {isEditMode[devBattle.id] ? (
                                        <>
                                            <IconButton
                                                icon={<CheckIcon />}
                                                aria-label="Confirm Edit"
                                                colorScheme="green"
                                                size="xs"
                                                mr={2}
                                                onClick={() => handleUpdateSubject(devBattle.id)}
                                            />
                                            <IconButton
                                                icon={<CloseIcon />}
                                                aria-label="Cancel Edit"
                                                colorScheme="red"
                                                size="xs"
                                                onClick={() => toggleEditMode(devBattle.id)}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <IconButton
                                                icon={<EditIcon />}
                                                aria-label="Edit Subject"
                                                colorScheme="blue"
                                                size="xs"
                                                mr={2}
                                                onClick={() => toggleEditMode(devBattle.id)}
                                            />
                                            <IconButton
                                                icon={<DeleteIcon />}
                                                aria-label="Delete Subject"
                                                colorScheme="red"
                                                size="xs"
                                                onClick={() => handleDeleteSubject(devBattle.id)}
                                            />
                                        </>
                                    )}
                                </Flex>
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
