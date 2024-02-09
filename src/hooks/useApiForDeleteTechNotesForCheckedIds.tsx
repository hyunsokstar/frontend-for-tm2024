import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { apiForDeleteTechNotesForCheckedIds } from '@/api/apiForTechNotes';

type Props = {}

const useApiForDeleteTechNotesForCheckedIds = () => {
    const queryClient = useQueryClient();
    const toast = useToast(); // useToast 훅 사용

    const mutation = useMutation({
        mutationFn: apiForDeleteTechNotesForCheckedIds,
        onSuccess: (result) => {
            console.log("result : ", result);

            // 사용자 데이터를 다시 불러오는 쿼리를 리프레시
            queryClient.refetchQueries({
                queryKey: ['apiForGetAllTechNoteList']
            });

            // Chakra UI 토스트 표시
            toast({
                title: "Delete User",
                description: result.message,
                status: "success",
                duration: 2000, // 토스트 메시지가 보여지는 시간 (2초)
                isClosable: true, // 닫기 버튼 표시
            });
        },
    });

    return mutation;
}

export default useApiForDeleteTechNotesForCheckedIds