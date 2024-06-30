// src/hooks/useApiForGetUserChatRoomInfo.ts
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { apiForGetUserChatRoomInfo } from '@/api/apiForChatting';
import { UserChatRoomResponse } from '@/types/typeForChatting';

const useApiForGetUserChatRoomInfo = (userId: string | number): UseQueryResult<UserChatRoomResponse> => {
    return useQuery<UserChatRoomResponse>({
        queryKey: ['userChatRooms', userId],
        queryFn: async () => {
            const response = await apiForGetUserChatRoomInfo(userId);
            return response.data;
        },
        enabled: !!userId, // userId가 있을 때만 쿼리 실행
    });
};

export default useApiForGetUserChatRoomInfo;