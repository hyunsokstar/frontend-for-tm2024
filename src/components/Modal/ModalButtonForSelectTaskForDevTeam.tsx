import { IAddDevProgressForTeamDto, TodoRowForDevBattle } from '@/types/typeForDevBattle'
import React from 'react'

import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from '@chakra-ui/react'

import { FaPlus } from 'react-icons/fa'
import { format } from 'date-fns';
import useApiForAddProgressToDevTeam from '@/hooks/useApiForAddProgressToDevTeam';


const formatDateTime = (dateTime: string | any) => {
    if (dateTime !== undefined) {
        const time = new Date(dateTime);
        return format(time, "MM-dd HH:mm");
    }

};

type Props = {
    todos: TodoRowForDevBattle[]
    teamId: number;
}

const ModalButtonForSelectTaskForDevTeam = ({ todos, teamId }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const mutationForAddProgressToDevTeam = useApiForAddProgressToDevTeam();

    const selectButtonClick = (task: string) => {
        mutationForAddProgressToDevTeam.mutate(
            {
                teamId, addDevProgressForTeamDto: {
                    task: task
                }
            },
            {
                onSuccess: () => {
                    onClose();
                },
                onError: () => {
                },
            }
        );
    }

    return (
        <>
            <Button onClick={onOpen} size="xs" variant="outline" border={"1px solid black"} colorScheme='red'>
                <FaPlus />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Select Task for Dev Team</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <TableContainer>
                            <Box
                                bg="white"
                                borderRadius="lg"
                                boxShadow="lg"
                                p={4}
                                mt={4}
                                mb={4}
                                w="100%"
                            >
                                <Box
                                    display={"flex"}
                                    justifyContent={"flex-start"}
                                    alignItems={"center"}
                                    gap={5} mb={2}
                                >
                                    {/* <Text>Subject: {devBattleSubject}</Text> */}
                                </Box>

                                <Table size="sm">
                                    <Thead>
                                        <Tr>
                                            <Th w="10%">ID</Th>
                                            <Th w="60%">Title</Th>
                                            <Th w="20%">Due Date</Th>
                                            <Th w="10%">선택</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {todos.map((todo, index) => (
                                            <Tr key={todo.id}>
                                                <Td>{index + 1}</Td>
                                                <Td>{todo.title}</Td>
                                                <Td>{formatDateTime(todo.dueDate)}</Td>
                                                <Td>
                                                    <Button
                                                        variant={"outline"}
                                                        size="sm"
                                                        onClick={() => selectButtonClick(todo.title)}
                                                    >
                                                        선택
                                                    </Button>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </Box>
                        </TableContainer>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost' onClick={onClose}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalButtonForSelectTaskForDevTeam
