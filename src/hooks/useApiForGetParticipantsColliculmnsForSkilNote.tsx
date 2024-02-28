import { apiForGetParticipantsColliculmnsForSkilNote } from '@/api/apiForTechNotes';
import { ResponseTypeForParticipantsDataForChildSkilNotesForTechNoteId } from '@/types/typeForTechNote';
import { useQuery } from '@tanstack/react-query';

interface Props {
    techNoteId: number;
    userId: number;
}

const useApiForGetParticipantsColliculmnsForSkilNote = ({ techNoteId, userId }: Props) => {

    const { isLoading, error, data } = useQuery<ResponseTypeForParticipantsDataForChildSkilNotesForTechNoteId>({
        queryKey: ['apiForGetParticipantsColliculmnsForSkilNote', techNoteId, userId],
        queryFn: apiForGetParticipantsColliculmnsForSkilNote,
    });

    return { isLoading, error, data };
};

export default useApiForGetParticipantsColliculmnsForSkilNote;
