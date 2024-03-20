import { apiForGetAllChallengesWithPageNum } from '@/api/apiForChallenge';
import { useQuery } from '@tanstack/react-query'; // 적절한 라이브러리를 사용하세요.

const useApiForGetAllChallengesWithPageNum = (pageNum: number) => {
    const { isLoading, error, data } =
        useQuery({
            queryKey: ['apiForGetAllChallengesWithPageNum', pageNum],
            queryFn: () => apiForGetAllChallengesWithPageNum(pageNum),
        });

    return { isLoading, error, data };
};

export default useApiForGetAllChallengesWithPageNum;
