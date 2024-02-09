import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiForGetAllUserEmails, apiForGetAllUsers } from '@/api/apiForUserBoard';

const useApiForGetAllUserEmailsData = () => {
    const [userEmails, setUserEmails] = useState<string[]>([]);
    const { isLoading: isPending, error, data: dataForEmails } =
        useQuery<string[]>({
            queryKey: ['apiForGetAllUserEmails'],
            queryFn: apiForGetAllUserEmails,
        });

    // 데이터 로딩이 완료되면 userEmails 업데이트
    useEffect(() => {
        if (dataForEmails) {
            setUserEmails(dataForEmails);
        }
    }, [dataForEmails]);

    return { isPending, error, userEmails };
};

export default useApiForGetAllUserEmailsData;
