// src/components/List/CategoryListForDevAssignment.tsx
import React from 'react';
import { Box, Button, Text, IconButton, Spacer } from '@chakra-ui/react';
import { EditIcon, CopyIcon } from '@chakra-ui/icons';
import ModalButtonForUpdateCategoryForDevAssignment from '../Modal/ModalButtonForUpdateCategoryForDevAssignment';

interface Category {
    id: number;
    name: string;
    color: string;
}

interface Props {
    categories: any[];
    selectedCategory: number | null;
    onSelectCategory: (categoryId: number) => void;
}

const pastelColors = [
    'teal.200',
    'pink.200',
    'yellow.200',
    'purple.200',
    'green.200',
    'orange.200', // 연한 오렌지색
    'blue.200', // 연한 파란색
    'red.200', // 연한 빨간색
    'cyan.200', // 연한 청록색
    'gray.200', // 연한 회색
];

// subject list 목록 옆의 복사 버튼 클릭 하면 http://127.0.0.1:3000/DevRelay?categoryId=${categories.id}` clip board 복사 with "clipboard": "^2.0.11",

const CategoryListForDevAssignment: React.FC<Props> = ({ categories, selectedCategory, onSelectCategory }) => {
    // const { hasCopied, onCopy } = useClipboard(`http://127.0.0.1:3000/DevRelay?categoryId=${categories.id}`);

    return (
        <Box>
            {categories.length === 0 ? (
                <Text>데이터 없음</Text>
            ) : (
                categories.map((category, index) => (
                    <Box key={category.id} display="flex" justifyContent="space-between" alignItems={"center"} py={1} pr={1} mb={2}
                        bg={selectedCategory === category.id ? pastelColors[index % pastelColors.length] : ''}
                        _hover={{
                            bg: pastelColors[index % pastelColors.length],
                            textDecoration: 'underline',
                        }}
                    >
                        <Text
                            cursor="pointer"
                            fontWeight={selectedCategory === category.id ? 'bold' : 'normal'}
                            onClick={() => onSelectCategory(category.id)}
                            px={2}
                            borderRadius="md"
                            transition="background-color 0.2s, text-decoration 0.2s"
                        >
                            {category.name} ({category.dev_assignments_count})
                        </Text>
                        <Spacer />
                        <IconButton
                            aria-label="Copy Link"
                            icon={<CopyIcon />}
                            variant="outline"
                            size="xs"
                            mr={1}
                        // onClick={onCopy}
                        />
                        <ModalButtonForUpdateCategoryForDevAssignment categoryId={category.id} categoryText={category.name} />
                    </Box>
                ))
            )}
        </Box>
    );
};

export default CategoryListForDevAssignment;
