import React from 'react';
import { Box } from '@chakra-ui/react';
import useApiForFindAllDevAssignments from '@/hooks/useApiForFindAllDevAssignments';
import TablesForDevAssignment from '@/components/Table/TablesForDevAssignment';

const DevRelay: React.FC = () => {
    const { isLoading, error, data: dataForAllDevAssignments } = useApiForFindAllDevAssignments(); // useApiForFindAllDevRelays 훅 사용하여 데이터 가져오기
    console.log("dataForAllDevAssignments : ", dataForAllDevAssignments);


    return (
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gridGap={4} paddingX={4}>
            <TablesForDevAssignment
                dataForAllDevAssignments={dataForAllDevAssignments ? dataForAllDevAssignments : []}
            />
        </Box>
    );
};

export default DevRelay;
