import React from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { DevBattleResponse } from '@/types/typeForDevBattle';
import { apiForFindAllDevBattleList } from '@/api/apiForDevBattle';

const useApiForFindAllDevBattleList = (): UseQueryResult<DevBattleResponse[]> => {
    return useQuery<DevBattleResponse[]>({
        queryKey: ['devBattles'],
        queryFn: apiForFindAllDevBattleList,
    });
};

export default useApiForFindAllDevBattleList;
