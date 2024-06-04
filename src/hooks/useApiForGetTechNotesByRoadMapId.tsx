import { useQuery } from '@tanstack/react-query';
import { apiForGetTechNotesByRoadMapId } from '@/api/apiForTechNotes';
import { TechNote } from '@/types/typeForTechNote';

interface ResponseDataTypeForGetTechNotesByRoadMapId {
    techNoteList: TechNote[];
    totalCount: number;
    perPage: number;
}

const useApiForGetTechNotesByRoadMapId = (
    roadMapId: number,
    pageNum: number = 1,
    searchOption: string = "",
    searchText: string = "",
    isBestByLikes: boolean = false,
    isBestByBookMarks: boolean = false
) => {
    const { isLoading, error, data } = useQuery<ResponseDataTypeForGetTechNotesByRoadMapId>({
        queryKey: [
            'apiForGetTechNotesByRoadMapId',
            roadMapId,
            pageNum,
            searchOption,
            searchText,
            isBestByLikes,
            isBestByBookMarks
        ],
        queryFn: async () => {
            const response = await apiForGetTechNotesByRoadMapId(
                roadMapId,
                pageNum,
                searchOption,
                searchText,
                isBestByLikes,
                isBestByBookMarks
            );
            return response.data;
        },
    });

    return { isLoading, error, data };
};

export default useApiForGetTechNotesByRoadMapId;
