import React from 'react';
import 'react-data-grid/lib/styles.css';
import { Box } from '@chakra-ui/react';
import DataGrid from 'react-data-grid';
import useApiForGetAllShortcutList from '@/hooks/useApiForGetAllShortcutList';

type Props = {}

const ShortCutList = (props: Props) => {
    const pageNum = 1;
    const { isLoading, error, data: dataForShortCutList } = useApiForGetAllShortcutList({ pageNum });

    const columns = [
        { key: 'id', name: 'ID' },
        { key: 'shortcut', name: 'Shortcut' }, // shortcut 추가
        { key: 'description', name: 'Description' }, // description 추가
        { key: 'category', name: 'Category' } // category 추가
    ];

    return (
        <Box width={"100%"} m={"auto"}>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : (
                <DataGrid columns={columns} rows={dataForShortCutList ? dataForShortCutList.shortCutList : []} />
            )}
        </Box>
    );
};

export default ShortCutList;
