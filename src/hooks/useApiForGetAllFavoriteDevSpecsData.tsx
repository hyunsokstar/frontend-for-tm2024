import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllFavoriteDevSpecs } from '@/api/apiForFavoriteDevSpec';
import { FavoriteDevSpecRow } from '@/types/typeForFavoriteDevSpec';


const useApiForGetAllFavoriteDevSpecsData = () => {
    const { isLoading, error, data } =
        useQuery<FavoriteDevSpecRow[]>({
            queryKey: ['getAllFavoriteDevSpecs'],
            queryFn: getAllFavoriteDevSpecs,
        });

    return { isLoading, error, data };
};

export default useApiForGetAllFavoriteDevSpecsData;
