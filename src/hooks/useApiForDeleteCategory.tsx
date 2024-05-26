import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { apiForDeleteCategory } from '@/api/apiForDevRelay';

interface IProps {
    subjectId: number;
}

const useApiForDeleteCategory = ({ subjectId }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: apiForDeleteCategory,
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: ['apiForGetAllCategoriesForDevAssignments', subjectId],
            });

            toast({
                title: "Category deleted successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.error("Error deleting category: ", error);
            toast({
                title: "Error deleting category",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutation;
};

export default useApiForDeleteCategory;
