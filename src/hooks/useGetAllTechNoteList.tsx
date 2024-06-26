import React from 'react'
import { apiForGetAllTechNoteList } from '@/api/apiForTechNotes'
import { useQuery } from '@tanstack/react-query'
import { ResponseDataTypeForGetAllTechNoteList } from '@/types/typeForTechNote'

type Props = {}

const useGetAllTechNoteList = (
    pageNum: number,
    searchOption?: string,
    searchText?: string,
    isBestByLikes?: boolean,
    isBestByBookMarks?: boolean
) => {
    const { isLoading, error, data } = useQuery<ResponseDataTypeForGetAllTechNoteList>({
        // queryKey: ['apiForGetAllTechNoteList', pageNum, searchOption, searchText, isBestByLikes, isBestByBookMarks],
        queryKey: ['apiForGetAllTechNoteList'],
        queryFn: apiForGetAllTechNoteList
    })

    return { isLoading, error, data };
}

export default useGetAllTechNoteList