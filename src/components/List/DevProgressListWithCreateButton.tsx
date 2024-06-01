import React from 'react'
import { Box, Text, IconButton, Link } from '@chakra-ui/react'
import { FaCircle, FaFigma, FaYoutube } from 'react-icons/fa'
import DeleteDevProgressButton from '../Button/DeleteDevProgressButton'
import { DevProgressForTeamResponse, DevStatus } from '@/types/typeForDevBattle'
import { MdNoteAlt } from "react-icons/md";


type Props = {
    teamId: number
    devProgressForTeams: DevProgressForTeamResponse[]
}

const getStatusColor = (status: DevStatus) => {
    switch (status) {
        case 'ready':
            return 'green'
        case 'in_progress':
            return 'blue'
        case 'test':
            return 'orange'
        case 'complete':
            return 'gray'
        default:
            return 'gray'
    }
}

const DevProgressListWithCreateButton = ({ teamId, devProgressForTeams }: Props) => {

    return (
        <Box p={0}>
            {devProgressForTeams.map((progress) => (
                <Box key={progress.id} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Box display="flex" alignItems="center">
                        <IconButton
                            size="xs"
                            variant="outline"
                            colorScheme={getStatusColor(progress.status)}
                            aria-label={`Status ${progress.status}`}
                            icon={<FaCircle />}
                        />
                        <Text ml={2}>{progress.task}</Text>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        {progress.figmaUrl && (
                            <IconButton
                                as={Link}
                                href={progress.figmaUrl}
                                isExternal
                                size="xs"
                                variant="outline"
                                aria-label="Figma Link"
                                icon={<FaFigma />}
                            />
                        )}
                        {progress.youtubeUrl && (
                            <IconButton
                                as={Link}
                                href={progress.youtubeUrl}
                                isExternal
                                size="xs"
                                variant="outline"
                                aria-label="Youtube Link"
                                icon={<FaYoutube />}
                            />
                        )}
                        {progress.noteUrl && (
                            <IconButton
                                as={Link}
                                href={progress.noteUrl}
                                isExternal
                                size="xs"
                                variant="outline"
                                aria-label="Note Link"
                                icon={<MdNoteAlt />}
                            />
                        )}
                        <DeleteDevProgressButton progressId={progress.id} />
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default DevProgressListWithCreateButton
