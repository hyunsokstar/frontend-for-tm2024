import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { apiForDeleteDevAssignmentById } from '@/api/apiForDevRelay';

const useApiForDeleteDevAssignmentById = (categoryId: number) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForDeleteDevAssignmentById = useMutation({
        mutationFn: apiForDeleteDevAssignmentById,
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: ['devAssignments', categoryId],
            });

            toast({
                title: "Assignment deleted successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.error("Error deleting assignment: ", error);
            toast({
                title: "Error deleting assignment",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForDeleteDevAssignmentById;
};

export default useApiForDeleteDevAssignmentById;
