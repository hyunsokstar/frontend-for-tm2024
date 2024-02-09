import React from 'react';
import { Stack, Button, Text } from '@chakra-ui/react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

type MyPaginationProps = {
    totalCount?: number;
    perPage?: number;
    currentPage?: number;
    setCurrentPage: (page: number) => void;
};

const MyPagination: React.FC<MyPaginationProps> = ({
    totalCount,
    perPage,
    currentPage,
    setCurrentPage,
}) => {
    const onChange = (page: number) => {
        setCurrentPage(page);
        // 페이지 변경 시 필요한 로직을 추가하세요.
    };

    return (
        <Stack direction="row" spacing={2} align="center">
            {/* <Text>Showing {perPage} items per page</Text> */}
            <Pagination
                onChange={onChange}
                current={currentPage}
                total={totalCount}
                pageSize={perPage}
            />
        </Stack>
    );
};

export default MyPagination;
