import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { apiForGetAllGlobalChatRooms } from '@/api/apiForChatting';
import { ITypeForGetAllChatRooms } from '@/types/typeForChatting';

const useApiForGetAllChatRooms = (): UseQueryResult<ITypeForGetAllChatRooms, Error> => {
    return useQuery<ITypeForGetAllChatRooms, Error>({
        queryKey: ['globalChatRooms'],
        queryFn: apiForGetAllGlobalChatRooms,
    });
};

export default useApiForGetAllChatRooms;
