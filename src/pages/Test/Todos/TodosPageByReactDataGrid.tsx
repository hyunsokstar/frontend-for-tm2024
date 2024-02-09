import DataGridForUserTodoList from '@/components/DataGrid/DataGridForUserTodoList'
import ModalButtonForTaskHistory from '@/components/Modal/ModalButtonForTaskHistory'
import React from 'react'


type Props = {}

const TodosPageByReactDataGrid = (props: Props) => {

    return (
        <>
            uncomplted:
            <DataGridForUserTodoList pageInfo="todosPageForAllUser" todoStatusOption={'all_uncompleted'} selectedUserId={undefined} />
            <br />

            completed: <ModalButtonForTaskHistory buttonText='task history' todoStatusOption={'all_completed'} />

            <br />
            <DataGridForUserTodoList pageInfo="todosPageForAllUser" todoStatusOption={'all_completed'} />

        </>
    )
}

export default TodosPageByReactDataGrid