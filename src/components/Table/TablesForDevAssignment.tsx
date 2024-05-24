import React from "react";
import {
    Grid,
    GridItem,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    Tooltip,
    Flex,
    Box,
    Heading,
    Spacer,
} from "@chakra-ui/react";
import { FaFigma, FaYoutube } from "react-icons/fa";
import { MdNoteAlt } from "react-icons/md";
import { AddIcon } from "@chakra-ui/icons";
import { DevAssignmentRow } from "@/types/typeForDevRelay";
import ModalButtonForAddSubmisstion from "../Modal/ModalButtonForAddSubmisstion";

type Props = {
    devAssignments: DevAssignmentRow[];
};

const TablesForDevAssignment = ({ devAssignments }: Props) => {
    return (
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={6}>
            {devAssignments.length ? (
                devAssignments.map((assignment) => (
                    <GridItem key={assignment.id} w="100%">
                        <Heading as="h2" size="md" mb={4}>
                            {assignment.day}
                        </Heading>
                        <Table border="1px" borderColor="gray.200" borderRadius="sm" width="100%" mb={6}>
                            <Thead>
                                <Tr>
                                    <Th colSpan={5}>
                                        <Flex justifyContent="space-between">
                                            <Box>{assignment.title}</Box>
                                            <Spacer />
                                            <ModalButtonForAddSubmisstion devAssignmentId={assignment.id} />
                                        </Flex>
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {assignment.submissions.map((submission) => (
                                    <Tr key={submission.id}>
                                        <Td colSpan={3} padding={0} p={1}>
                                            <Flex width="100%" justifyContent="flex-end" border="0px solid red">
                                                <Box>{submission.title}</Box>
                                                <Spacer />
                                                <Box display="flex" gap={1} justifyContent={"flex-end"}>
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
                                                            _hover={{ bgColor: "purple.200" }} // 호버 시 색상 변경
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
                                                            _hover={{ bgColor: "teal.200" }} // 호버 시 색상 변경
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
                                                            _hover={{ bgColor: "red.200" }} // 호버 시 색상 변경
                                                        />
                                                    </Tooltip>
                                                </Box>
                                            </Flex>

                                        </Td>
                                        {/* <Td width={"30%"} border={"2px solid pink"} textAlign={"end"}>


                                        </Td> */}
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </GridItem>
                ))
            ) : (
                <GridItem colSpan={2} justifyContent="center" alignItems="center">
                    <Flex
                        justifyContent="center"
                        alignItems="center"
                        height="50vh" // 화면의 50% 높이로 설정
                        border="1px"
                        borderColor="gray.200"
                        borderRadius="sm"
                        bgColor="gray.100"
                    >
                        <Box>
                            <Heading as="h1" size="2xl" textAlign="center" color="gray.400">
                                there is no data for dev assignment
                            </Heading>
                        </Box>
                    </Flex>
                </GridItem>
            )}
        </Grid>
    );
};

export default TablesForDevAssignment;
