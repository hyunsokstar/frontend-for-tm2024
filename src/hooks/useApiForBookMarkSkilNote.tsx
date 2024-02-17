import { bookMarkSkilNote, bookMarkTechNote } from '@/api/apiForTechNotes';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IProps {
    techNoteId?: number,
    pageNum: number
}

const useApiForBookMarkSkilNote = ({ techNoteId, pageNum }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForLikeTechNote = useMutation({
        mutationFn: bookMarkSkilNote,
        onSuccess: (result: any) => {
            console.log("result : ", result);

            if (techNoteId) {
                queryClient.refetchQueries({
                    queryKey: ['apiForGetSkillNotesByTechNoteId', techNoteId, pageNum]
                });
            } else {
                queryClient.refetchQueries({
                    queryKey: ['apiForGetAllSkilNoteList']
                });
            }

            toast({
                title: "bookmark liked successfully",
                description: result.message,
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.log("error : ", error);

            toast({
                title: error.response.data.error,
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForLikeTechNote;
};

export default useApiForBookMarkSkilNote;
