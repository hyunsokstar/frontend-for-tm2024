import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { apiForDeleteSubject } from '@/api/apiForDevRelay';

const useApiForDeleteSubjectForDelay = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: apiForDeleteSubject,
        onSuccess: () => {

            queryClient.refetchQueries({
                queryKey: ['getAllSubjectList'],
            });

            toast({
                title: "Subject deleted successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.error("Error deleting subject: ", error);
            toast({
                title: "Error deleting subject",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutation;
};

export default useApiForDeleteSubjectForDelay;