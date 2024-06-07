import React from 'react'
import {
    Table,
    Text,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
} from '@chakra-ui/react'
import { format } from 'date-fns';

const formatDateTime = (dateTime: string | any) => {
    if (dateTime !== undefined) {
        const time = new Date(dateTime);
        return format(time, "MM-dd");
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
    selectedDevBattleId: number | null;
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

                <Text mb={2}>Subject: {devBattleSubject}</Text>

                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Title</Th>
                            {/* <Th>Description</Th> */}
                            <Th>Due Date</Th>
                            <Th>Created At</Th>
                            {/* <Th>Updated At</Th> */}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {todos.map((todo) => (
                            <Tr key={todo.id}>
                                <Td>{todo.id}</Td>
                                <Td>{todo.title}</Td>
                                {/* <Td>{todo.description}</Td> */}
                                <Td>{todo.dueDate}</Td>
                                <Td>{formatDateTime(todo.createdAt)}</Td>
                                {/* <Td>{todo.updatedAt}</Td> */}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </TableContainer>
    )
}

export default TableForToDosForDevBattle
