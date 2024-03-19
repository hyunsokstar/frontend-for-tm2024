'use client';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const MyDndComponent = () => {
    const [todos, setTodos] = useState([
        { id: '1', text: 'Todo 1' },
        { id: '2', text: 'Todo 2' },
        { id: '3', text: 'Todo 3' },
    ]);

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTodos(items);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todos">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {todos.map((todo, index) => (
                            <Draggable key={todo.id} draggableId={todo.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                            backgroundColor: 'lightgray',
                                            padding: '10px',
                                            margin: '5px 0',
                                            ...provided.draggableProps.style,
                                        }}
                                    >
                                        {todo.text}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default MyDndComponent;