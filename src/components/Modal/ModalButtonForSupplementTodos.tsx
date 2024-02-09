import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Box } from '@chakra-ui/react';
import { SupplementaryTodo } from '@/types/typeforTodos';
import DataGridForSupplementaryTodoList from '../DataGrid/DataGridForSupplementaryTodoList';
import ProgressBarButton from '../Button/ProgressBarButton';

type Props = {
    parentTodoId: number;
    buttonText: string;
    supplementaryTodos: SupplementaryTodo[];
    countForSupplementTodos: number;
    usersEmailInfo: string[]
};

const ModalButtonForSupplementTodos: React.FC<Props> = (
    {
        parentTodoId,
        buttonText,
        supplementaryTodos,
        countForSupplementTodos,
        usersEmailInfo
    }
) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);
    const buttonTextWithCount = buttonText + `(${countForSupplementTodos})`

    return (
        <Box>
            {/* <Button onClick={onOpen} size={"xs"} variant={"outline"}>{buttonText} ({countForSupplementTodos})</Button> */}
            <ProgressBarButton
                onClick={onOpen}
                percentage={50}
                colorScheme="black"
                buttonText={buttonTextWithCount}
            />

            <Modal isOpen={isOpen} onClose={onClose} size={"7xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        countForSupplementTodos1111111
                        <DataGridForSupplementaryTodoList
                            parentTodoId={parentTodoId}
                            supplementaryTodos={supplementaryTodos}
                            usersEmailInfo={usersEmailInfo}
                        />
                    </ModalBody>
                    <ModalFooter>
                        {/* Add your modal footer content here */}
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ModalButtonForSupplementTodos;
