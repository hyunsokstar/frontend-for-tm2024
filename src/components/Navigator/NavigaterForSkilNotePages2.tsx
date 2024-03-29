import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import {
    DragDropContext,
    Draggable,
    DropResult,
} from "react-beautiful-dnd";
import dynamic from "next/dynamic";
import { responseTypeForGetSkilNoteContents } from "@/types/typeForSkilNoteContents";
import useApiForChangePagesOrderForSkilNote from "@/hooks/useApiForChangePagesOrderForSkilNote";
import { useRouter } from "next/router";
import useApiForCreateNextPageForSkilnoteContent from "@/hooks/useApiForCreateNextPageForSkilnoteContent";

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
    background: isDragging ? "lightgreen" : "lightyellow",
    width: "100%",
    ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    background: isDraggingOver ? "lightblue" : "#dde0da",
    padding: grid,
    width: "100%",
});

interface IProps {
    dataForskilNoteContent?: responseTypeForGetSkilNoteContents
    skilNoteId: any
    pageNum: any
}

// skilnoteContents: SkilNoteContentsRow[]
const NavigaterForSkilNotePages2 = ({ skilNoteId, pageNum, dataForskilNoteContent }: IProps) => {
    const [items, setItems] = useState<Item[]>(getItems(5));
    const [currentPage, setCurrentPage] = useState()
    console.log("dataForskilNoteContent : ", dataForskilNoteContent);
    const mutationForChangePagesOrderForSkilNote = useApiForChangePagesOrderForSkilNote({ skilNoteId: skilNoteId, pageNum: pageNum });
    const router = useRouter(); // useRouter를 초기화
    const mutationForCreateNextPageForSkilnoteContent = useApiForCreateNextPageForSkilnoteContent(skilNoteId, pageNum);

    const createPageButtonClick = () => {
        mutationForCreateNextPageForSkilnoteContent.mutate(skilNoteId)
    }

    const handlePageButtonClick = (page: any) => {
        setCurrentPage(page)
        router.push(`/Note/SkilNoteContents/${skilNoteId}/${page}`); // 해당 페이지로 이동
    }

    const onDragEnd = (result: DropResult) => {
        // 드래그한 요소의 data-page 속성 가져오기
        const draggedItemPage = document.getElementById(result.draggableId)?.getAttribute("data-page");
        console.log("옮긴 박스의 order number : ", draggedItemPage);
        console.log("도착지의 oreder number ", result.destination && result.destination.index + 1);

        const destinationOrder = result.destination ? result.destination.index + 1 : null;

        if (destinationOrder !== null) {
            mutationForChangePagesOrderForSkilNote.mutate({
                skilNoteId: skilNoteId,
                targetOrder: String(draggedItemPage),
                destinationOrder: destinationOrder
            });
        }

    };

    return (
        <Box>
            <Box>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <Box
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {
                                    dataForskilNoteContent ? dataForskilNoteContent.skilnoteContentsPagesInfo.map((item, index) => (
                                        <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                                            {(provided, snapshot) => (
                                                <Box display={"flex"} gap={2} alignItems={"center"} key={index}>
                                                    <Button
                                                        backgroundColor={currentPage === index + 1 ? "lightgreen" : ""}
                                                        variant={"outline"} onClick={() => handlePageButtonClick(item.page)} border={"1px solid black"} mb={1}
                                                    >
                                                        {index + 1}
                                                    </Button>
                                                    <Box
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            provided.draggableProps.style,
                                                            snapshot.isDragging
                                                        )}
                                                        id={String(item.id)}
                                                        data-page={item.page}
                                                    >
                                                        {item.title}
                                                    </Box>
                                                </Box>
                                            )}
                                        </Draggable>
                                    )) :
                                        "no data"
                                }
                                {provided.placeholder}
                            </Box>
                        )}
                    </Droppable>
                </DragDropContext>
            </Box>

            <Box display={"flex"} justifyContent={"space-between"} mt={2} width={"100%"} border={"1px solid green"}>
                <Button variant={"outline"} width={"100%"} onClick={createPageButtonClick}>
                    Create Page
                </Button>
            </Box>

        </Box>
    );
};

export default NavigaterForSkilNotePages2;
