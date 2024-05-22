import React from 'react'
import { Grid, GridItem, Table, Thead, Tbody, Tr, Th, Td, IconButton, Tooltip, Flex, Box, Button } from '@chakra-ui/react'
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
                    <Table>
                        <Thead>
                            <Tr>
                                <Th colSpan={3}>
                                    {/* {assignment.title} */}
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
                                            {/* <Button
                                                size="xs"
                                                variant="outline"
                                                colorScheme="blue"
                                                onClick={() => {
                                                    // handle button click
                                                }}
                                                leftIcon={<AddIcon />}
                                            >
                                                Add
                                            </Button> */}
                                        </Flex>
                                    </Td>
                                    <Td>
                                        <Flex gap={1}>

                                            <Tooltip label="Figma" hasArrow>
                                                <IconButton
                                                    aria-label="Figma"
                                                    icon={<FaFigma />} // 피그마 모양 아이콘
                                                    variant="outline"
                                                    size="xs" // 아이콘 버튼 크기를 xs로 설정
                                                    as="a" // IconButton을 anchor 요소로 변환
                                                    href={submission.figmaUrl} // 클릭 시 이동할 주소
                                                    target="_blank" // 새 탭에서 열림
                                                    rel="noopener noreferrer" // 보안 상의 이유로 권장되는 속성
                                                />
                                            </Tooltip>

                                            <Tooltip label="Note" hasArrow>
                                                <IconButton
                                                    aria-label="Note"
                                                    icon={<MdNoteAlt />} // 노트 모양 아이콘
                                                    variant="outline"
                                                    size="xs" // 아이콘 버튼 크기를 xs로 설정
                                                    as="a" // IconButton을 anchor 요소로 변환
                                                    href={submission.noteUrl} // 클릭 시 이동할 주소
                                                    target="_blank" // 새 탭에서 열림
                                                    rel="noopener noreferrer" // 보안 상의 이유로 권장되는 속성
                                                />
                                            </Tooltip>

                                            <Tooltip label="YouTube" hasArrow>
                                                <IconButton
                                                    aria-label="YouTube"
                                                    icon={<FaYoutube />} // 유튜브 모양 아이콘
                                                    variant="outline"
                                                    size="xs" // 아이콘 버튼 크기를 xs로 설정
                                                    as="a" // IconButton을 anchor 요소로 변환
                                                    href={submission.youtubeUrl} // 클릭 시 이동할 주소
                                                    target="_blank" // 새 탭에서 열림
                                                    rel="noopener noreferrer" // 보안 상의 이유로 권장되는 속성
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
