import React from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getAllSubjects } from '@/api/apiForDevRelay';
import { SubjectForCategoryRow } from '@/types/typeForDevRelay';

const useApiForGetAllSubjects = (): UseQueryResult<SubjectForCategoryRow[]> => {
    return useQuery<SubjectForCategoryRow[]>({
        queryKey: ['getAllSubjectList'],
        queryFn: getAllSubjects
    });
};

export default useApiForGetAllSubjects;
