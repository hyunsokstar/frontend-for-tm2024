import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
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