import useApiForDeleteTeamForDevBattle from '@/hooks/useApiForDeleteTeamForDevBattle';
import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { FaMinus } from 'react-icons/fa';

type Props = {
    teamId: number;
};

const DeleteButtonForTeamForDevBattle = ({ teamId }: Props) => {
    const mutation = useApiForDeleteTeamForDevBattle();

    const handleDeleteTeam = () => {
        mutation.mutate(teamId);
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

export default DeleteButtonForTeamForDevBattle;
