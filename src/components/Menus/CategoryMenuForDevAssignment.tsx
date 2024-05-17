import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { AssignmentCategory } from '@/types/typeForDevRelay';

interface CategoryMenuForDevAssignmentProps {
    selectedCategory: AssignmentCategory | null; // 선택된 카테고리 상태 추가
    onSelectCategory: (category: AssignmentCategory) => void;
}

const CategoryMenuForDevAssignment: React.FC<CategoryMenuForDevAssignmentProps> = ({ selectedCategory, onSelectCategory }) => {
    const handleCategoryClick = (category: AssignmentCategory) => {
        onSelectCategory(category);
    };

    return (
        <Box bg="teal.500" p={4} display="flex">
            {Object.values(AssignmentCategory).map((category) => (
                <Box
                    key={category}
                    p={2}
                    cursor="pointer"
                    _hover={{ bg: 'teal.700', color: 'white' }}
                    onClick={() => handleCategoryClick(category)}
                    bg={selectedCategory === category ? 'teal.700' : ''}
                    color={selectedCategory === category ? 'white' : ''}
                    borderRadius="md"
                    mx={1}
                    transition="all 0.3s"
                >
                    <Text>{category}</Text>
                </Box>
            ))}
        </Box>
    );
};

export default CategoryMenuForDevAssignment;
