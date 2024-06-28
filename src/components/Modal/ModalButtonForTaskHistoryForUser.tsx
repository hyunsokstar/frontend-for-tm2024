import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Text,
    Avatar,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure
} from '@chakra-ui/react';
import { IoMdTime } from 'react-icons/io';
import { format, differenceInMinutes } from 'date-fns';
import { ITypeForUserCompletedTodo } from '@/types/typeforTodos';
import useApiForGetUserCompletedTodoList from '@/hooks/useApiForGetUserCompletedTodoList';
import { IUser } from '@/types/typeForUserBoard';
import TimeDifference from '../TaskHistory/TimeDifference';

type Props = {
    user: IUser
};

const ModalButtonForTaskHistoryForUser = ({ user }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [completedTasks, setCompletedTasks] = useState<ITypeForUserCompletedTodo[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, error } = useApiForGetUserCompletedTodoList(user.id, currentPage);

    console.log("user : ", user);
    console.log("data : ", data);

    useEffect(() => {
        if (data && data.todoList) {
            console.log("Setting completedTasks:", data.todoList);
            setCompletedTasks(data.todoList);
        }
    }, [data]);

    useEffect(() => {
        console.log("Updated completedTasks:", completedTasks);
    }, [completedTasks]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading tasks</div>;

    // data가 있으면 data.todoList를 사용, 없으면 completedTasks 상태를 사용
    const tasksToRender = data?.todoList || completedTasks;

    console.log("tasksToRender : ", tasksToRender);

    return (
        <>
            <IconButton aria-label="task history" icon={<IoMdTime />} variant="outline" colorScheme="teal" onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Task History</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box p={4}>
                            {tasksToRender.map((task, index) => {
                                const timeDifference = index > 0
                                    ? differenceInMinutes(new Date(task.completedAt!), new Date(tasksToRender[index - 1].completedAt!))
                                    : 0;

                                return (
                                    <React.Fragment key={task.id}>
                                        {index > 0 && <TimeDifference timeDifference={timeDifference} />}
                                        <Flex alignItems="center" mb={2}>
                                            <Avatar size={"sm"} name={task.manager.email} src={task.manager.profileImage ? task.manager.profileImage : `https://i.pravatar.cc/150?u=${task.manager.email}}`} mr={4} />
                                            <Text flex="1">{task.task}</Text>
                                            <Text ml={4}>{format(new Date(task.completedAt!), 'yy-MM-dd HH:mm')}</Text>
                                        </Flex>
                                    </React.Fragment>
                                );
                            })}
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForTaskHistoryForUser;