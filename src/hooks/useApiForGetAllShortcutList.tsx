import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiForGetAllShortCutList } from '@/api/apiForShortCuts';
import { ITypeForResponseForGetAllShortCutList } from '@/types/typeForShortCut';

type IProps = {
    pageNum: number;
}

const useApiForGetAllShortcutList = ({
    pageNum,
}: IProps) => {
    const { isLoading, error, data } = useQuery<ITypeForResponseForGetAllShortCutList>({
        queryKey: ['apiForGetAllShortCutList', pageNum],
        queryFn: apiForGetAllShortCutList,
    });

    return { isLoading, error, data };
}

export default useApiForGetAllShortcutList;
