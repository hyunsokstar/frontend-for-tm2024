import { apiForUpdateIsCompletedForTechNote } from '@/api/apiForTechNotes';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useApiForUpdateIsCompletedForTechNote = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForUpdateIsCompletedForTechNote = useMutation({
        mutationFn: apiForUpdateIsCompletedForTechNote,
        onSuccess: (result: any) => {
            console.log("result : ", result);

            // 여기서 성공적으로 업데이트된 경우의 동작을 정의합니다.
            // 예를 들어, 데이터를 다시 불러오는 등의 작업을 수행할 수 있습니다.

            toast({
                title: "Tech note updated successfully",
                description: result.message,
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.log("error : ", error);

            // 여기서 에러 발생 시 처리할 내용을 정의합니다.
            toast({
                title: error.response.data.error,
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForUpdateIsCompletedForTechNote;
};

export default useApiForUpdateIsCompletedForTechNote;
