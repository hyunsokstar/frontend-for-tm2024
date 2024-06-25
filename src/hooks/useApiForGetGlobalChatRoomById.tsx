import { apiForGetGlobalChatRoomById } from '@/api/apiForChatting';
import { GlobalChatRoomResponse } from '@/types/typeForChatting';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const useApiForGetGlobalChatRoomById = (id: string): UseQueryResult<GlobalChatRoomResponse> => {
    return useQuery<GlobalChatRoomResponse>({
        queryKey: ['globalChatRoom', id],
        queryFn: () => apiForGetGlobalChatRoomById(id),
    })
};

export default useApiForGetGlobalChatRoomById;
