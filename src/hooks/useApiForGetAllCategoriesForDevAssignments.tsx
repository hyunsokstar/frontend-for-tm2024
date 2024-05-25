// src/hooks/useApiForGetAllCategoriesForDevAssignments.ts
import { useQuery } from "@tanstack/react-query";
import { getAllCategoriesForSubject } from "@/api/apiForDevRelay";
import { AssignmentCategory } from "@/types/typeForDevRelay";

const useApiForGetAllCategoriesForDevAssignments = (subjectId?: number) => {
    const { isLoading, error, data } = useQuery<AssignmentCategory[]>({
        queryKey: ['apiForGetAllCategoriesForDevAssignments', subjectId], // 쿼리 키 설정
        queryFn: () => getAllCategoriesForSubject(subjectId), // getAllCategoriesForSubject 함수 호출
    });

    return { isLoading, error, data };
};

export default useApiForGetAllCategoriesForDevAssignments;
