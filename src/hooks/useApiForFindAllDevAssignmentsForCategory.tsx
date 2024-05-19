import { useQuery } from "@tanstack/react-query";
import { getDevAssignmentsByCategory } from "@/api/apiForDevRelay";
import { DevAssignmentRow } from "@/types/typeForDevRelay";

const useApiForFindAllDevAssignmentsForCategory = (categoryId: number) => {
    const { isLoading, error, data } = useQuery<DevAssignmentRow[]>({
        queryKey: ['apiForFindAllDevAssignments', categoryId], // 쿼리 키에 카테고리 ID를 추가
        queryFn: () => getDevAssignmentsByCategory(categoryId) // 카테고리 ID를 인자로 전달하여 요청 보냄
    });

    return { isLoading, error, data };
};

export default useApiForFindAllDevAssignmentsForCategory;
