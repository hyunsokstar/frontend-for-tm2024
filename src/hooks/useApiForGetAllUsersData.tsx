import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ITypeForResponseDataForGetAllUsers, IUser } from '@/types/typeForUserBoard';
import { apiForGetAllUsers } from '../api/apiForUserBoard';

const useApiForGetAllUsersData = (pageNum: number) => {
    const [userRows, setUserRows] = useState<IUser[]>([]);
    const { isLoading: isPending, error, data: dataForUserBoard } =
        useQuery<ITypeForResponseDataForGetAllUsers>({
            queryKey: ['apiForGetAllUsers', pageNum],
            queryFn: apiForGetAllUsers,
        });

    // 데이터 로딩이 완료되면 userRows 업데이트
    useEffect(() => {
        if (dataForUserBoard) {
            setUserRows(dataForUserBoard.users); // 이 부분은 데이터 형식에 맞게 변경해야 합니다.
        }
    }, [dataForUserBoard]);

    return { isPending, error, userRows };
};

export default useApiForGetAllUsersData;
