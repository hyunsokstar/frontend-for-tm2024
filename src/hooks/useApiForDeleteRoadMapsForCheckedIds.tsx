import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { apiForDeleteTechRoadMapsForCheckedIds } from '@/api/apiForRoadMap';

const useApiForDeleteRoadMapsForCheckedIds = (pageNum: number) => {
    const queryClient = useQueryClient();
    const toast = useToast(); // Chakra UI의 토스트를 사용합니다.

    const mutation = useMutation({
        mutationFn: apiForDeleteTechRoadMapsForCheckedIds,
        onSuccess: (result: any) => {
            console.log("Result:", result);

            // 기존의 기술로드맵 데이터를 다시 불러오는 쿼리를 업데이트합니다.
            queryClient.refetchQueries({
                queryKey: ['apiForGetAllRoadMapList', pageNum]
            });

            // 성공적인 삭제에 대한 토스트를 표시합니다.
            toast({
                title: "Delete Tech RoadMaps",
                description: result.message, // API에서 받은 메시지를 보여줍니다.
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        // 실패한 경우에 대한 처리는 생략했습니다. 실패에 대한 토스트나 기타 오류 처리를 추가할 수 있습니다.
    });

    return mutation;
};

export default useApiForDeleteRoadMapsForCheckedIds;
