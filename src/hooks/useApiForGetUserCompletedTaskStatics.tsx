
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { apiForGetUserCompletedTaskStatics } from '@/api/apiForTodos';
import { IResponseForUserCompletedTaskStatics } from '@/types/typeforTodos';

type UserCompletedTaskStaticsQueryKey = readonly ['userCompletedTaskStatics', number, string, string];

const useApiForGetUserCompletedTaskStatics = (
    userId: number,
    startDate: string,
    endDate: string
): UseQueryResult<IResponseForUserCompletedTaskStatics, Error> => {
    return useQuery<IResponseForUserCompletedTaskStatics, Error, IResponseForUserCompletedTaskStatics, UserCompletedTaskStaticsQueryKey>({
        queryKey: ['userCompletedTaskStatics', userId, startDate, endDate] as const,
        queryFn: apiForGetUserCompletedTaskStatics,
    });
};

export default useApiForGetUserCompletedTaskStatics;