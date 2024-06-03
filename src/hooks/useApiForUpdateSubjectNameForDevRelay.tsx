import { apiForUpdateSubjectName } from '@/api/apiForDevRelay';
import { SubjectResponse } from '@/types/typeForDevRelay';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useApiForUpdateSubjectNameForDevRelay = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: apiForUpdateSubjectName,
        onSuccess: (data: SubjectResponse) => {
            queryClient.refetchQueries({
                queryKey: ['getAllSubjectList'], // Make sure to use the correct query key
            });
            toast({
                title: "주제가 성공적으로 업데이트되었습니다.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.error("Error updating subject: ", error);
            toast({
                title: "주제 업데이트 오류",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutation;
};

export default useApiForUpdateSubjectNameForDevRelay;


