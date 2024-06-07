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
                            {/* <Th>Description</Th> */}
                            {/* <Th>Created At</Th> */}
                            {/* <Th>Updated At</Th> */}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {todos.map((todo) => (
                            <Tr key={todo.id}>
                                <Td>{todo.id}</Td>
                                <Td>{todo.title}</Td>
                                <Td>{formatDateTime(todo.dueDate)}</Td>
                                {/* <Td>{todo.description}</Td> */}
                                {/* <Td>{formatDateTime(todo.createdAt)}</Td> */}
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
