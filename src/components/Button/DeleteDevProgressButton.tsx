import React from 'react';
import { IconButton, useToast } from '@chakra-ui/react';
import { FaMinus } from 'react-icons/fa';
import useApiForDeleteDevProgressForTeam from '@/hooks/useApiForDeleteDevProgressForTeam';

interface DeleteDevProgressButtonProps {
    progressId: number;
}

const DeleteDevProgressButton: React.FC<DeleteDevProgressButtonProps> = ({
    progressId,
}) => {
    const toast = useToast();
    const mutationForDeleteDevProgressForTeam = useApiForDeleteDevProgressForTeam();

    const handleDelete = () => {
        mutationForDeleteDevProgressForTeam.mutate(progressId, {
            onSuccess: () => {
                toast({
                    title: 'Task deleted successfully.',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
            },
            onError: (error: any) => {
                console.error('Error deleting task: ', error);
                toast({
                    title: 'Error deleting task.',
                    description: error.response.data.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            },
        });
    };

    return (
        <IconButton
            size="xs"
            variant="outline"
            colorScheme="red"
            aria-label="Delete"
            icon={<FaMinus />}
            onClick={handleDelete}
        />
    );
};

export default DeleteDevProgressButton;
