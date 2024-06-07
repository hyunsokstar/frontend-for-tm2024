import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Textarea,
    VStack,
    HStack,
    Text,
} from '@chakra-ui/react';
import ModalButtonForSelectDeadLine from './ModalButtonForSelectDeadLine';
import useApiForAddTodoForDevBattle from '@/hooks/useApiForAddTodoForDevBattle';
import { IAddTodoForDevBattleDto, ITypeForParameterForAddTodoForDevBattle } from '@/types/typeForDevBattle';

interface IProps {
    devBattleId: number;
}

const ModalButtonForAddTodoForDevBattle = ({ devBattleId }: IProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState<Date | null>(null);

    const { mutate: addTodoForDevBattle } = useApiForAddTodoForDevBattle({});

    const onClose = () => {
        setIsOpen(false);
        setTitle('');
        setDescription('');
        setDueDate(null);
    };

    const handleButtonClick = () => {
        setIsOpen(true);
    };

    const handleSubmit = () => {
        const addTodoForDevBattleDto: IAddTodoForDevBattleDto = {
            title,
            description,
            dueDate: dueDate?.toISOString(),
        };

        const typeForParameterForAddTodoForDevBattle: ITypeForParameterForAddTodoForDevBattle = {
            devBattleId,
            addTodoForDevBattleDto,
        };

        addTodoForDevBattle(typeForParameterForAddTodoForDevBattle);
        onClose();
    };

    const handleCancelDueDate = () => {
        setDueDate(null);
    };

    return (
        <>
            <Button onClick={handleButtonClick} size={"sm"} mr={5} mb={1} variant="outline">
                Add Todo
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Todo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <Textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            {dueDate ? (
                                <HStack>
                                    <Text>{dueDate.toLocaleString()}</Text>
                                    <Button size="sm" onClick={handleCancelDueDate}>
                                        Cancel
                                    </Button>
                                </HStack>
                            ) : (
                                <ModalButtonForSelectDeadLine
                                    button_text="Select Deadline"
                                    setDefaultDeadline={setDueDate}
                                />
                            )}
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForAddTodoForDevBattle;