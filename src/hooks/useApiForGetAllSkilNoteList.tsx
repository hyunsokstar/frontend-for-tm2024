import React from 'react'
import { apiForGetAllSkilNoteList, apiForGetSkillNotesByTechNoteId } from '@/api/apiForSkilNote';
import { SkillNoteListResponse } from '@/types/typeForSkilNote';
import { useQuery } from '@tanstack/react-query';
import { Box } from '@chakra-ui/react'


type IProps = {
    pageNum: number;
}

const useApiForGetAllSkilNoteList = ({
    pageNum,
}: IProps) => {

    const { isLoading, error, data } = useQuery<SkillNoteListResponse>({
        queryKey: ['apiForGetAllSkilNoteList'],
        queryFn: () => apiForGetAllSkilNoteList(
            pageNum,
        ),
    });

    return { isLoading, error, data }
}

export default useApiForGetAllSkilNoteList