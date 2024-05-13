import { updateCompany } from '@/api/apiForFavoriteDevSpec';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IProps {
    id: number;
    company: string;
}

const useApiForUpdateCompanyForFavoriteDevSpec = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForUpdateCompany = useMutation({
        mutationFn: updateCompany,
        onSuccess: (data: any) => {
            console.log("Company updated successfully: ", data);
            toast({
                title: "Company updated successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });

            queryClient.refetchQueries({
                queryKey: ['getAllFavoriteDevSpecs']
            });

        },
        onError: (error: any) => {
            console.error("Error updating company: ", error);
            toast({
                title: "Error updating company",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForUpdateCompany;
};

export default useApiForUpdateCompanyForFavoriteDevSpec;
