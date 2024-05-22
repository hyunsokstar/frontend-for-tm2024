import React from 'react';
import { Box, Text } from '@chakra-ui/react';

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
                <Text
                    key={category.id}
                    cursor="pointer"
                    fontWeight={selectedCategory === category.id ? 'bold' : 'normal'}
                    onClick={() => onSelectCategory(category.id)}
                    py={2}
                    px={4}
                    borderRadius="md"
                    bg={selectedCategory === category.id ? pastelColors[index % pastelColors.length] : ''} // 선택된 카테고리에 파스텔톤 색상 적용
                    _hover={{
                        bg: pastelColors[index % pastelColors.length], // 마우스 오버 시 파스텔톤 배경색 변경
                        textDecoration: 'underline',
                    }}
                    transition="background-color 0.2s, text-decoration 0.2s"
                    mb={2}
                >
                    {category.name}
                </Text>
            ))}
        </Box>
    );
};

export default CategoryListForDevAssignment;