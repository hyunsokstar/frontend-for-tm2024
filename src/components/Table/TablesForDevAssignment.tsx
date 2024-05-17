import React from 'react';
import { Box, Table, Thead, Tbody, Td, Th, Tr, Text, Flex, IconButton, Link, Image } from '@chakra-ui/react';
import { MdOutlineLink, MdOutlineNoteAdd } from 'react-icons/md';
import { FiFigma } from 'react-icons/fi';
import { AiFillYoutube } from 'react-icons/ai'; // YouTube 아이콘 추가
import { DevAssignmentRow } from '@/types/typeForDevRelay';

interface Props {
    dataForAllDevAssignments: DevAssignmentRow[];
}

const TablesForDevAssignment: React.FC<Props> = ({ dataForAllDevAssignments }) => {
    const pastelColors = ['teal.500', 'blue.500', 'purple.500', 'pink.500', 'orange.500']; // Array of pastel colors

    return (
        <>
            {dataForAllDevAssignments.map(({ day, title, submissions }) => {
                const colorIndex = pastelColors.findIndex((color) => color === day);
                const dayColor = colorIndex !== -1 ? pastelColors[(colorIndex + 1) % pastelColors.length] : 'gray.600';

                return (
                    <Box key={day} marginX={2} mb={4}>
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
                                </Tr>

                            </Thead>
                            <Tbody>
                                {submissions.map(({ id, title: subTitle, noteUrl, figmaUrl, youtubeUrl }) => (
                                    <Tr key={id}>
                                        <Td color="gray.700">{subTitle}</Td>
                                        <Td>
                                            <Flex justifyContent="space-between">
                                                <Link href={noteUrl} isExternal>
                                                    <IconButton
                                                        aria-label="Note"
                                                        icon={<MdOutlineNoteAdd />}
                                                        size="xs"
                                                        colorScheme="gray"
                                                        variant="ghost"
                                                    />
                                                </Link>
                                                <Link href={figmaUrl} isExternal>
                                                    <IconButton
                                                        aria-label="Figma"
                                                        icon={<FiFigma />}
                                                        size="xs"
                                                        colorScheme="gray"
                                                        variant="ghost"
                                                        marginLeft={2}
                                                    />
                                                </Link>
                                                <Link href={youtubeUrl} isExternal>
                                                    <IconButton
                                                        aria-label="YouTube"
                                                        icon={<AiFillYoutube />} // YouTube 아이콘으로 변경
                                                        size="xs"
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
