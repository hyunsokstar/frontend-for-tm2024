import { useEffect } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiForGetAllMySkilNoteList } from '@/api/apiForSkilNote';
import { ITypeForSkilNoteListRowForSelectNoteForChallenges, ITypeForResponseTypeForGetAllMySkilNoteListForSelectNoteForChallenge } from '@/types/typeForSkilNote';

type IProps = {
    pageNum: number;
}

const useApiForGetAllMySkilNoteList = ({ pageNum }: IProps) => {
    const queryOptions: UseQueryOptions<ITypeForResponseTypeForGetAllMySkilNoteListForSelectNoteForChallenge, Error> = {
        queryKey: ['mySkillNotes', pageNum],
        queryFn: async () => {
            const response = await apiForGetAllMySkilNoteList(pageNum);
            console.log("response at use api for all my skil note list ", response);
            return response;
        },
    };

    const { isLoading, error, data } = useQuery<ITypeForResponseTypeForGetAllMySkilNoteListForSelectNoteForChallenge, Error>(queryOptions);

    useEffect(() => {
        console.log("data 111111122222222 ", data);
    }, [data]);

    return { isLoading, error, data };
};

export default useApiForGetAllMySkilNoteList;
