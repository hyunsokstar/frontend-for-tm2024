import React, { useEffect, useState } from 'react';
import { Box, Button, HStack, Input, Text, VStack, Icon } from '@chakra-ui/react';
import { IBookmarkForSkilNoteContent, SkilNoteContentsRow } from '@/types/typeForSkilNoteContents';
import EditorForCreateSkilNoteContents from '../RichEditor/EditorForCreateSkilNoteContents';
import EditorForUpdateSkilNotes from '../RichEditor/EditorForUpdateSkilNotes';
import Head from 'next/head';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import useApiForBookMarkSkilNoteContent from '@/hooks/useApiForBookMarkSkilNoteContent';
import { useDispatch } from "react-redux";
// import { saveSkilNoteId } from '@/store/idAdminSlice';

type Props = {
    skilNoteId?: any;
    index: number;
    noteObj?: SkilNoteContentsRow;
    pageNum: any;
    checkedRows: number[];
    setCheckedRows: any;
    bookMarks: IBookmarkForSkilNoteContent[]
    isEditMode: boolean
}

const CardForSkilNoteContent = ({ noteObj, skilNoteId, index, pageNum, checkedRows, setCheckedRows, bookMarks, isEditMode }: Props) => {
    const dispatch = useDispatch();

    const [copied, setCopied] = useState(false);
    const [bookMarkUserIds, setBookMarksUserIds] = useState<number[]>();
    const loginUser = useSelector((state: RootState) => state.user.loginUser);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);


    const mutationForBookMarkSkilNoteContent = useApiForBookMarkSkilNoteContent(skilNoteId, pageNum);


    // console.log("bookMarks : ", bookMarks);
    const bookMarkButtonHandler = (userId: any, skilNoteContentId: any) => {

        mutationForBookMarkSkilNoteContent.mutate({ userId, skilNoteContentId })
    }

    const copyHtmlToClipboard = () => {
        const textToCopy = stripHtmlTags(noteObj?.content || '');
        copyToClipboard(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500); // 1.5초 후에 copied 상태를 false로 변경
    };

    const stripHtmlTags = (html: string) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            // ...복사되었음을 사용자에게 알려주는 논리 추가
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    // const [checkedRows, setCheckedRows] = useState<number[]>([]);

    const handlerForCardCheck = (contentId: any) => {
        console.log("handlerForCardCheck");
        if (checkedRows.includes(contentId)) {
            const updatedRows = checkedRows.filter(id => id !== contentId);
            setCheckedRows(updatedRows); // contentId를 제거한 배열로 상태 업데이트

        } else {
            const updatedRows = [...checkedRows, contentId];
            setCheckedRows(updatedRows); // contentId를 추가한 배열로 상태 업데이트
        }
    }

    useEffect(() => {
        let bookMarkUserIds
        if (bookMarks) {
            bookMarkUserIds = bookMarks.map((bo) => {
                return bo.user.id
            })
            console.log("bookMarkUserIds : ", bookMarkUserIds);

            setBookMarksUserIds(bookMarkUserIds)
        }
        // console.log("skilNoteId ? : ", skilNoteId);

        // if (skilNoteId) {
        //     console.log("skilNoteId : ", skilNoteId);
        //     dispatch(saveSkilNoteId(skilNoteId));
        // }

    }, [bookMarks])


    return (
        <>
            {isEditMode ?
                <Box>
                    <EditorForUpdateSkilNotes
                        skilNoteId={skilNoteId}
                        pageNum={pageNum}
                        skilNoteContentId={noteObj?.id}
                        title={noteObj?.title}
                        file={noteObj?.file}
                        content={noteObj?.content}
                    />
                </Box>
                : ""}

            {!isEditMode && noteObj ?
                <Box
                    key={noteObj.id}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    display="flex"
                    flexDirection="column"
                    width={"100%"}
                // gap={1}
                >
                    <Box p={1} border="2px solid blue">
                        <HStack spacing={1} mb={0}>
                            <Text>
                                <Button
                                    variant="outlined"
                                    size="md"
                                    border="1px"
                                    onClick={() => handlerForCardCheck(noteObj.id)}
                                    backgroundColor={checkedRows.includes(noteObj.id) ? "yellow.100" : "white"}
                                >
                                    {index}
                                </Button>
                            </Text>
                            <Input defaultValue={noteObj.title} />
                            <Input defaultValue={noteObj.file} />
                        </HStack>

                        <Box position="relative">
                            <Box
                                border="1px dotted black"
                                overflowY="scroll"
                                height="70vh"
                                dangerouslySetInnerHTML={{ __html: noteObj.content }}
                            />
                            <Button
                                position="absolute"
                                top="1px"
                                right="18px"
                                size="sm"
                                variant="outline"
                                onClick={copyHtmlToClipboard}
                            >
                                {copied ? 'Copied!' : 'Copy'}
                            </Button>
                        </Box>
                    </Box>
                    {isLoggedIn ?
                        <Box display={"flex"} justifyContent={"flex-end"} p={1}>
                            {bookMarkUserIds?.includes(loginUser.id) ? (
                                <Button
                                    bg="green.200"
                                    // p={2}
                                    size={"xs"}
                                    onClick={() => bookMarkButtonHandler(loginUser.id, noteObj.id)}
                                >
                                    {/* fix0130 */}
                                    <Icon as={FaBookmark} color="green.500" mr={1} />
                                    <Text>({bookMarkUserIds.length})</Text>
                                </Button>
                            ) : (
                                <Button
                                    // bg="red.100"
                                    // p={2}
                                    size={"xs"}
                                    onClick={() => bookMarkButtonHandler(loginUser.id, noteObj.id)}
                                >
                                    <Icon as={FaRegBookmark} color="gray.500" mr={1} />
                                    <Text>({bookMarkUserIds?.length})</Text>
                                </Button>
                            )}
                        </Box>
                        : ""}
                </Box>
                : ""}
        </>
    )
}

export default CardForSkilNoteContent;
