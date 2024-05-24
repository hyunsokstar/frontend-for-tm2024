import React, { useEffect, useState } from 'react';
import { Flex, Box, Button, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import useApiForGetAllCategoriesForDevAssignments from '@/hooks/useApiForGetAllCategoriesForDevAssignments';
import CategoryListForDevAssignment from '@/components/List/CategoryListForDevAssignment';
import DevAssignmentListForCategory from '@/components/List/DevAssignmentListForCategory';
import ModalButtonForCreateCategoryForDevAssignment from '@/components/Modal/ModalButtonForCreateCateogryForDevAssignment';
import ModalButtonForCreateDevAssignmentForCategory from '@/components/Modal/ModalButtonForCreateDevAssignmentForCategory';
import { useRouter } from 'next/router';

type Props = {};

const DevRelay: React.FC<Props> = () => {
    const router = useRouter();
    const { isLoading, error, data } = useApiForGetAllCategoriesForDevAssignments();
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    useEffect(() => {
        const categoryId = router.query.categoryId;
        if (categoryId) {
            setSelectedCategory(parseInt(categoryId as string));
        }
    }, [router.query.categoryId]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handleCategoryClick = (categoryId: number) => {
        setSelectedCategory(categoryId);
    };

    const handleAddCategory = () => {
        // 새 카테고리를 추가하는 로직을 여기에 구현하세요.
        console.log('Add new category');
    };

    console.log(
        "selectedCategory.id", selectedCategory
    );

    return (
        <Flex h="100vh">
            <Box
                left={0}
                top={'80px'}
                marginLeft={'-10px'}
                borderRightColor={'blue.200'}
                borderRightWidth={1}
                w={{ base: '100%', md: '20%' }}
                overflowY="auto"
                p={4}
            >
                <Box display="flex" justifyContent="flex-end" pr={0} mb={2}>
                    <ModalButtonForCreateCategoryForDevAssignment />
                </Box>
                <CategoryListForDevAssignment
                    categories={data || []}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategoryClick}
                />
            </Box>
            <Box flex="1" p={4}>
                <Box flex="1" p={4} display="flex" justifyContent="flex-end">
                    <ModalButtonForCreateDevAssignmentForCategory categoryId={selectedCategory} />
                </Box>

                {selectedCategory !== null && <DevAssignmentListForCategory categoryId={selectedCategory} />}
            </Box>
        </Flex>
    );
};

export default DevRelay;