import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ITypeForResponseDataForGetAllUsers, IUser } from '@/types/typeForUserBoard';
import { apiForGetAllUsers } from '../api/apiForUserBoard';

const useApiForGetAllUsersData = (pageNum: number) => {
    const [userList, setUserList] = useState<IUser[]>([]);
    const { isLoading: isPending, error, data: dataForUserBoard } =
        useQuery<ITypeForResponseDataForGetAllUsers>({
            queryKey: ['apiForGetAllUsers', pageNum],
            queryFn: apiForGetAllUsers,
        });

    useEffect(() => {
        if (dataForUserBoard) {
            setUserList(dataForUserBoard.users); // 이 부분은 데이터 형식에 맞게 변경해야 합니다.
        }
    }, [dataForUserBoard]);

    return { isPending, error, userList };
};

export default useApiForGetAllUsersData;
