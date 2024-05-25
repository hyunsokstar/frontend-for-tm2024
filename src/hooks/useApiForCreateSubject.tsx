
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiForcreateSubjectForCategory } from '@/api/apiForDevRelay';


interface IProps {

}

const useApiForCreateSubject = () => {
    const queryClient = useQueryClient();
    const toast = useToast();


    const mutationForCreateSubject = useMutation({
        mutationFn: apiForcreateSubjectForCategory,
        onSuccess: (data: any) => {

            queryClient.refetchQueries({
                queryKey: ['getAllSubjectList'],
            });

            toast({
                title: "subject created successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.error("Error creating subject: ", error);

            toast({
                title: "Error creating subject",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForCreateSubject;
};

export default useApiForCreateSubject;
