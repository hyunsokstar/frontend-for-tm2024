import React from 'react'
import { Box, Text, IconButton, Link, Button, useDisclosure } from '@chakra-ui/react'
import { FaCircle, FaFigma, FaFileAlt, FaYoutube, FaPlus, FaMinus } from 'react-icons/fa'
import ModalButtonForAddDevProgressForTeam from '../Modal/ModalButtonForAddDevProgressForTeam'
import DeleteDevProgressButton from '../Button/DeleteDevProgressButton'
import { DevProgressForTeamResponse } from '@/types/typeForDevBattle'

type Props = {
    teamId: number
    devProgressForTeams: DevProgressForTeamResponse[]
}

const getStatusColor = (status: string) => {
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
        <Box p={0} rounded="md" display="flex" flexDirection="column">
            <Box display="flex" justifyContent="flex-end" mb={1}>
                <ModalButtonForAddDevProgressForTeam teamId={teamId} />
            </Box>
            {devProgressForTeams.map((progress) => (
                <Box key={progress.id} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
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
                        {progress.noteUrl && (
                            <IconButton
                                as={Link}
                                href={progress.noteUrl}
                                isExternal
                                size="xs"
                                variant="outline"
                                aria-label="Note Link"
                                icon={<FaFileAlt />}
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
                        <DeleteDevProgressButton progressId={progress.id} />
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default DevProgressListWithCreateButton
