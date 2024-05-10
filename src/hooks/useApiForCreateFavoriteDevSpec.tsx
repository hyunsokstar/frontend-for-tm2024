import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFavoriteDevSpec } from '@/api/apiForFavoriteDevSpec';
import { FavoriteDevSpecRow } from '@/types/typeForFavoriteDevSpec';

interface IProps {
    // 필요한 경우 Props 추가
}


const useApiForCreateFavoriteDevSpec = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForCreateFavoriteDevSpec = useMutation({
        mutationFn: createFavoriteDevSpec,
        onSuccess: (data: FavoriteDevSpecRow) => {
            // 성공 시 실행할 동작

            toast({
                title: "Favorite Dev Spec created successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });

            queryClient.refetchQueries({
                queryKey: ['getAllFavoriteDevSpecs'],
            });

        },
        onError: (error: any) => {
            // 실패 시 실행할 동작
            console.error("Error creating Favorite Dev Spec: ", error);
            toast({
                title: "Error creating Favorite Dev Spec",
                description: error.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForCreateFavoriteDevSpec;
};


export default useApiForCreateFavoriteDevSpec;
