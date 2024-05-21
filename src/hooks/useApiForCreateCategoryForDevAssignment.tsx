import { apiForCreateCategory } from '@/api/apiForDevRelay';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useApiForCreateCategoryForDevAssignment = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const useApiForCreateCategoryForDevAssignment = useMutation({
        mutationFn: apiForCreateCategory,
        onSuccess: (data: any) => {
            queryClient.refetchQueries({
                queryKey: ['apiForGetAllCategoriesForDevAssignments'],
            });

            toast({
                title: "Category created successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.error("Error creating category: ", error);

            toast({
                title: "Error creating category",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return useApiForCreateCategoryForDevAssignment;
};

export default useApiForCreateCategoryForDevAssignment;
