import React from 'react';
import { Box, Table, Thead, Tbody, Td, Tr, Text, Flex, IconButton, Link, Image, Center } from '@chakra-ui/react';
import { MdAdd, MdOutlineAddCircle, MdOutlineLink, MdOutlineNoteAdd, MdThumbDown, MdThumbUp } from 'react-icons/md';
import { FiFigma } from 'react-icons/fi';
import { AiFillYoutube } from 'react-icons/ai';
import ModalButtonForAddSubmisstion from '../Modal/ModalButtonForAddSubmisstion';
import { DevAssignmentRow } from '@/types/typeForDevRelay';

interface Props {
    dataForAllDevAssignments: DevAssignmentRow[];
}

const TablesForDevAssignment: React.FC<Props> = ({ dataForAllDevAssignments }) => {
    const pastelColors = ['teal.500', 'blue.500', 'purple.500', 'pink.500', 'orange.500']; // Array of pastel colors

    // 데이터가 비어 있는지 확인
    const isEmpty = dataForAllDevAssignments.length === 0;

    // 데이터가 비어 있을 때 보여줄 메시지
    const emptyMessage = (
        <Center height="30%" flexDirection="column">
            <Text fontSize="xl" fontWeight="bold" mb={4}>No data available</Text>
            <Box as={MdOutlineAddCircle} fontSize="4xl" color="blue.500" />
        </Center>
    );

    if (isEmpty) {
        return (
            <Box height="calc(100vh - 80vh)" marginTop="20vh"> {/* 높이를 화면 중앙에 맞게 조절하고 상단으로 올리기 */}
                {emptyMessage}
            </Box>

        );
    }

    return (
        <>
            {dataForAllDevAssignments.map(({ id, day, title, submissions }) => {
                const colorIndex = pastelColors.findIndex((color) => color === day);
                const dayColor = colorIndex !== -1 ? pastelColors[(colorIndex + 1) % pastelColors.length] : 'gray.600';

                return (
                    <Box key={id} marginX={2} mb={4}>
                        <Text fontSize="lg" fontWeight="bold" textAlign="center" color={dayColor}>
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                        </Text>
                        <Table variant="simple" size={'xs'}>
                            <Thead>
                                <Tr>
                                    <Td>
                                        <Text color="blue.500" fontWeight="bold" fontFamily="sans-serif">{title}</Text>
                                    </Td>
                                    <Td></Td>
                                    <Td>
                                        <Box display={"flex"} justifyContent={"flex-end"} my={1}>
                                            <ModalButtonForAddSubmisstion devAssignmentId={id} />
                                        </Box>
                                    </Td>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {submissions.map(({ id, title: subTitle, noteUrl, figmaUrl, youtubeUrl }) => (
                                    <Tr key={id}>
                                        <Td color="gray.700">{subTitle}</Td>
                                        <Td>
                                            <IconButton
                                                aria-label="Like"
                                                icon={<MdThumbUp />}
                                                size="xs"
                                                colorScheme="green"
                                                variant="outline"
                                                mr={2}
                                            />
                                            <IconButton
                                                aria-label="Dislike"
                                                icon={<MdThumbDown />}
                                                size="xs"
                                                colorScheme="red"
                                                variant="outline"
                                            />
                                        </Td>
                                        <Td>
                                            <Flex justifyContent="flex-end" pr={1}>
                                                <Link href={noteUrl} isExternal>
                                                    <IconButton
                                                        aria-label="Note"
                                                        icon={<MdOutlineNoteAdd />}
                                                        size="sm"
                                                        colorScheme="gray"
                                                        variant="ghost"
                                                    />
                                                </Link>
                                                <Link href={figmaUrl} isExternal>
                                                    <IconButton
                                                        aria-label="Figma"
                                                        icon={<FiFigma />}
                                                        size="sm"
                                                        colorScheme="gray"
                                                        variant="ghost"
                                                        marginLeft={2}
                                                    />
                                                </Link>
                                                <Link href={youtubeUrl} isExternal>
                                                    <IconButton
                                                        aria-label="YouTube"
                                                        icon={<AiFillYoutube />}
                                                        size="sm"
                                                        colorScheme="gray"
                                                        variant="ghost"
                                                        marginLeft={2}
                                                    />
                                                </Link>
                                            </Flex>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                );
            })}
        </>
    );
};

export default TablesForDevAssignment;
