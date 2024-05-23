import { updateCategoryForDevAssignment } from '@/api/apiForDevRelay';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IProps { }

const useApiForUpdateCategoryForDevAssignment = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: updateCategoryForDevAssignment,
        onSuccess: (data: any) => {
            queryClient.refetchQueries({
                queryKey: ['apiForGetAllCategoriesForDevAssignments'],
            });
            toast({
                title: "카테고리가 성공적으로 업데이트되었습니다.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.error("Error updating category: ", error);
            toast({
                title: "카테고리 업데이트 오류",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutation;
};

export default useApiForUpdateCategoryForDevAssignment;
