import React, { useEffect, useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
} from '@chakra-ui/react'
import { format } from 'date-fns';
import ModalButtonForAddTodoForDevBattle from '../Modal/ModalButtonForAddTodoForDevBattle';
import { TodoRowForDevBattle } from '@/types/typeForDevBattle';

const formatDateTime = (dateTime: string | any) => {
    if (dateTime !== undefined) {
        const time = new Date(dateTime);
        return format(time, "MM-dd HH:mm");
    }
};

interface TableForToDosForDevBattleProps {
    todos: TodoRowForDevBattle[]
    selectedDevBattleId: number;
    devBattleSubject: string
}

const TableForToDosForDevBattle = ({ selectedDevBattleId, devBattleSubject, todos }: TableForToDosForDevBattleProps) => {
    const [displayTodos, setDisplayTodos] = useState<TodoRowForDevBattle[]>([]);

    useEffect(() => {
        setDisplayTodos(todos);
    }, [todos]);

    return (
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
                    <ModalButtonForAddTodoForDevBattle devBattleId={selectedDevBattleId} />
                </Box>

                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th w="10%">ID</Th>
                            <Th w="60%">Title</Th>
                            <Th w="30%">Due Date</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {displayTodos.map((todo) => (
                            <Tr key={todo.id}>
                                <Td>{todo.id}</Td>
                                <Td>{todo.title}</Td>
                                <Td>{formatDateTime(todo.dueDate)}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </TableContainer>
    )
}

export default TableForToDosForDevBattle