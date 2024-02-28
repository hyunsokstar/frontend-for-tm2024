import { apiForRegisterParticipantsForSkilNote } from '@/api/apiForSkilNote';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useApiForRegisterParticipantsForSkilNote = (techNoteId?: number) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForRegisterParticipantsForSkilNote = useMutation({
        mutationFn: apiForRegisterParticipantsForSkilNote, // 수정 필요한 부분
        onSuccess: (result: any) => {
            console.log("result : ", result);

            if (techNoteId) {
                queryClient.refetchQueries({
                    queryKey: ['apiForGetSkillNotesByTechNoteId', techNoteId, 1]
                });
            } else {
                queryClient.refetchQueries({
                    queryKey: ['apiForGetAllSkilNoteList', 1] // 예시 queryKey, 필요에 따라 수정하세요
                });
            }


            toast({
                title: "Participants registered successfully",
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

    return mutationForRegisterParticipantsForSkilNote;
};

export default useApiForRegisterParticipantsForSkilNote;
