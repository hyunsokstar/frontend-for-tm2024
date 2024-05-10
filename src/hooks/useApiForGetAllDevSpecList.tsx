import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiForGetAllGroupedByCategory } from '@/api/apiForDevSpec'
import { GroupedDevSpecs } from '@/types/typeForDevSpec'

type Props = {}

const useApiForGetAllDevSpecList = () => {
    const { isLoading, error, data } = useQuery<GroupedDevSpecs>({
        queryKey: ['apiForGetAllGroupedByCategory'],
        queryFn: apiForGetAllGroupedByCategory
    })

    return { isLoading, error, data };
}

export default useApiForGetAllDevSpecList