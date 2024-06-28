import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { apiForGetUserCompletedTodoList } from '@/api/apiForTodos';
import { IResponseForUserCompletedTodoList } from '@/types/typeforTodos';

type UserCompletedTodoQueryKey = readonly ['userCompletedTodos', number, number, number];

const useApiForGetUserCompletedTodoList = (
    userId: number,
    pageNum: number = 1,
    perPage: number = 20
): UseQueryResult<IResponseForUserCompletedTodoList, Error> => {
    return useQuery<IResponseForUserCompletedTodoList, Error, IResponseForUserCompletedTodoList, UserCompletedTodoQueryKey>({
        queryKey: ['userCompletedTodos', userId, pageNum, perPage] as const,
        queryFn: apiForGetUserCompletedTodoList,
    });
};

export default useApiForGetUserCompletedTodoList;