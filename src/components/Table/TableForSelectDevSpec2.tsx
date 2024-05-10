// import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Divider,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    useToast,
} from '@chakra-ui/react';
import useApiForCreateFavoriteDevSpec from '@/hooks/useApiForCreateFavoriteDevSpec';

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

    const toast = useToast();
    const [isReadyToRegisterFavoriteDevSkilSet, setIsReadyToRegisterFavoriteDevSkilSet] = useState(false);

    const mutationForCreateFavoriteDevSpec = useApiForCreateFavoriteDevSpec(); // 훅 호출


    const registerFavoriteDevSpecButtonClick = () => {
        console.log("selectedItems : ", selectedItems);
        const language = selectedItems.language[0]
        const backend = selectedItems.backend[0]
        const frontend = selectedItems.frontend[0]
        const orm = selectedItems.orm[0]
        const css = selectedItems.css[0]

        console.log("language : ", language);
        console.log("backend : ", backend);
        console.log("frontend : ", frontend);
        console.log("orm : ", orm);
        console.log("css : ", css);

        mutationForCreateFavoriteDevSpec.mutate({
            language,
            backend,
            frontend,
            orm,
            css,
        });

    }

    const handleCheckboxChange = (category: string, values: string[]) => {

        if (selectedItems[category].length > 0 && values.length > 0) {
            // 이미 선택된 값이 있고, 새로운 값이 추가되려고 할 때는 Toast 메시지를 표시
            toast({
                title: '알림',
                description: '이미 선택된 영역에는 하나의 값만 선택할 수 있습니다.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setSelectedItems((prevSelectedItems) => ({
            ...prevSelectedItems,
            [category]: values,
        }));
    };

    const categoryOrder = ['language', 'backend', 'frontend', 'orm', 'css'];

    function checkFiveEssentialDevSpecs(selectedItems: SelectedItems) {
        return (
            selectedItems.language.length === 1 &&
            selectedItems.backend.length === 1 &&
            selectedItems.frontend.length === 1 &&
            selectedItems.orm.length === 1 &&
            selectedItems.css.length === 1
        );
    }

    useEffect(() => {
        const hasOneItem = checkFiveEssentialDevSpecs(selectedItems);
        setIsReadyToRegisterFavoriteDevSkilSet(hasOneItem);
    }, [selectedItems]);

    return (
        <Box>

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

            <Divider my={2} />

            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Heading size={"lg"} mb={4}>My Favorite Dev Spec</Heading>

                <Box display={"flex"} justifyContent={"flex-end"} p={1}>
                    {isReadyToRegisterFavoriteDevSkilSet ?
                        <Button variant={"outline"} size={"sm"} onClick={registerFavoriteDevSpecButtonClick}>등록</Button>
                        : ""
                    }
                </Box>
            </Box>


            <SimpleGrid columns={5} gap={3} mt={4}>
                {categoryOrder.map((category) => {
                    const selectedItemsForCategory = selectedItems[category];

                    return selectedItemsForCategory.length > 0 ? (
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
                    ) : (
                        <Box key={category}></Box>
                    );
                })}
            </SimpleGrid>

        </Box>
    );
};

export default TableForSelectDevSpec2;
