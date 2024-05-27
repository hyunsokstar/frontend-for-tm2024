import React from 'react';
import {
    Box,
    Button,
    Text,
    IconButton,
    Spacer,
    useColorModeValue,
} from '@chakra-ui/react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import ModalButtonForUpdateCategoryForDevAssignment from '../Modal/ModalButtonForUpdateCategoryForDevAssignment';
import useApiForDeleteCategory from '@/hooks/useApiForDeleteCategory';
import { AssignmentCategory } from '@/types/typeForDevRelay';

interface Category {
    dev_assignments_count: number;
    id: number;
    name: string;
}

interface Props {
    categories: AssignmentCategory[];
    selectedCategory: number | null;
    onSelectCategory: (categoryId: number) => void;
    subjectId: number; // subjectId prop을 추가합니다.
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

const CategoryListForDevAssignment: React.FC<Props> = ({
    categories,
    selectedCategory,
    onSelectCategory,
    subjectId
}) => {
    const bgColor = useColorModeValue('gray.100', 'gray.700');

    // useApiForDeleteCategory custom hook을 사용하여 카테고리 삭제 함수를 생성합니다.
    const { mutate: deleteCategory } = useApiForDeleteCategory({ subjectId });

    return (
        <Box bg={bgColor} p={4} rounded="md">
            {categories.length === 0 ? (
                <Text>데이터 없음</Text>
            ) : (
                <Box>
                    {categories.map((category, index) => (
                        <Box
                            key={category.id}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            py={1}
                            pr={1}
                            mb={2}
                            bg={
                                selectedCategory === category.id
                                    ? pastelColors[index % pastelColors.length]
                                    : ''
                            }
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

                            <ModalButtonForUpdateCategoryForDevAssignment categoryId={category.id} categoryText={category.name} />
                            <IconButton
                                aria-label="Delete"
                                icon={<FiTrash />}
                                variant="outline"
                                size="xs"
                                colorScheme="red"
                                onClick={() => deleteCategory(category.id)}
                            />
                        </Box>
                    ))}
                </Box>
            )}

        </Box>
    );
};

export default CategoryListForDevAssignment;
