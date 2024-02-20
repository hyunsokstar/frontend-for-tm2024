import { apiForSimpleCreateShortCut } from '@/api/apiForShortCuts'; // 임포트 경로를 적절히 수정해주세요.
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useApiForSimpleCreateShortCut = (pageNum: number) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForSimpleCreateShortCut = useMutation({
        mutationFn: apiForSimpleCreateShortCut,
        onSuccess: (data: any) => {
            // Shortcut created successfully

            queryClient.refetchQueries({
                queryKey: ['apiForGetAllShortCutList', pageNum], // 적절한 쿼리 키를 지정하세요.
            });

            toast({
                title: "Shortcut created successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.error("Error creating shortcut: ", error);

            toast({
                title: "Error creating shortcut",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForSimpleCreateShortCut;
};

export default useApiForSimpleCreateShortCut;
