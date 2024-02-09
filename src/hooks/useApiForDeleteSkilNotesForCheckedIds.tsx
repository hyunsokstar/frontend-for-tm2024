import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { apiForDeleteSkilNotesForCheckedIds } from '@/api/apiForSkilNote';

type Props = {}

const useApiForDeleteSkilNotesForCheckedIds = (techNoteId: any, pageNum: any) => {
    const queryClient = useQueryClient();
    const toast = useToast(); // useToast 훅 사용

    const mutation = useMutation({
        mutationFn: apiForDeleteSkilNotesForCheckedIds,
        onSuccess: (result) => {
            console.log("result : ", result);

            // 사용자 데이터를 다시 불러오는 쿼리를 리프레시
            queryClient.refetchQueries({
                queryKey: ['apiForGetSkillNotesByTechNoteId', techNoteId, pageNum]
            });

            // Chakra UI 토스트 표시
            toast({
                title: "Delete skilnote Success",
                description: result.message,
                status: "success",
                duration: 2000, // 토스트 메시지가 보여지는 시간 (2초)
                isClosable: true, // 닫기 버튼 표시
            });
        },
    });

    return mutation;
}

export default useApiForDeleteSkilNotesForCheckedIds