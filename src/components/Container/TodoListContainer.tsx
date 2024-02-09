import React from 'react'
import DataGridForUserTodoList from '../DataGrid/DataGridForUserTodoList'

type Props = {}

const TodoListContainer = (props: Props) => {
    return (
        <>
            <DataGridForUserTodoList todoStatusOption={'idea'} pageInfo={'todosPageForAllUser'} />
        </>
    )
}

export default TodoListContainer