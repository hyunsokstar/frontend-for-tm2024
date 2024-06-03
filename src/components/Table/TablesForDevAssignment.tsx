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
    Text,
    IconButton,
    Tooltip,
    Flex,
    Box,
    Heading,
    Spacer,
    Link,
} from "@chakra-ui/react";
import { FaFigma, FaMinus, FaYoutube } from "react-icons/fa";
import { DevAssignmentRow } from "@/types/typeForDevRelay";
import ModalButtonForAddSubmisstion from "../Modal/ModalButtonForAddSubmisstion";
import { SiMicrosoftonenote } from "react-icons/si";
import DeleteButtonForDevAssginmentForCategory from "../Button/DeleteButtonForDevAssginmentForCategory";
import { MdNoteAlt } from "react-icons/md";
import DeleteButtonForDevAssignmentSubmissionById from "../Button/DeleteButtonForDevAssignmentSubmissionById";

type Props = {
    categoryId: number;
    devAssignments: DevAssignmentRow[];
};

const TablesForDevAssignment = ({ categoryId, devAssignments }: Props) => {
    return (
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={6}>
            {devAssignments.length ? (
                devAssignments.map((assignment) => (
                    <GridItem key={assignment.id} w="100%">
                        <Heading as="h3" size="sm" mb={2} display={"flex"} justifyContent={"space-between"}>
                            <Text>
                                {assignment.title}
                            </Text>
                            <Box>
                                {assignment.techNoteListUrl && (
                                    <IconButton
                                        as={Link}
                                        border={"1px solid gray"}
                                        href={assignment.techNoteListUrl}
                                        isExternal
                                        size="xs"
                                        variant="outline"
                                        aria-label="Note Link"
                                        icon={<SiMicrosoftonenote />}
                                        mr={1}
                                    />
                                )}
                                <DeleteButtonForDevAssginmentForCategory categoryId={categoryId} devAssignmentId={assignment.id} />
                            </Box>
                        </Heading>

                        <Table border="1px" borderColor="gray.200" borderRadius="sm" width="100%" mb={6}>
                            <Thead>
                                <Tr>
                                    <Th colSpan={5}>
                                        <Flex justifyContent="space-between">
                                            <Box>{assignment.subtitle}</Box>
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
                                                <Box display={"flex"} justifyContent={"space-between"} >
                                                    <Box>{submission.title}</Box>
                                                    <Box>

                                                    </Box>
                                                </Box>
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
                                                    <DeleteButtonForDevAssignmentSubmissionById categoryId={categoryId} submissionId={submission.id} />
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
