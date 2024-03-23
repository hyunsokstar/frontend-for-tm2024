import { apiForGetAllParticipantsListForSubchallenges } from '@/api/apiForChallenge';
import { ITypeForChallengersRow, ResponseTypeForGetAllParticipantsForSubChallenges, responseTypeForGetAllChallengeList } from '@/types/typeforChallenges';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios'; // AxiosResponse 임포트

const useApiForGetAllParticipantsListForSubchallenges = (subChallengeId: number) => {
    const { isLoading, error, data } = useQuery<AxiosResponse<ResponseTypeForGetAllParticipantsForSubChallenges>>({
        queryKey: ['apiForGetAllParticipantsListForSubchallenges', subChallengeId],
        queryFn: () => apiForGetAllParticipantsListForSubchallenges(subChallengeId),
    });

    console.log("data ??? ", data);


    // 데이터 추출 후 반환
    return { isLoading, error, data };
};

export default useApiForGetAllParticipantsListForSubchallenges;
