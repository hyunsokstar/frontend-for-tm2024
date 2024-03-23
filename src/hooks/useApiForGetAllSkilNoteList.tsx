import React from 'react'
import { apiForGetAllSkilNoteList, apiForGetSkillNotesByTechNoteId } from '@/api/apiForSkilNote';
import { SkillNoteListResponse } from '@/types/typeForSkilNote';
import { useQuery } from '@tanstack/react-query';


type IProps = {
    pageNum: number;
    searchOption?: string;
    searchText?: string;
    isBestByLikes?: boolean,
    isBestByBookMarks?: boolean
}

const useApiForGetAllSkilNoteList = ({
    pageNum,
    searchOption,
    searchText,
    isBestByLikes,
    isBestByBookMarks
}: IProps) => {

    const { isLoading, error, data } = useQuery<SkillNoteListResponse>({
        queryKey: ['apiForGetAllSkilNoteList', pageNum, searchOption, searchText, , isBestByLikes, isBestByBookMarks],
        queryFn: () => apiForGetAllSkilNoteList(
            pageNum,
            searchOption,
            searchText,
            isBestByLikes,
            isBestByBookMarks
        ),
    });

    return { isLoading, error, data }
}

export default useApiForGetAllSkilNoteList