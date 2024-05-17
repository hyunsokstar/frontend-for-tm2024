import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import useApiForFindAllDevAssignments from '@/hooks/useApiForFindAllDevAssignments';
import TablesForDevAssignment from '@/components/Table/TablesForDevAssignment';
import { AssignmentCategory } from '@/types/typeForDevRelay';
import CategoryMenuForDevAssignment from '@/components/Menus/CategoryMenuForDevAssignment';

const DevRelay: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<AssignmentCategory | null>(null);
    const { isLoading, error, data: dataForAllDevAssignments } = useApiForFindAllDevAssignments(selectedCategory);
    console.log("dataForAllDevAssignments : ", dataForAllDevAssignments);

    const handleCategorySelect = (category: AssignmentCategory) => {
        setSelectedCategory(category); // 카테고리 선택 시 상태 업데이트
        console.log("Selected category:", category);
    };

    return (
        <Box>
            <Box mb={5}>
                <CategoryMenuForDevAssignment selectedCategory={selectedCategory} onSelectCategory={handleCategorySelect} /> {/* 선택된 카테고리 상태 전달 */}
            </Box>

            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gridGap={4} paddingX={4}>
                <TablesForDevAssignment
                    dataForAllDevAssignments={dataForAllDevAssignments ? dataForAllDevAssignments : []}
                />
            </Box>
        </Box>
    );
};

export default DevRelay;
