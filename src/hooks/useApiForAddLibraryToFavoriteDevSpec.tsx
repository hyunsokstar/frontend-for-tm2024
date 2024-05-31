import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { addLibraryToFavoriteDevSpec } from '@/api/apiForFavoriteDevSpec';

interface IProps {
    favoriteDevSpecId: number; // Assuming the type
}

const useApiForAddLibraryToFavoriteDevSpec = ({ favoriteDevSpecId }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation({
        mutationFn: addLibraryToFavoriteDevSpec,
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ['favoriteDevSpecs'] }); // Assuming the query key

            toast({
                title: "Library added successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.error("Error adding library: ", error);

            toast({
                title: "Error adding library",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });
};

export default useApiForAddLibraryToFavoriteDevSpec;