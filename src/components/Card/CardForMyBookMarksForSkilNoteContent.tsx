import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { ITypeForMyBookMarksRow } from '@/types/typeForSkilNoteContents';

type Props = {
    bookmark: ITypeForMyBookMarksRow;
}

const CardForMyBookMarksForSkilNoteContent = ({ bookmark }: Props) => {
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.substring(0, currentUrl.indexOf('/Note/SkilNoteContents/'));

    const handleButtonClick = () => {
        const url = `${baseUrl}/Note/SkilNoteContents/${bookmark.skilNoteContent.skilNote.id}/${bookmark.skilNoteContent.page}`;
        window.open(url, '_blank');
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" p={4} mb={4} display={"flex"} justifyContent={"space-between"}>
            <Text fontWeight="bold">Title: {bookmark.skilNoteContent.title}</Text>
            <Button onClick={handleButtonClick}>{bookmark.skilNoteContent.skilNote.id}</Button>
        </Box>
    );
}

export default CardForMyBookMarksForSkilNoteContent;
