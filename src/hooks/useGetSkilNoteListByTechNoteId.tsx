import { apiForGetSkillNotesByTechNoteId } from '@/api/apiForSkilNote';
import { SkillNoteListResponse } from '@/types/typeForSkilNote';
import { Box } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query';
import React from 'react'


type IProps = {
    techNoteId: any;
    pageNum: number;
    searchOption?: string;
    searchText?: string;
    isBestByLikes?: boolean,
    isBestByBookMarks?: boolean
}

const useApiForGetSkilNoteListByTechNoteId = ({
    techNoteId,
    pageNum,
    searchOption,
    searchText,
    isBestByLikes,
    isBestByBookMarks
}: IProps) => {

    // console.log(isBestByLikes);
    // console.log(isBestByBookMarks);

    const { isLoading, error, data } = useQuery<SkillNoteListResponse>({
        queryKey: ['apiForGetSkillNotesByTechNoteId', techNoteId, pageNum, searchOption, searchText, isBestByLikes, isBestByBookMarks],
        queryFn: () => apiForGetSkillNotesByTechNoteId(
            techNoteId,
            pageNum,
            searchOption,
            searchText,
            isBestByLikes,
            isBestByBookMarks
        ),
    });

    return { isLoading, error, data }
}

export default useApiForGetSkilNoteListByTechNoteId