import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    IconButton,
    SimpleGrid,
    Stack,
    Text,
    useToast,
} from '@chakra-ui/react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { AddIcon } from "@chakra-ui/icons";

type SelectOption = {
    language: string[];
    backend: string[];
    frontend: string[];
    orm: string[];
    css: string[];
};

type SelectedItems = {
    language: string[];
    backend: string[];
    frontend: string[];
    orm: string[];
    css: string[];
};

type Item = {
    name: string;
    likes: number;
    dislikes: number;
};

type CategoryItems = {
    language: Item[];
    backend: Item[];
    frontend: Item[];
    orm: Item[];
    css: Item[];
};

const TableForSelectDevSpec = ({ data }: { data: SelectOption }) => {
    const toast = useToast();

    const [isReadyToRegisterFavoriteDevSkilSet, setIsReadyToRegisterFavoriteDevSkilSet] = useState(false);

    const [selectedItems, setSelectedItems] = useState<SelectedItems>({
        language: [],
        backend: [],
        frontend: [],
        orm: [],
        css: [],
    });

    const [categoryItems, setCategoryItems] = useState<CategoryItems>({
        language: data.language.map((name) => ({ name, likes: 0, dislikes: 0 })),
        backend: data.backend.map((name) => ({ name, likes: 0, dislikes: 0 })),
        frontend: data.frontend.map((name) => ({ name, likes: 0, dislikes: 0 })),
        orm: data.orm.map((name) => ({ name, likes: 0, dislikes: 0 })),
        css: data.css.map((name) => ({ name, likes: 0, dislikes: 0 })),
    });

    function hasOneSelectedItem(selectedItems: SelectedItems) {
        return (
            selectedItems.language.length === 1 &&
            selectedItems.backend.length === 1 &&
            selectedItems.frontend.length === 1 &&
            selectedItems.orm.length === 1 &&
            selectedItems.css.length === 1
        );
    }

    const handleCheckboxChange = (category: keyof SelectedItems, values: string[]) => {
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

        // 선택된 값이 없거나 추가되는 값이 없는 경우에는 선택 항목 업데이트
        setSelectedItems((prevSelectedItems) => ({
            ...prevSelectedItems,
            [category]: values,
        }));

    };

    const handleLikeClick = (category: keyof CategoryItems, itemName: string) => {
        setCategoryItems((prevCategoryItems) => ({
            ...prevCategoryItems,
            [category]: prevCategoryItems[category].map((item) =>
                item.name === itemName
                    ? { ...item, likes: item.likes + 1 }
                    : item
            ),
        }));
    };

    const handleDislikeClick = (category: keyof CategoryItems, itemName: string) => {
        setCategoryItems((prevCategoryItems) => ({
            ...prevCategoryItems,
            [category]: prevCategoryItems[category].map((item) =>
                item.name === itemName
                    ? { ...item, dislikes: item.dislikes + 1 }
                    : item
            ),
        }));
    };

    useEffect(() => {
        const hasOneItem = hasOneSelectedItem(selectedItems);
        setIsReadyToRegisterFavoriteDevSkilSet(hasOneItem);
    }, [selectedItems]);

    return (
        <Box>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Best Dev Spec Ranking
            </Text>
            <Box display={"flex"} justifyContent={"space-between"} gap={3} border={"2px solid yellow"} p={1}>
                {Object.keys(data).map((category) => (
                    <Box key={category} border={"2px solid blue"} width={"20%"} p={1}>
                        <Box display={"flex"} justifyContent={"space-between"} mb={2}>
                            <Text fontWeight="bold">
                                {category}
                            </Text>
                            {/* <Button size="xs" variant={"outline"}>hi</Button> */}
                            <IconButton
                                size="xs"
                                variant="outline"
                                colorScheme="green"
                                aria-label="Thumbs up"
                                icon={<AddIcon />}
                            />
                        </Box>

                        <CheckboxGroup
                            value={selectedItems[category as keyof SelectedItems]}
                            onChange={(values: any) => handleCheckboxChange(category as keyof SelectedItems, values)}
                        >
                            <Stack spacing={2} direction="column">
                                {categoryItems[category as keyof CategoryItems].map((item) => (
                                    <Box key={item.name} display="flex" justifyContent={"space-between"} alignItems="center">
                                        <Checkbox value={item.name}>{item.name}</Checkbox>
                                        <IconButton
                                            aria-label="Like"
                                            icon={<FaThumbsUp />}
                                            variant="outline"
                                            ml="auto"
                                            onClick={() => handleLikeClick(category as keyof CategoryItems, item.name)}
                                            size="xs"
                                        />
                                        <Text ml={1}>{item.likes}</Text>
                                        <IconButton
                                            aria-label="Dislike"
                                            icon={<FaThumbsDown />}
                                            variant="outline"
                                            ml={2}
                                            onClick={() => handleDislikeClick(category as keyof CategoryItems, item.name)}
                                            size="xs"
                                        />
                                        <Text ml={1}>{item.dislikes}</Text>
                                    </Box>
                                ))}
                            </Stack>
                        </CheckboxGroup>
                    </Box>
                ))}
            </Box>

            <Box mt={4} border={"1px solid green"} p={1}>
                <Box display={"flex"} justifyContent={"flex-end"} p={1}>
                    {isReadyToRegisterFavoriteDevSkilSet ?
                        <Button variant={"outline"} size={"sm"}>등록</Button>
                        : ""
                    }
                </Box>

                <SimpleGrid columns={5} gap={3}>
                    {Object.keys(selectedItems).map((category) => {
                        const selectedItemsForCategory = selectedItems[category as keyof SelectedItems];

                        return (
                            selectedItemsForCategory.length > 0 && (
                                <Box key={category} border={"1px solid blue"} p={2}>
                                    <Text fontWeight="bold" mb={2}>
                                        선택한 {category}
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
        </Box >
    );
};

export default TableForSelectDevSpec;
