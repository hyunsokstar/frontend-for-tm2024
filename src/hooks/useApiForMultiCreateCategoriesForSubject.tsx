// src/hooks/useApiForMultiCreateCategoriesForSubject.ts
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateCategoriesForDevAssignmentDto } from '@/types/typeForDevRelay';
import { apiForMultiCreateCategoriesForSubject } from '@/api/apiForDevRelay';

const useApiForMultiCreateCategoriesForSubject = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: apiForMultiCreateCategoriesForSubject,
        onSuccess: (data: any) => {
            queryClient.refetchQueries({
                queryKey: ['apiForGetAllCategoriesForDevAssignments'],
            });

            toast({
                title: `${data.data.message}`,
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.error("Error creating categories: ", error);

            toast({
                title: "Error creating categories",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    const createCategories = (subjectId: number, data: CreateCategoriesForDevAssignmentDto) => {
        mutation.mutate({ subjectId, data });
    };

    return {
        createCategories,
        isLoading: mutation.isLoading,
        error: mutation.error,
    };
};

export default useApiForMultiCreateCategoriesForSubject;
