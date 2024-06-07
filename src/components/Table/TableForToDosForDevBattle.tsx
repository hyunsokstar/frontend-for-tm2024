import React from 'react'
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

const formatDateTime = (dateTime: string | any) => {
    if (dateTime !== undefined) {
        const time = new Date(dateTime);
        return format(time, "MM-dd HH:mm");
    }

};

interface TodoRowForDevBattle {
    id: number
    title: string
    description: string
    dueDate: string
    createdAt: string
    updatedAt: string
}

interface TableForToDosForDevBattleProps {
    todos: TodoRowForDevBattle[]
    selectedDevBattleId: number;
    devBattleSubject: string
}

const TableForToDosForDevBattle = ({ selectedDevBattleId, devBattleSubject, todos }: TableForToDosForDevBattleProps) => {
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
                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th w="10%">ID</Th>
                            <Th w="60%">Title</Th>
                            <Th w="30%">Due Date</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {todos.map((todo) => (
                            <Tr key={todo.id}>
                                <Td w="10%">{todo.id}</Td>
                                <Td w="60%">{todo.title}</Td>
                                <Td w="30%">{formatDateTime(todo.dueDate)}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </TableContainer>

    )
}

export default TableForToDosForDevBattle
