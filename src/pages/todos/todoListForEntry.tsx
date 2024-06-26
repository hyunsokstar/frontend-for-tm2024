import DataGridForUserTodoList from '@/components/DataGrid/DataGridForUserTodoList'
import React from 'react'

type Props = {}

const TodoListForEntry = (props: Props) => {
    return (
        <div>
            <DataGridForUserTodoList pageInfo="todosPageForAllUser" todoStatusOption={'entry'} selectedUserId={undefined} />
        </div>
    )
}

export default TodoListForEntry