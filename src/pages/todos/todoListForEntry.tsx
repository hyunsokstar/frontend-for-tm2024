import DataGridForUserTodoList from '@/components/DataGrid/DataGridForUserTodoList'
import React from 'react'

type Props = {}

const TodoListForEntry = (props: Props) => {
    return (
        <div>
            hi
            <DataGridForUserTodoList pageInfo="todosPageForAllUser" todoStatusOption={'entry'} />
        </div>
    )
}

export default TodoListForEntry