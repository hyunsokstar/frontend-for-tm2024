import React from 'react';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiForCreateSkilNoteContent, apiForUpdateSkilNoteContentsOrder } from '@/api/apiForSkilNote';

const useApiForUpdateOrderForSkilNoteContents = (skilNoteId: any, pageNum: number) => {
    // console.log("skinoteId :::::", skilNoteId);
    // console.log("pageNum :::::", pageNum);

    const queryClient = useQueryClient();
    const toast = useToast(); // useToast 훅 사용

    const mutationForCreateSkilNoteContent = useMutation({
        mutationFn: apiForUpdateSkilNoteContentsOrder,
        onSuccess: (result: any) => {
            console.log("result : ", result);

            queryClient.refetchQueries({
                queryKey: ['apiForGetSkilNoteContentListForSkilNoteId', skilNoteId, pageNum]
            });

            console.log("result : ", result);

            // alert("success")
            toast({
                title: "update skil note content order success",
                description: result.message,
                status: "success",
                duration: 2000, // 토스트 메시지가 보여지는 시간 (2초)
                isClosable: true, // 닫기 버튼 표시
            });
        },
        onError: (error: any) => {
            console.log("error : ", error);

            toast({
                title: error.response.data.error,
                description: error.response.data.message,
                status: "error",
                duration: 2000, // 토스트 메시지가 보여지는 시간 (2초)
                isClosable: true, // 닫기 버튼 표시
            });

        },
    });

    return mutationForCreateSkilNoteContent;
};

export default useApiForUpdateOrderForSkilNoteContents