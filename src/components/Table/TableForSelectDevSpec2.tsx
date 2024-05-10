import React, { useState } from 'react';
import {
    Box,
    Checkbox,
    CheckboxGroup,
    SimpleGrid,
    Stack,
    Text,
} from '@chakra-ui/react';

type SelectOption = {
    [key: string]: { id: number; spec: string; category: string }[];
};

type SelectedItems = {
    [key: string]: string[];
};

const TableForSelectDevSpec2 = ({ data }: { data: SelectOption }) => {
    const [selectedItems, setSelectedItems] = useState<SelectedItems>({
        language: [],
        backend: [],
        frontend: [],
        orm: [],
        css: [],
    });

    const handleCheckboxChange = (category: string, values: string[]) => {
        setSelectedItems((prevSelectedItems) => ({
            ...prevSelectedItems,
            [category]: values,
        }));
    };

    return (
        <Box>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Dev Spec Selection
            </Text>
            <Box display={"flex"} justifyContent={"space-between"} gap={3}>
                {Object.keys(data).map((category) => (
                    <Box key={category} width={"20%"} p={1}>
                        <Text fontWeight="bold" mb={2}>
                            {category}
                        </Text>

                        <CheckboxGroup
                            value={selectedItems[category]}
                            onChange={(values: any) => handleCheckboxChange(category, values)}
                        >
                            <Stack spacing={2} direction="column">
                                {data[category].map(({ id, spec }) => (
                                    <Checkbox key={id} value={spec}>
                                        {spec}
                                    </Checkbox>
                                ))}
                            </Stack>
                        </CheckboxGroup>
                    </Box>
                ))}
            </Box>

            <SimpleGrid columns={5} gap={3} mt={4}>
                {Object.keys(selectedItems).map((category) => {
                    const selectedItemsForCategory = selectedItems[category];

                    return (
                        selectedItemsForCategory.length > 0 && (
                            <Box key={category} border={"1px solid gray"} p={2}>
                                <Text fontWeight="bold" mb={2}>
                                    Selected {category}
                                </Text>
                                <Stack spacing={2} direction="column">
                                    {selectedItemsForCategory.map((item) => (
                                        <Box key={item}>{item}</Box>
                                    ))}
                                </Stack>
                            </Box>
                        )
                    );
                })}
            </SimpleGrid>
        </Box>
    );
};

export default TableForSelectDevSpec2;