import React from 'react';
import { Box, Text } from '@chakra-ui/react';

interface Category {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
    selectedCategory: number | null;
    onSelectCategory: (categoryId: number) => void;
}

const CategoryListForDevAssignment: React.FC<Props> = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <Box>
            {categories.map((category) => (
                <Text
                    key={category.id}
                    cursor="pointer"
                    fontWeight={selectedCategory === category.id ? 'bold' : 'normal'}
                    onClick={() => onSelectCategory(category.id)}
                    py={2}
                    px={4}
                    borderRadius="md"
                    bg={selectedCategory === category.id ? 'blue.200' : ''}
                    _hover={{ bg: 'blue.100', textDecoration: 'underline' }}
                    transition="background-color 0.2s, text-decoration 0.2s"
                >
                    {category.name}
                </Text>
            ))}
        </Box>
    );
};

export default CategoryListForDevAssignment;
