import { apiForSimpleCreateSupplementaryTodo, apiForSimpleCreateTodo } from '@/api/apiForTodos';
import { RootState } from '@/store';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';


interface IProps {

}

const useApiForSimpleCreateXXXXXXXXXX = ({ }: IProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();


    const useApiForSimpleCreateXXXXXX = useMutation({
        mutationFn: apiForSimpleCreateSupplementaryTodo,
        onSuccess: (data: any) => {

            queryClient.refetchQueries({
                queryKey: ['xxxxxxxxxxxxxxxx'],
            });

            toast({
                title: "Todo created successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            console.error("Error creating todo: ", error);

            toast({
                title: "Error creating todo",
                description: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return useApiForSimpleCreateXXXXXX;
};

export default useApiForSimpleCreateXXXXXXXXXX;
