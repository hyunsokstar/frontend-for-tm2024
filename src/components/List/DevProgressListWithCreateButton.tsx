import React from 'react'
import { Box, Text, IconButton, Link, Button } from '@chakra-ui/react'
import { FaCircle, FaFigma, FaYoutube } from 'react-icons/fa'
import DeleteDevProgressButton from '../Button/DeleteDevProgressButton'
import { DevProgressForTeamResponse, DevStatus } from '@/types/typeForDevBattle'
import { MdNoteAlt } from "react-icons/md";
import ModalButtonForUpdateDevProgress from '../Modal/ModalButtonForUpdateDevProgress'
import PopUpButtonForUpdateDevProgressStatusForDevTeam from '../Button/PopUpButtonForUpdateDevProgressStatusForDevTeam'


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
                <Box key={progress.id} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Box display="flex" alignItems="center">
                        <Button
                            size="xs"
                            variant="outline"
                            aria-label={`Task id: ${progress.id}`}
                            border={"1px solid black"}
                        >
                            {index + 1}
                        </Button>
                        <Text ml={2}>{progress.task}</Text>

                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>

                        <PopUpButtonForUpdateDevProgressStatusForDevTeam devProgressId={progress.id} status={progress.status} />

                        {progress.noteUrl && (
                            <IconButton
                                as={Link}
                                href={progress.noteUrl}
                                size="xs"
                                variant="outline"
                                aria-label="Note Link"
                                icon={<MdNoteAlt />}
                                // isExternal
                                bg="orange.50" // 연한 노란색 배경색
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
                                bg="#E6E6FA" // 연한 보라색 배경색
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
                                bg="#FFD1DC" // 연한 분홍색 배경색
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
