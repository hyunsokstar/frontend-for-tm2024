import { apiForCreateNextPageForSkilnoteContent } from '@/api/apiForSkilNote';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';


const useApiForCreateNextPageForSkilnoteContent = (skilNoteId: number, pageNum: number) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForCreateNextPageForSkilnoteContent = useMutation<any, any, any, any>({
        mutationFn: apiForCreateNextPageForSkilnoteContent,
        onSuccess: (result: any) => {
            // 요청이 성공하면 실행되는 로직
            console.log('새로운 페이지가 성공적으로 생성되었습니다.');
            // 원하는 경우 추가로 작업을 수행할 수 있습니다.

            // 예시: refetch query를 통해 skilNoteContentList를 업데이트합니다.

            queryClient.refetchQueries({
                queryKey: ['apiForGetSkilNoteContentListForSkilNoteId', skilNoteId, pageNum] // Example queryKey, modify as needed
            });

            // queryClient.refetchQueries(['skilNoteContentList', skilNoteId, pageNum]);

            // 토스트 메시지를 표시합니다.
            toast({
                title: '새로운 페이지가 성공적으로 생성되었습니다.',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            // 요청이 실패하면 실행되는 로직
            console.error('새로운 페이지 생성 중 오류가 발생했습니다.', error);
            // 오류를 표시할 수 있습니다.

            // 토스트 메시지를 표시합니다.
            toast({
                title: '새로운 페이지 생성 중 오류가 발생했습니다.',
                description: error.message || '알 수 없는 오류가 발생했습니다.',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForCreateNextPageForSkilnoteContent;
};

export default useApiForCreateNextPageForSkilnoteContent;
