import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios'; // axios 응답 타입을 추가해주세요.
import { apiForgetAllTodoBriefingsByTodoId } from '@/api/apiForTodos';

const useApiForGetAllTodoBriefingsForTodoId = (todoId: string) => {
    // const [todoBriefings, setTodoBriefings] = useState<any[]>([]);

    const { isLoading: isPending, error, data } =
        useQuery<AxiosResponse<any>>({
            queryKey: ['apiForgetAllTodoBriefingsByTodoId', todoId],
            queryFn: () => apiForgetAllTodoBriefingsByTodoId(todoId),
        });


    return { isPending, error, data };
};

export default useApiForGetAllTodoBriefingsForTodoId;
