import { responseTypeForGetSkilNoteContents } from '@/types/typeForSkilNoteContents'
import { Box, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import CardForSkilNoteContent from '../Card/CardForSkilNoteContent'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'

type Props = {
    dataForskilNoteContent?: responseTypeForGetSkilNoteContents
    skilNoteId: any
}

const BookMarksForInfoForSkilNoteContents = ({ dataForskilNoteContent }: Props) => {
    const [checkedRows, setCheckedRows] = useState<number[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const loginUser = useSelector((state: RootState) => state.user.loginUser);

    console.log("dataForskilNoteContent ??:", dataForskilNoteContent);

    return (
        <>
            {dataForskilNoteContent ? dataForskilNoteContent.skilnoteContents.map((skilnote) => {
                return <Box>
                    {skilnote.bookMarks.map((bookmark, index) => {
                        const skilNoteContent = bookmark.skilNoteContent
                        if (bookmark.user.email === loginUser.email)
                            return (
                                <Box display={"flex"} gap={2} justifyContent={"space-between"} p={1} ml={2}>
                                    <Box flex={1}>
                                        {skilNoteContent.id}
                                    </Box>
                                    <Box flex={3}>
                                        {skilNoteContent.title}
                                    </Box>
                                    <Box flex={1}>
                                        {skilNoteContent.page}
                                    </Box>
                                    <Box flex={1}>
                                        {skilNoteContent.order}
                                    </Box>
                                    <Box flex={1}>
                                        <Button>click</Button>
                                    </Box>

                                </Box>
                            )
                    })}
                </Box>
            }) : ""}
        </>
    )
}

export default BookMarksForInfoForSkilNoteContents

{/* <CardForSkilNoteContent
                                    index={index}
                                    pageNum={skilNoteContent.page}
                                    checkedRows={[]}
                                    setCheckedRows={undefined}
                                    bookMarks={skilnote.bookMarks}
                                    isEditMode={false}
                                /> */}
{/* <CardForSkilNoteContent
                                    key={skilNoteContent.id}
                                    skilNoteId={skilNoteContent.id}
                                    noteObj={skilnote}
                                    index={index + 1}
                                    data-order={skilNoteContent.order}
                                    pageNum={skilNoteContent.page}
                                    checkedRows={checkedRows}
                                    setCheckedRows={setCheckedRows}
                                    isEditMode={isEditMode}
                                    bookMarks={skilnote.bookMarks}
                                /> */}