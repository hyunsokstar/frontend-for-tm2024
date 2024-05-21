import { apiForCreateDevAssignment } from '@/api/apiForDevRelay';
import { CreateDevAssignmentDto } from '@/types/typeForDevRelay';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IProps {
    categoryId: number;
}

const useApiForCreateDevAssignment = ({ categoryId }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const useApiForCreateDevAssignment = useMutation({
        mutationFn: (createDevAssignmentDto: CreateDevAssignmentDto) =>
            apiForCreateDevAssignment(categoryId, createDevAssignmentDto),
        onSuccess: (data: any) => {
            queryClient.refetchQueries({
                queryKey: ['devAssignments', categoryId],
            });

            toast({
                title: "Dev assignment created successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.error("Error creating dev assignment: ", error);

            toast({
                title: "Error creating dev assignment",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return useApiForCreateDevAssignment;
};

export default useApiForCreateDevAssignment;
