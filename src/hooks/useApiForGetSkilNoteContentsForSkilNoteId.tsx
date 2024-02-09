import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiForGetSkilNoteContentListForSkilNoteId } from '@/api/apiForSkilNote';
import { responseTypeForGetSkilNoteContents } from '@/types/typeForSkilNoteContents';

const useApiForGetSkilNoteContentsForSkilNoteId = (skilNoteId: any, pageNum: any) => {

    const { isLoading: isPending, error, data } =
        useQuery<responseTypeForGetSkilNoteContents>({
            queryKey: ['apiForGetSkilNoteContentListForSkilNoteId', skilNoteId, pageNum],
            queryFn: apiForGetSkilNoteContentListForSkilNoteId,
        });
    return { isPending, error, data };
};

export default useApiForGetSkilNoteContentsForSkilNoteId;
