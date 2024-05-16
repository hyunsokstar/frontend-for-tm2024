import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiForGetAllGroupedByCategory } from '@/api/apiForDevSpec'
import { GroupedDevSpecs } from '@/types/typeForDevSpec'

type Props = {}


const useApiForGetXXXX = () => {
    const { isLoading, error, data } = useQuery<GroupedDevSpecs>({
        queryKey: ['apiForGetXXXX'],
        queryFn: apiForGetAllGroupedByCategory
    })

    return { isLoading, error, data };
}

export default useApiForGetXXXX