import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; // 적절한 라이브러리를 사용하세요.
import { AxiosResponse } from 'axios'; // 적절한 타입을 사용하세요.
import { apiForGetUsersPaymentHistory } from '@/api/apiForUserBoard';

const useApiForGetUsersPaymentHistory = () => {
    const { isLoading, error, data } =
        useQuery({
            queryKey: ['apiForGetUsersPaymentHistory'],
            queryFn: apiForGetUsersPaymentHistory,
        });

    return { isLoading, error, data };
};

export default useApiForGetUsersPaymentHistory;