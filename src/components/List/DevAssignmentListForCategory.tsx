import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import useApiForFindDevAssignmentsByCategory from '@/hooks/useApiForFindDevAssignmentsByCategory';
import TablesForDevAssignment from '../Table/TablesForDevAssignment';

interface Props {
    categoryId: number;
}

const DevAssignmentListForCategory: React.FC<Props> = ({ categoryId }) => {
    // 여기서 categoryId를 이용해서 해당 카테고리에 해당하는 할당 목록을 가져오는 로직을 구현하시면 됩니다.
    const { data: devAssignments, isLoading, isError } = useApiForFindDevAssignmentsByCategory(categoryId);

    console.log("devAssignments : ", devAssignments);


    return (
        <Box>
            <Text>{`Category ID: ${categoryId}`}</Text>
            <TablesForDevAssignment devAssignments={devAssignments ? devAssignments : []} />
        </Box>
    );
};

export default DevAssignmentListForCategory;
