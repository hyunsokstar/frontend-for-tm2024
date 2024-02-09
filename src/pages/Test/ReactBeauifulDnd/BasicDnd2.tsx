import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import {
  DragDropContext,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import dynamic from "next/dynamic";

const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((res) => res.Droppable),
  { ssr: false }
);

type Item = {
  id: string;
  content: string;
};

const getItems = (count: number): Item[] =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `${k + 1}`,
    content: `${k + 1}`,
  }));

const reorder = (
  list: Item[],
  startIndex: number,
  endIndex: number
): Item[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 8;

const getItemStyle = (
  draggableStyle: any,
  isDragging: boolean
): React.CSSProperties => ({
  userSelect: "none",
  padding: grid * 2,
  marginBottom: grid,
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 80,
});

const BasicDnd2: React.FC = () => {
  const [items, setItems] = useState<Item[]>(getItems(5));

  const onDragEnd = (result: DropResult) => {

    console.log("옮긴 박스의 order number : ", result.draggableId);
    console.log("도착지의 oreder number ", result.destination && result.destination.index + 1);

    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <Box>
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        provided.draggableProps.style,
                        snapshot.isDragging
                      )}
                    >
                      {item.content}
                    </Box>
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default BasicDnd2;
