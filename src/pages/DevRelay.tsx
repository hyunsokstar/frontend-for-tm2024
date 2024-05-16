import React from 'react';
import { Box } from '@chakra-ui/react';
import useApiForFindAllDevAssignments from '@/hooks/useApiForFindAllDevAssignments';
import TablesForDevAssignment from '@/components/Table/TablesForDevAssignment';

const DevRelay: React.FC = () => {
    const { isLoading, error, data: dataForAllDevAssignments } = useApiForFindAllDevAssignments(); // useApiForFindAllDevRelays 훅 사용하여 데이터 가져오기
    console.log("dataForAllDevAssignments : ", dataForAllDevAssignments);


    // 데이터 정의
    const days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const todoData: any[] = [
        { id: 1, title: 'Todo 1', notes: 'Some notes here...' },
        { id: 2, title: 'Todo 2', notes: 'Another set of notes...' },
        // ... more Todo items
    ];

    const subtitles: any = {
        Monday: '개발 환경 설정 및 인증 로직 구현',
        Tuesday: '기본 게시판 CRUD',
        Wednesday: '채팅 구현',
        Thursday: '결제 구현',
        Friday: '배포 및 운영',
        Saturday: 'Test 및 문서화',
        Sunday: '리팩토링 및 리뷰',
    };

    return (
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gridGap={4} paddingX={4}>
            <TablesForDevAssignment
                dataForAllDevAssignments={dataForAllDevAssignments ? dataForAllDevAssignments : []}
            />
        </Box>
    );
};

export default DevRelay;
