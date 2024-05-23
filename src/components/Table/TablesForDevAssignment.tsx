import React from 'react'
import { Grid, GridItem, Table, Thead, Tbody, Tr, Th, Td, IconButton, Tooltip, Flex, Box } from '@chakra-ui/react'
import { FaFigma, FaYoutube } from 'react-icons/fa' // 노트, 피그마, 유튜브 모양 아이콘
import { MdNoteAlt } from "react-icons/md";
import { AddIcon } from "@chakra-ui/icons";
import { DevAssignmentRow } from '@/types/typeForDevRelay'
import ModalButtonForAddSubmisstion from '../Modal/ModalButtonForAddSubmisstion';

type Props = {
    devAssignments: DevAssignmentRow[]
}

const TablesForDevAssignment = ({ devAssignments }: Props) => {
    return (
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={6}>
            {devAssignments.map((assignment) => (
                <GridItem key={assignment.id} w='100%'>
                    <h2>{assignment.day}</h2>
                    <Table border="1px" borderColor="gray.200" borderRadius="md" borderCollapse="collapse" width="100%" mb={6}>
                        <Thead>
                            <Tr>
                                <Th colSpan={3}>
                                    <Flex justifyContent="space-between">
                                        <Box>{assignment.title}</Box>
                                        <ModalButtonForAddSubmisstion devAssignmentId={assignment.id} />
                                    </Flex>
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {assignment.submissions.map((submission) => (
                                <Tr key={submission.id}>
                                    <Td>
                                        <Flex justifyContent="space-between">
                                            <Box>{submission.title}</Box>
                                        </Flex>
                                    </Td>
                                    <Td>
                                        <Flex gap={1}>
                                            <Tooltip label="Figma" hasArrow>
                                                <IconButton
                                                    aria-label="Figma"
                                                    icon={<FaFigma />}
                                                    variant="outline"
                                                    size="xs"
                                                    as="a"
                                                    href={submission.figmaUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                />
                                            </Tooltip>
                                            <Tooltip label="Note" hasArrow>
                                                <IconButton
                                                    aria-label="Note"
                                                    icon={<MdNoteAlt />}
                                                    variant="outline"
                                                    size="xs"
                                                    as="a"
                                                    href={submission.noteUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                />
                                            </Tooltip>
                                            <Tooltip label="YouTube" hasArrow>
                                                <IconButton
                                                    aria-label="YouTube"
                                                    icon={<FaYoutube />}
                                                    variant="outline"
                                                    size="xs"
                                                    as="a"
                                                    href={submission.youtubeUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                />
                                            </Tooltip>
                                        </Flex>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </GridItem>
            ))}
        </Grid>
    )
}

export default TablesForDevAssignment
