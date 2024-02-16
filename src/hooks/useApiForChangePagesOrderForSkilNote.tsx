import React from 'react';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiForChangePagesOrderForSkilNoteContent } from '@/api/apiForSkilNote';


const useApiForChangePagesOrderForSkilNote = ({ skilNoteId, pageNum }: any) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForChangePagesOrderForSkilNote = useMutation({
        mutationFn: apiForChangePagesOrderForSkilNoteContent,
        onSuccess: (data) => {
            console.log("API 호출 성공: ", data);

            // 요청이 성공하면 새로고침을 통해 데이터를 업데이트합니다.
            queryClient.refetchQueries({
                queryKey: ['apiForGetSkilNoteContentListForSkilNoteId', skilNoteId, pageNum],
            });

            // 성공 메시지를 토스트로 보여줍니다.
            toast({
                title: "페이지 순서 변경 성공",
                description: "페이지 순서를 성공적으로 변경했습니다.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error) => {
            console.error("API 호출 에러: ", error);

            // 에러 메시지를 토스트로 보여줍니다.
            toast({
                title: "페이지 순서 변경 실패",
                description: "페이지 순서 변경 중 오류가 발생했습니다.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    // 커스텀 훅은 사용자에게 변이 객체를 반환합니다.
    return mutationForChangePagesOrderForSkilNote;
};

export default useApiForChangePagesOrderForSkilNote;
