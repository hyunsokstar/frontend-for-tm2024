import React, { useState } from 'react';
import { Box, Collapse, List, ListItem, Flex } from '@chakra-ui/react';
import useGetAllTodos from '@/hooks/useGetAllTodos';
import { ITypeForTodoRow } from '@/types/typeforTodos';

type Props = {};

const TodosPageByChakraUi = (props: Props) => {
    const [pageNum, setPageNum] = useState(1);
    const { isLoading, error, dataForTodos } = useGetAllTodos(pageNum);
    console.log("dataForTodos : ", dataForTodos);
    const [openIndex, setOpenIndex] = useState(-1);

    const handleItemClick = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <Box width={"80%"} margin={"auto"} mt={3}>
            <List>
                {dataForTodos && dataForTodos?.todoList.length > 0 ? (
                    dataForTodos?.todoList.map((row, index) => (
                        <ListItem
                            key={index}
                            display="flex" // 가로로 정렬하기 위해 Flex 사용
                            flexDirection="column" // 댓글 창을 아래쪽으로 배치하기 위해 방향 설정
                            onClick={() => handleItemClick(index)}
                            borderBottom="1px solid #ccc" // 각 아이템 사이에 구분선 추가
                            py={2} // 위아래 여백 조절
                            cursor="pointer" // 마우스 커서를 포인터로 변경하여 클릭 가능하게 함
                        >
                            <Flex flex={1} align="center">
                                <Box flexBasis="20%">{row.id}</Box>
                                <Box flexBasis="20%">{row.manager.nickname}</Box>
                                <Box flexBasis="20%">{row.task}</Box>
                                <Box flexBasis="20%">{row.details}</Box>
                                <Box flexBasis="20%">{row.status}</Box>
                            </Flex>
                            <Collapse in={openIndex === index} animateOpacity>
                                <Box backgroundColor={"green.100"}>
                                    댓글 테스트
                                </Box>
                            </Collapse>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>No data</ListItem>
                )}
            </List>
        </Box>
    );
};

export default TodosPageByChakraUi;
