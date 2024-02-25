import React, { useState } from 'react';
import { Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import useApiForGetUncompletedTodoListForUserId from '@/hooks/useApiForGetUncompletedTodoListForUserId';
import { ITypeForTodoRow } from '@/types/typeforTodos';
import { format } from 'date-fns';

const formatDateTime = (dateTime: string) => {
    return format(new Date(dateTime), "MM-dd HH:mm");
};

type Props = {
    buttonText: string;
    selectedUserId?: any;
    todoStatusOption: "all_uncompleted" | "all_completed" | "idea" | "uncompleted" | "complete" | "entry";
};

const ModalButtonForTaskHistory: React.FC<Props> = ({ buttonText, selectedUserId, todoStatusOption }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [pageNum, setPageNum] = useState(1);

    const loginUser = useSelector((state: RootState) => state.user.loginUser);
    const userId = selectedUserId ? selectedUserId : loginUser.id


    const { isLoading, error, data: dataForUncompletedTodoListForUser }
        = useApiForGetUncompletedTodoListForUserId({ pageNum, userId, todoStatusOption });

    // console.log("dataForUncompletedTodoListForUser for modal ??? ", dataForUncompletedTodoListForUser);


    return (
        <>
            <Button variant="outline" onClick={onOpen}>
                {buttonText}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="6xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{buttonText}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        {dataForUncompletedTodoListForUser ? dataForUncompletedTodoListForUser.todoList.map((todo: ITypeForTodoRow, index: number) => {
                            // 현재 Todo가 마지막 Todo가 아니고 다음 Todo가 존재할 때
                            if (index < dataForUncompletedTodoListForUser.todoList.length - 1) {
                                // 현재 Todo의 completedAt
                                const currentCompletedAt = new Date(todo.completedAt);
                                // 다음 Todo의 completedAt
                                const nextCompletedAt = new Date(dataForUncompletedTodoListForUser.todoList[index + 1].completedAt);
                                // 두 Todo 사이의 시간 간격 계산 (단위: 밀리초)
                                const timeDiff = nextCompletedAt.getTime() - currentCompletedAt.getTime();
                                // 시간 간격을 시간과 분으로 변환
                                const hours = Math.floor(timeDiff / (1000 * 60 * 60));
                                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

                                return (
                                    <>
                                        <Box key={todo.id} display={"flex"} justifyContent={"space-between"}>
                                            <Box>{todo.task}</Box>
                                            <Box>{formatDateTime(todo.completedAt)}</Box>
                                        </Box>
                                        <Box>{hours}시간 {minutes}분</Box>
                                    </>
                                );
                            } else {
                                return (
                                    <Box key={todo.id} display={"flex"} justifyContent={"space-between"}>
                                        <Box>{todo.task}</Box>
                                        <Box>{formatDateTime(todo.completedAt)}</Box>
                                    </Box>
                                );
                            }
                        }) : "no data"}


                    </ModalBody>
                    <ModalFooter>
                        {/* Modal 하단 영역을 원하면 여기에 추가 */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForTaskHistory;
