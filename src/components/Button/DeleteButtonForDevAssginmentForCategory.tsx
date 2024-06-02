import useApiForDeleteDevAssignmentById from '@/hooks/useApiForDeleteDevAssignmentById';
import useApiForDeleteTeamForDevBattle from '@/hooks/useApiForDeleteTeamForDevBattle';
import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { FaMinus } from 'react-icons/fa';

type Props = {
    categoryId: number;
    devAssignmentId: number;
};

const DeleteButtonForDevAssginmentForCategory = ({ categoryId, devAssignmentId }: Props) => {
    const mutation = useApiForDeleteDevAssignmentById(categoryId);

    const handleDeleteTeam = () => {
        mutation.mutate(devAssignmentId);
    };

    return (
        <IconButton
            aria-label="Remove Team"
            icon={<FaMinus />}
            variant="outline"
            colorScheme="red"
            size="xs"
            onClick={handleDeleteTeam}
        />
    );
};

export default DeleteButtonForDevAssginmentForCategory;

