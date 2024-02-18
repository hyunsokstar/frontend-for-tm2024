import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiForGetAllRoadMapList } from '@/api/apiForRoadMap';
import { ReponseTypeForGetAllRoadMapList } from '@/types/typeForRoadMap';

type IProps = {
    pageNum: number;
}

const useApiForGetAllRoadMapList = ({
    pageNum,
}: IProps) => {
    const { isLoading, error, data } = useQuery<ReponseTypeForGetAllRoadMapList>({
        queryKey: ['apiForGetAllRoadMapList', pageNum],
        queryFn: () => apiForGetAllRoadMapList(
            pageNum,
        ),
    });

    return { isLoading, error, data };
}

export default useApiForGetAllRoadMapList;
