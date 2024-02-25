import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ITypeForStarterKitRow, ResponseTypeForStarterKitList } from '@/types/typeForStarterKit';
import { apiForGetAllStarterKitList } from '@/api/apiForStaraterKits';

type IProps = {
    pageNum: number;
}

const useApiForGetAllStarterKitsData = ({
    pageNum,
}: IProps) => {

    const { isLoading, error, data } =
        useQuery<ResponseTypeForStarterKitList>({
            queryKey: ['apiForGetAllStarterKits', pageNum],
            queryFn: () => apiForGetAllStarterKitList(
                pageNum,
            ),
        });

    return { isLoading, error, data };
};

export default useApiForGetAllStarterKitsData;
