import { useQuery } from "@tanstack/react-query";
import { findAllDevAssingments } from "@/api/apiForDevRelay";
import { AssignmentCategory, DevAssignmentRow } from "@/types/typeForDevRelay";

const useApiForFindAllDevAssignments = (selectedCategory: AssignmentCategory | null) => {
    const { isLoading, error, data } = useQuery<DevAssignmentRow[]>({
        queryKey: ['apiForGetFindAllDevAssingments', selectedCategory], // 선택된 카테고리를 쿼리 키에 추가
        queryFn: () => findAllDevAssingments(selectedCategory) // 선택된 카테고리를 인자로 전달하여 호출
    });

    return { isLoading, error, data };
};

export default useApiForFindAllDevAssignments;