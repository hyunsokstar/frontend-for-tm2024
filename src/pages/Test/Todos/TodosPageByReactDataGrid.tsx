import DataGridForUserTodoList from '@/components/DataGrid/DataGridForUserTodoList'
import ModalButtonForTaskHistory from '@/components/Modal/ModalButtonForTaskHistory'
import { Box } from '@chakra-ui/react'
import React from 'react'


type Props = {}

const TodosPageByReactDataGrid = (props: Props) => {
    return (
        <Box width={"100%"}>

            uncompleted:
            <DataGridForUserTodoList pageInfo="todosPageForAllUser" todoStatusOption={'all_uncompleted'} selectedUserId={"allUser"} />

            <br />
            completed: <ModalButtonForTaskHistory buttonText='task history' todoStatusOption={'all_completed'} />

            <br />
            <DataGridForUserTodoList pageInfo="todosPageForAllUser" todoStatusOption={'all_completed'} />

        </Box>
    )
}

export default TodosPageByReactDataGrid