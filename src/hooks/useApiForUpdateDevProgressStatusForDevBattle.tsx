import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { apiForUpdateDevProgressStatusForDevBattle } from '@/api/apiForDevBattle';


const useApiForUpdateDevProgressStatusForDevBattle = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation({
        mutationFn: ({ devProgressId, status }: { devProgressId: number, status: string }) =>
            apiForUpdateDevProgressStatusForDevBattle(devProgressId, status),
        onSuccess: (data: any) => {
            queryClient.refetchQueries({
                queryKey: ['apiForFindAllDevBattleList'],
            });

            toast({
                title: "Dev progress updated successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            // 에러 발생시 실행되는 코드
            console.error("Error updating dev progress: ", error);

            toast({
                title: "Error updating dev progress",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });
};

export default useApiForUpdateDevProgressStatusForDevBattle;
