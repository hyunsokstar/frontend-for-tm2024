// import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Divider,
    Heading,
    Radio,
    RadioGroup,
    SimpleGrid,
    Stack,
    Text,
    useToast,
} from '@chakra-ui/react';
import useApiForCreateFavoriteDevSpec from '@/hooks/useApiForCreateFavoriteDevSpec';
import ModalButtonForAddDevSpec from '../Modal/ModalButtonForAddDevSpec';

type SelectOption = {
    [key: string]: { id: number; spec: string; category: string }[];
};

type SelectedItems = {
    [key: string]: string;
};

// ModalButtonForAddDevSpec
const TableForSelectDevSpec3 = ({ data }: { data: SelectOption }) => {
    const [selectedItems, setSelectedItems] = useState<SelectedItems>({
        language: '',
        backend: '',
        frontend: '',
        orm: '',
        css: '',
        app: ''
    });

    const toast = useToast();
    const [isReadyToRegisterFavoriteDevSkilSet, setIsReadyToRegisterFavoriteDevSkilSet] = useState<boolean>(false);

    const mutationForCreateFavoriteDevSpec = useApiForCreateFavoriteDevSpec(); // 훅 호출

    const registerFavoriteDevSpecButtonClick = () => {
        console.log('selectedItems : ', selectedItems);
        const { language, backend, frontend, orm, css, app } = selectedItems;

        console.log('language : ', language);
        console.log('backend : ', backend);
        console.log('frontend : ', frontend);
        console.log('orm : ', orm);
        console.log('css : ', css);
        console.log("app : ", app);


        mutationForCreateFavoriteDevSpec.mutate({
            language,
            backend,
            frontend,
            orm,
            css,
            app
        });
    };

    const handleRadioChange = (category: string, value: string) => {
        // if (selectedItems[category]) {
        //     // 이미 선택된 값이 있고, 새로운 값이 선택되려고 할 때는 Toast 메시지를 표시
        //     toast({
        //         title: '알림',
        //         description: '이미 선택된 영역에는 하나의 값만 선택할 수 있습니다.',
        //         status: 'warning',
        //         duration: 3000,
        //         isClosable: true,
        //     });
        //     return;
        // }

        setSelectedItems((prevSelectedItems) => ({
            ...prevSelectedItems,
            [category]: value,
        }));
    };

    const categoryOrder = ['language', 'backend', 'frontend', 'orm', 'css', 'app'];

    function checkFiveEssentialDevSpecs(selectedItems: SelectedItems): boolean {
        return (
            !!selectedItems.language &&
            !!selectedItems.backend &&
            !!selectedItems.frontend &&
            !!selectedItems.orm &&
            !!selectedItems.css &&
            !!selectedItems.app
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
                        <Box display={"flex"} justifyContent={"space-between"} pl={"2"}>
                            <Text fontWeight="bold" mb={2}>
                                {category}
                            </Text>
                            {/* <Button size="xs" variant="outline">+</Button> */}
                            <ModalButtonForAddDevSpec category={category} />
                        </Box>

                        <RadioGroup
                            value={selectedItems[category]}
                            onChange={(value: any) => handleRadioChange(category, value)}
                        >
                            <Stack spacing={2} direction="column">
                                {data[category].map(({ id, spec }) => (
                                    <Radio key={id} value={spec}>
                                        {spec}
                                    </Radio>
                                ))}
                            </Stack>
                        </RadioGroup>
                    </Box>
                ))}
            </Box>

            <Divider my={2} />

            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Heading size={"lg"} mb={4}>My Favorite Dev Spec </Heading>

                <Box display={"flex"} justifyContent={"flex-end"} p={1}>
                    {isReadyToRegisterFavoriteDevSkilSet ?
                        <Button variant={"outline"} size={"sm"} onClick={registerFavoriteDevSpecButtonClick}>등록</Button>
                        : ""
                    }
                </Box>
            </Box>

            <SimpleGrid columns={5} gap={3} mt={4}>
                {categoryOrder.map((category) => {
                    const selectedItemForCategory = selectedItems[category];

                    return selectedItemForCategory ? (
                        <Box key={category} border={"1px solid gray"} p={2}>
                            <Text fontWeight="bold" mb={2}>
                                Selected {category}
                            </Text>
                            <Box>{selectedItemForCategory}</Box>
                        </Box>
                    ) : (
                        <Box key={category}></Box>
                    );
                })}
            </SimpleGrid>
        </Box>
    );
};

export default TableForSelectDevSpec3;