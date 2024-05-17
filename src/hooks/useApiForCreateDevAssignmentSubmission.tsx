import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { createDevAssignmentSubmission } from '@/api/apiForDevRelay';

const useApiForCreateDevAssignmentSubmission = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const useApiForCreateDevAssignmentSubmission = useMutation({
        mutationFn: createDevAssignmentSubmission,
        onSuccess: (data: any) => {
            // Refetch the data for apiForGetFindAllDevRelays
            queryClient.refetchQueries({
                queryKey: ['apiForGetFindAllDevRelays'],
            });

            toast({
                title: "Dev Assignment Submission created successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.error("Error creating dev assignment submission: ", error);

            toast({
                title: "Error creating dev assignment submission",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return useApiForCreateDevAssignmentSubmission;
};

export default useApiForCreateDevAssignmentSubmission;
