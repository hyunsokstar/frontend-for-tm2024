import React from 'react';
import { Box, Button, Text, IconButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
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

// 파스텔톤 색상 정의
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

const CategoryListForDevAssignment: React.FC<Props> = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <Box>
            {categories.map((category, index) => (
                <Box key={category.id} display="flex" justifyContent="space-between" alignItems={"center"} py={1} pr={1} mb={2}
                    bg={selectedCategory === category.id ? pastelColors[index % pastelColors.length] : ''}
                >
                    <Text
                        cursor="pointer"
                        fontWeight={selectedCategory === category.id ? 'bold' : 'normal'}
                        onClick={() => onSelectCategory(category.id)}
                        // py={2}
                        px={2}
                        borderRadius="md"
                        // bg={selectedCategory === category.id ? pastelColors[index % pastelColors.length] : ''}
                        _hover={{
                            bg: pastelColors[index % pastelColors.length],
                            textDecoration: 'underline',
                        }}
                        transition="background-color 0.2s, text-decoration 0.2s"
                    >
                        {category.name}
                    </Text>
                    <ModalButtonForUpdateCategoryForDevAssignment categoryId={category.id} categoryText={category.name} />
                </Box>
            ))}
        </Box>
    );
};

export default CategoryListForDevAssignment;
