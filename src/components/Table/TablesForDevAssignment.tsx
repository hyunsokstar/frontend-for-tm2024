import React from 'react';
import { Box, Table, Thead, Tbody, Td, Th, Tr, Text, Flex, IconButton, Link, Image } from '@chakra-ui/react';
import { MdAdd, MdOutlineLink, MdOutlineNoteAdd, MdThumbDown, MdThumbUp } from 'react-icons/md';
import { FiFigma } from 'react-icons/fi';
import { AiFillYoutube } from 'react-icons/ai'; // YouTube 아이콘 추가
import { DevAssignmentRow } from '@/types/typeForDevRelay';
import ModalButtonForAddSubmisstion from '../Modal/ModalButtonForAddSubmisstion';

interface Props {
    dataForAllDevAssignments: DevAssignmentRow[];
}

const TablesForDevAssignment: React.FC<Props> = ({ dataForAllDevAssignments }) => {
    const pastelColors = ['teal.500', 'blue.500', 'purple.500', 'pink.500', 'orange.500']; // Array of pastel colors

    return (
        <>
            {dataForAllDevAssignments.map(({ id, day, title, submissions }) => {
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




                                    <Td>
                                        {/* 여기에 + 버튼 추가 variant outline size xs 적절한 색 설정*/}
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
                                                icon={<MdThumbUp />} // replace with the actual like icon
                                                size="xs"
                                                colorScheme="green" // or any color you prefer for like
                                                variant="outline"
                                                mr={2}
                                            />
                                            <IconButton
                                                aria-label="Dislike"
                                                icon={<MdThumbDown />} // replace with the actual dislike icon
                                                size="xs"
                                                colorScheme="red" // or any color you prefer for dislike
                                                variant="outline"
                                            />
                                        </Td>
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
