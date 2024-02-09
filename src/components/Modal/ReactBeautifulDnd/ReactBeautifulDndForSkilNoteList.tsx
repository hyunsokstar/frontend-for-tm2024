import React, { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import {
    DragDropContext,
    Draggable,
    DropResult,
} from "react-beautiful-dnd";
import dynamic from "next/dynamic";


import { SkillNoteRow } from "@/types/typeForSkilNote";
import useApiForUpdateSkilNoteListOrder from "@/hooks/useApiForUpdateSkilNoteListOrder";

const Droppable = dynamic(
    () => import("react-beautiful-dnd").then((res) => res.Droppable),
    { ssr: false }
);

type Item = {
    id: string;
    title: string;
    category: string;
};

// const getItems = (count: number): Item[] =>
//     Array.from({ length: count }, (v, k) => k).map((k) => ({
//         id: `${k + 1}`,
//         content: `${k + 1}`,
//     }));

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
    background: isDragging ? "lightgreen" : "lightyellow",
    ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    background: isDraggingOver ? "lightblue" : "lightblue",
    padding: grid,
    width: "100%",
});

interface IProps {
    dataForSkilNoteList: SkillNoteRow[] | undefined
    techNoteId: any
    pageNum: any
}

const ReactBeautifulDndForSkilNoteList = ({ techNoteId, pageNum, dataForSkilNoteList, }: IProps) => {
    const [items, setItems] = useState<Item[]>([]);
    const muationForSkilNoteListOrder = useApiForUpdateSkilNoteListOrder(techNoteId, pageNum);

    console.log("items : ", items);

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

        console.log("newItems : ", newItems);
        muationForSkilNoteListOrder.mutate(newItems)

        setItems(newItems);
    };

    useEffect(() => {
        if (dataForSkilNoteList) {

            const ordersArray = dataForSkilNoteList?.map((row) => {
                return {
                    id: `${row.id}`,
                    // order: `${row.}`,
                    title: `${row.title}`,
                    category: `${row.category}`,
                    order: row.order
                }
            })
            setItems(ordersArray)
        }
    }, [dataForSkilNoteList])

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <Box
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >

                        {items && items.map((note, index) => (

                            <Draggable key={note.id} draggableId={String(note.id)} index={index}>
                                {(provided, snapshot) => (
                                    <Box display={"flex"}>
                                        <Box
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                provided.draggableProps.style,
                                                snapshot.isDragging
                                            )}
                                            display={"flex"}
                                            flexWrap={"wrap"}
                                            gap={2}
                                            justifyContent={"space-between"}
                                            alignItems={"center"}
                                            width={"100%"}
                                        >
                                            <p>{note.id}</p>
                                            <p>{note.title}</p>
                                            <p>{note.category}</p>
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

export default ReactBeautifulDndForSkilNoteList;
