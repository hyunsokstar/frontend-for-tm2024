import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/api/apiForDevRelay";
import { AssignmentCategory } from "@/types/typeForDevRelay";

const useApiForGetAllCategoriesForDevAssignments = () => {
    const { isLoading, error, data } = useQuery<AssignmentCategory[]>({
        queryKey: ['apiForGetAllCategoriesForDevAssignments'], // 쿼리 키 설정
        queryFn: getAllCategories // getAllCategories 함수 호출
    });

    return { isLoading, error, data };
};

export default useApiForGetAllCategoriesForDevAssignments;
