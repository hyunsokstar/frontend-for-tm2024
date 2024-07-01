import { likeSkilNote } from '@/api/apiForTechNotes';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IProps {
    techNoteId?: number;
    pageNum: number;
    searchOption?: string;
    searchText?: string;
    isBestByLikes?: boolean;
    isBestByBookMarks?: boolean;
}

const useApiForLikeSkilNote = ({
    techNoteId,
    pageNum,
    searchOption,
    searchText,
    isBestByLikes,
    isBestByBookMarks
}: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForLikeSkilNote = useMutation({
        mutationFn: likeSkilNote,
        onSuccess: (result: any) => {
            console.log("result : ", result);
            if (techNoteId) {
                queryClient.invalidateQueries({
                    queryKey: [
                        'apiForGetSkillNotesByTechNoteId',
                        techNoteId,
                        pageNum,
                        searchOption,
                        searchText,
                        isBestByLikes,
                        isBestByBookMarks
                    ]
                });
            } else {
                queryClient.invalidateQueries({
                    queryKey: ['apiForGetAllSkilNoteList']
                });
            }
            toast({
                title: "skilnote like success",
                description: result.data.message,
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

    return mutationForLikeSkilNote;
};

export default useApiForLikeSkilNote;