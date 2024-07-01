import { bookMarkSkilNote } from '@/api/apiForTechNotes';
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

const useApiForBookMarkSkilNote = ({
    techNoteId,
    pageNum,
    searchOption,
    searchText,
    isBestByLikes,
    isBestByBookMarks
}: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForBookMarkSkilNote = useMutation({
        mutationFn: bookMarkSkilNote,
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
                title: "Bookmark added successfully",
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

    return mutationForBookMarkSkilNote;
};

export default useApiForBookMarkSkilNote;