import { responseTypeForGetSkilNoteContents } from '@/types/typeForSkilNoteContents'
import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router'; // Next.js에서 제공하는 useRouter를 import

type Props = {
    dataForskilNoteContent?: responseTypeForGetSkilNoteContents
    skilNoteId: number;
}

const NavigatorForSkilNotePages = ({ skilNoteId, dataForskilNoteContent }: Props) => {
    const router = useRouter(); // useRouter를 초기화

    // button 클릭하면 http://127.0.0.1:8080/skilnotes/{skilnoteId}/contents/{note.page} 요청
    const handleButtonClick = (page: any) => {
        router.push(`/Note/SkilNoteContents/${skilNoteId}/${page}`); // 해당 페이지로 이동
    }

    return (
        <>
            {dataForskilNoteContent?.skilnoteContentsPagesInfo.map((note, index) => {
                if (note.file === ".todo") {
                    return (
                        <Box display={"flex"} gap={2} alignItems={"center"} mt={1} key={index}>
                            <Button variant={"outline"} onClick={() => handleButtonClick(note.page)}>
                                {index + 1}
                            </Button>
                            <Text>
                                {note.title}
                            </Text>
                        </Box>
                    )
                } else {
                    return null; // else 조건에서는 반드시 무언가를 반환하도록 수정
                }
            })}
        </>
    )
}

export default NavigatorForSkilNotePages
