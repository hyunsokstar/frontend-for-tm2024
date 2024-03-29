"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Spacer, Text } from "@chakra-ui/react";
import {
    DragDropContext,
    Draggable,
    DropResult,
} from "react-beautiful-dnd";
import dynamic from "next/dynamic";
import useApiForUpdateOrderForSkilNoteContents from "@/hooks/useApiForUpdateOrderForSkilNoteContents";
import { responseTypeForGetSkilNoteContents } from "@/types/typeForSkilNoteContents";
import { saveNoteId } from "@/store/rightSideNaviForSkilNoteContents";
import { useDispatch } from "react-redux";

const Droppable = dynamic(
    () => import("react-beautiful-dnd").then((res) => res.Droppable),
    { ssr: false }
);

type Item = {
    id: string;
    order: string;
    title?: string;
    file?: string
};

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
    isDragging: boolean,
): React.CSSProperties => ({
    userSelect: "none",
    padding: grid * 1,
    marginBottom: grid,
    background: isDragging ? "lightgreen" : "lightyellow",
    ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    // width: 100,
});

interface IProps {
    // itemsInfo: Item[]
    skilNoteId: any
    pageNum: any
    scrollToCard: (index: number) => void
    checkedRows: number[];
    setCheckedRows: any;
    scrollCardToEditor: () => void
    dataForskilNoteContent?: responseTypeForGetSkilNoteContents
}

const NavigatorForScrollContents =
    ({ dataForskilNoteContent, skilNoteId, pageNum, scrollToCard, scrollCardToEditor, checkedRows, setCheckedRows }: IProps) => {
        const [items, setItems] = useState<Item[]>([]);
        const [currentIndex, setCurrentIndex] = useState<Number>()

        const contentIndexButtonClick = (index: number) => {
            console.log("index : ", index);
            setCurrentIndex(index + 1)
        }

        const mutationForUpdateOrderForSkilNoteContents = useApiForUpdateOrderForSkilNoteContents(skilNoteId, pageNum);
        const dispatch = useDispatch();

        const onDragEnd = (result: DropResult) => {
            console.log("옮길 박스의 현재 index : ", result.source.index + 1);
            console.log("도착지의 oreder number ", result.destination && result.destination.index + 1);

            if (result.destination && result.source.index + 1 === result.destination?.index + 1) {
                return;
            }


            if (!result.destination) {
                return;
            }

            const newItems = reorder(
                items,
                result.source.index,
                result.destination.index
            );
            setItems(newItems);

            mutationForUpdateOrderForSkilNoteContents.mutate(newItems)
        };

        const contentOrderButtonHandler = (e: any, orderNum: string, contentId: string) => {
            console.log("contentOrderButtonHandler");
            scrollToCard(parseInt(orderNum))
            const skilnoteContentId = parseInt(contentId)

            // todo shift + click 일 경우 아래 checkedRows 관련 if else 실행 되도록 조건 수정 
            const isShiftKeyPressed = e.shiftKey;

            if (isShiftKeyPressed) {
                console.log("check excute ");
                if (checkedRows.includes(skilnoteContentId)) {
                    const updatedRows = checkedRows.filter(id => id !== skilnoteContentId);
                    setCheckedRows(updatedRows); // contentId를 제거한 배열로 상태 업데이트

                } else {
                    const updatedRows = [...checkedRows, skilnoteContentId];
                    setCheckedRows(updatedRows); // contentId를 추가한 배열로 상태 업데이트
                }
            }

        }


        function getExtension(filePath: any): string | null {
            // todo: filePath 이라는 문자열에 http:// 이 포함되어 있을 경우 return "test"

            if (filePath.includes("http://")) {
                return "test";
            }

            if (filePath.length === 0) {
                return "";
            }

            const matches = filePath.match(/\.([^.]+)$/);
            return matches ? matches[1] : null;
        }

        // 색깔 조절
        function getBackgroundColor(fileType: any): string {
            const yellowTone = "#FFFFE0";

            switch (fileType) {
                case "todo":
                    return "pink"; // Blue (Material Design's primary blue)
                case "tsx":
                    return "#abe7ad"; // Green (Material Design's primary green)
                case "ts":
                    return "#FF9800"; // Orange (Material Design's primary orange)
                case "css":
                    return "#9C27B0"; // Purple (Material Design's primary purple)
                case "test":
                    return "#7abdf3"; // Light Blue (Material Design's primary light blue)
                case "cmd":
                    return "#a7eee7"; // Teal (Material Design's primary teal)
                default:
                    return yellowTone;
            }
        }



        useEffect(() => {

            if (dataForskilNoteContent) {
                const ordersArray = dataForskilNoteContent?.skilnoteContents.map((row) => {
                    return {
                        id: `${row.id}`,
                        order: `${row.order}`,
                        title: `${row.title}`,
                        file: `${row.file}`
                    }
                })
                setItems(ordersArray)
            }
            if (skilNoteId) {
                dispatch(saveNoteId(skilNoteId));
            }

        }, [dataForskilNoteContent])


        return (
            <Box overflowY={"scroll"} height={"70vh"}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <Box
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                border={"0px solid red"}
                                m={1}
                            >
                                {items && items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
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
                                                    // onClick={() => scrollToCard(parseInt(item.order))}
                                                    onClick={(e) => contentOrderButtonHandler(e, item.order, item.id)}
                                                    fontSize={14}
                                                    border={checkedRows.includes(parseInt(item.id)) ? "1px solid red" : "1px solid black"}
                                                    width={"100%"}
                                                    display={"flex"}
                                                    flexWrap={"wrap"}
                                                    gap={2}
                                                    justifyContent={"center"}
                                                    alignItems={"center"}
                                                >
                                                    <Box>
                                                        <Button
                                                            size={"sm"} variant={"outline"} border={"1px solid black"} m={0} onClick={(i) => contentIndexButtonClick(index)}
                                                            backgroundColor={index + 1 === currentIndex ? "paleturquoise" : ""}
                                                        >
                                                            {index + 1}
                                                        </Button>
                                                    </Box>
                                                    <Box>
                                                        {item.title}
                                                    </Box>
                                                    <Spacer />
                                                    {getExtension(item.file) !== "" ?
                                                        <Button onClick={() => alert("열기")} size={"xs"} bgColor={getBackgroundColor(getExtension(item?.file))} m={0} width={"2rem"}>
                                                            {getExtension(item?.file)}
                                                        </Button>
                                                        : ""}

                                                </Box>
                                            </Box>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                <Box display={"flex"}>
                                    <Button background={"white"} color={"black"} flex={1} variant={"outline"} onClick={scrollCardToEditor}>create</Button>
                                </Box>
                            </Box>
                        )}
                    </Droppable>
                </DragDropContext>
            </Box >
        );
    };

export default NavigatorForScrollContents;
