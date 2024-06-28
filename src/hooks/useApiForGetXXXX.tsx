import React from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { findDevAssignmentsByCategory } from '@/api/apiForDevRelay';
import { DevAssignmentRow } from '@/types/typeForDevRelay';

type Props = {};

const useApiForXXXXX = (categoryId: number): UseQueryResult<DevAssignmentRow[]> => {
    return useQuery<DevAssignmentRow[]>({
        queryKey: ['devAssignments', categoryId],
        queryFn: () => findDevAssignmentsByCategory(categoryId),
    });
};

export default useApiForXXXXX;  