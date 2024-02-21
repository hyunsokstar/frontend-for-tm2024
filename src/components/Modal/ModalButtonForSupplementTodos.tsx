import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Box, Text, Switch, HStack } from '@chakra-ui/react';
import { SupplementaryTodo } from '@/types/typeforTodos';
import DataGridForSupplementaryTodoList from '../DataGrid/DataGridForSupplementaryTodoList';
import ProgressBarButton from '../Button/ProgressBarButton';

type Props = {
    parentTodoId: number;
    mainTodoTitle: string;
    mainTodoStatus: string;
    buttonText: string;
    supplementaryTodos: SupplementaryTodo[];
    countForSupplementTodos: number;
    usersEmailInfo: string[];
    todoStatusOption: "all_uncompleted" | "all_completed" | "idea" | "uncompleted" | "completed"
    userId: string;
};

const ModalButtonForSupplementTodos: React.FC<Props> = (
    {
        parentTodoId,
        mainTodoTitle,
        mainTodoStatus,
        buttonText,
        supplementaryTodos,
        countForSupplementTodos,
        usersEmailInfo,
        todoStatusOption,
        userId
    }
) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);
    const [completionRate, setCompletionRate] = useState(0);

    const buttonTextWithCount = buttonText + `(${countForSupplementTodos})`

    useEffect(() => {
        let completed_todos = 0;
        if (supplementaryTodos) {
            supplementaryTodos.forEach((todo) => {
                if (todo.status === "complete") { // 만약 할 일이 완료되었다면
                    completed_todos++;
                }
            });
        }

        let completionRate = (completed_todos / countForSupplementTodos) * 100;
        setCompletionRate(completionRate);
    }, [supplementaryTodos]);


    return (
        <Box>
            <ProgressBarButton
                onClick={onOpen}
                percentage={completionRate}
                colorScheme="black"
                buttonText={buttonTextWithCount}
            />

            <Modal isOpen={isOpen} onClose={onClose} size={"7xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Box display={"flex"} flexDirection={"column"}>
                            <Text>Main Todo: {mainTodoTitle}</Text>
                            <HStack>
                                <Text>Main Todo status: {mainTodoStatus}</Text>
                                {mainTodoStatus === "ready" ?
                                    <Switch
                                        size="md" // 큰 사이즈
                                        colorScheme="teal" // 밝은 색상
                                    // isChecked={mainTodoStatus === 'Completed'}
                                    // onChange={toggleTodoStatus}
                                    />
                                    : ""}

                            </HStack>
                        </Box>

                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <DataGridForSupplementaryTodoList
                            parentTodoId={parentTodoId}
                            supplementaryTodos={supplementaryTodos}
                            usersEmailInfo={usersEmailInfo}
                            todoStatusOption={todoStatusOption}
                            userId={userId}
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
