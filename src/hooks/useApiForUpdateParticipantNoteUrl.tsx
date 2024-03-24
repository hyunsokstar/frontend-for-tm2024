import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import { apiForUpdateParticipantNoteUrl } from '@/api/apiForChallenge';

const useApiForUpdateParticipantNoteUrl = (subChallengeId: number) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const toast = useToast();


    const mutationForUpdateParticipantNoteUrl = useMutation({
        mutationFn: apiForUpdateParticipantNoteUrl,
        onSuccess: (result: any) => {
            console.log('Update participant note URL success:', result);

            toast({
                title: 'Note URL updated',
                description: result.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
            });

            // refe
            queryClient.refetchQueries({
                queryKey: ['apiForGetAllParticipantsListForSubchallenges', subChallengeId],
            });

        },
        onError: (error) => {
            console.error('Update participant note URL error:', error);
            toast({
                title: 'Error updating note URL',
                description: error.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForUpdateParticipantNoteUrl;
};

export default useApiForUpdateParticipantNoteUrl;