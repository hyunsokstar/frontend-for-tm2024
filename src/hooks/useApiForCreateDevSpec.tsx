import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { CreateDevSpecDto } from '@/types/typeForDevSpec';
import { createDevSpec } from '@/api/apiForDevSpec';

interface IProps {
    // your props if any
}

const useApiForCreateDevSpec = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const useApiForCreateDevSpec = useMutation({
        mutationFn: (createDevSpecDto: CreateDevSpecDto) => createDevSpec(createDevSpecDto),
        onSuccess: (data: any) => {
            queryClient.refetchQueries({
                queryKey: ['apiForGetAllGroupedByCategory'],
            });

            toast({
                title: "DevSpec created successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.error("Error creating DevSpec: ", error);

            toast({
                title: "Error creating DevSpec",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return useApiForCreateDevSpec;
};

export default useApiForCreateDevSpec;
