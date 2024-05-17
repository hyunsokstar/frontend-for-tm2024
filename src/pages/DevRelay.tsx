import React from 'react';
import { Box, Center, Text } from '@chakra-ui/react';
import useApiForFindAllDevAssignments from '@/hooks/useApiForFindAllDevAssignments';
import TablesForDevAssignment from '@/components/Table/TablesForDevAssignment';

const DevRelay: React.FC = () => {
    const { isLoading, error, data: dataForAllDevAssignments } = useApiForFindAllDevAssignments(); // useApiForFindAllDevRelays 훅 사용하여 데이터 가져오기
    console.log("dataForAllDevAssignments : ", dataForAllDevAssignments);


    return (
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gridGap={4} paddingX={4}>

            <Box bg="teal.500" p={4} gridColumn="1 / -1">
                <Center>
                    <Box bg="teal.500" p={4} gridColumn="1 / -1">
                        <Text color="white" fontWeight="bold" fontFamily="sans-serif" fontSize="xl">
                            웹 개발 핵심 기능 구현
                        </Text>
                    </Box>
                </Center>
            </Box>

            <TablesForDevAssignment
                dataForAllDevAssignments={dataForAllDevAssignments ? dataForAllDevAssignments : []}
            />
        </Box>
    );
};

export default DevRelay;
