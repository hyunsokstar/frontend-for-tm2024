import React from 'react'
import { Box, Text, IconButton, Link, Button } from '@chakra-ui/react'
import { FaCircle, FaFigma, FaYoutube } from 'react-icons/fa'
import DeleteDevProgressButton from '../Button/DeleteDevProgressButton'
import { DevProgressForTeamResponse, DevStatus } from '@/types/typeForDevBattle'
import { MdNoteAlt } from "react-icons/md";
import ModalButtonForUpdateDevProgress from '../Modal/ModalButtonForUpdateDevProgress'


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
            {devProgressForTeams.map((progress, index) => (
                <Box key={progress.id} display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center">
                        <Button
                            size="xs"
                            variant="outline"
                            aria-label={`Task id: ${progress.id}`}
                            border={"1px solid black"}
                        >
                            {index + 1} {progress.id}
                        </Button>                        <Text ml={2}>{progress.task}</Text>

                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>

                        <IconButton
                            size="xs"
                            variant="outline"
                            colorScheme={getStatusColor(progress.status)}
                            aria-label={`Status ${progress.status}`}
                            icon={<FaCircle />}
                        />

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
                        <ModalButtonForUpdateDevProgress progressId={progress.id} progressForTeam={progress} />
                        <DeleteDevProgressButton progressId={progress.id} />
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default DevProgressListWithCreateButton
