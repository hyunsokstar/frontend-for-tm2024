import { responseTypeForGetSkilNoteContents } from '@/types/typeForSkilNoteContents'
import { Box, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import CardForSkilNoteContent from '../Card/CardForSkilNoteContent'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import CardForMyBookMarksForSkilNoteContent from '../Card/CardForMyBookMarksForSkilNoteContent'

type Props = {
    dataForskilNoteContent?: responseTypeForGetSkilNoteContents
    skilNoteId: any
}

const BookMarksForInfoForSkilNoteContents = ({ dataForskilNoteContent }: Props) => {
    // const [checkedRows, setCheckedRows] = useState<number[]>([]);
    // const [isEditMode, setIsEditMode] = useState(false);
    const loginUser = useSelector((state: RootState) => state.user.loginUser);

    console.log("dataForskilNoteContent ??:", dataForskilNoteContent);

    return (
        <>
            {dataForskilNoteContent ? dataForskilNoteContent.myBookMarks.map((bookmark) => {
                return <Box>
                    <CardForMyBookMarksForSkilNoteContent key={bookmark.id} bookmark={bookmark} />
                </Box>
            }) : ""}
        </>
    )
}

export default BookMarksForInfoForSkilNoteContents

