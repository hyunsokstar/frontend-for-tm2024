import { AxiosResponse } from "axios";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForSaveRoadMaps } from "@/api/apiForRoadMap";

const useApiForSaveRoadMaps = (pageNum: number) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForSaveRoadMaps = useMutation({
        mutationFn: apiForSaveRoadMaps,
        onSuccess: (result: any) => {
            // 성공 시 수행할 작업
            console.log("Result:", result);

            // 여기서는 토스트 메시지를 띄우고 새로고침을 수행하는 예시입니다.
            toast({
                title: "Roadmap saved successfully",
                description: result.message,
                status: "success",
                duration: 2000,
                isClosable: true,
            });

            // 새로운 데이터를 불러오기 위해 쿼리를 다시 불러옵니다.
            queryClient.refetchQueries({
                queryKey: ['apiForGetAllRoadMapList', pageNum]
            });
        },
        onError: (error: any) => {
            // 에러 발생 시 수행할 작업
            console.error("Error occurred while saving roadmaps:", error);

            // 에러 메시지를 토스트로 보여줍니다.
            toast({
                title: "Error occurred while saving roadmaps",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForSaveRoadMaps;
};


export default useApiForSaveRoadMaps;
