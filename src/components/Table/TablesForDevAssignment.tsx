import React from 'react';
import { Box, Table, Td, Th, Tr, Text } from '@chakra-ui/react';

interface Props {
    dataForAllDevAssignments: any[];
}

const TablesForDevAssignment: React.FC<Props> = ({ dataForAllDevAssignments }) => {
    return (
        <>
            {dataForAllDevAssignments.map(({ day, title }) => {
                const pastelColors = ['teal', 'blue', 'purple', 'pink', 'orange']; // Array of pastel colors
                const colorIndex = dataForAllDevAssignments.indexOf({ day, title }); // Get index for color assignment

                return (
                    <Box key={day} marginX={2} mb={4}>
                        <Text fontSize="lg" fontWeight="bold" textAlign="center" color={pastelColors[colorIndex % pastelColors.length]}>{day}</Text>
                        <Table variant="simple" color={pastelColors[colorIndex % pastelColors.length]} size={"xs"}>
                            <thead>
                                <Tr>
                                    <Th>Title</Th>
                                </Tr>
                            </thead>
                            <tbody>
                                <Tr>
                                    <Td>{title}</Td>
                                </Tr>
                                {/* Fake data with subtle text color */}
                                <Tr>
                                    <Td color="#888">Todo 1</Td>
                                </Tr>
                                <Tr>
                                    <Td color="#888">Todo 2</Td>
                                </Tr>
                            </tbody>
                        </Table>
                    </Box>
                );
            })}
        </>
    );
};

export default TablesForDevAssignment;