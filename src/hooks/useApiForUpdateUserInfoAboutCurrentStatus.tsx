import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { ITypeForResponseForUpdatePerformanceLevel, UpdateUserInfoAboutCurrentStatusDto } from '@/types/typeForUserBoard';
import { apiForUpdateUserInfoAboutCurrentStatus } from '@/api/apiForUserBoard';

const useApiForUpdateUserInfoAboutCurrentStatus = (pageNum: number) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutation = useMutation<
        ITypeForResponseForUpdatePerformanceLevel,
        Error,
        { userId: number; updateDto: UpdateUserInfoAboutCurrentStatusDto }
    >({
        mutationFn: ({ userId, updateDto }) => apiForUpdateUserInfoAboutCurrentStatus(userId, updateDto),
        onSuccess: (data) => {
            console.log("User info updated successfully: ", data);
            toast({
                title: "User info updated successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
            // Refetch the user list query with the current page number
            queryClient.refetchQueries({ queryKey: ['apiForGetAllUsers', pageNum] });

        },
        onError: (error: Error) => {
            console.error("Error updating user info: ", error);
            toast({
                title: "Error updating user info",
                description: error.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutation;
};

export default useApiForUpdateUserInfoAboutCurrentStatus;