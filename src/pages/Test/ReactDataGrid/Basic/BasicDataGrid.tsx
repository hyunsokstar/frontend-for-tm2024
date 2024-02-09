import React from 'react'
import 'react-data-grid/lib/styles.css';
import { Box } from '@chakra-ui/react'
import DataGrid from 'react-data-grid';

const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' }
];

const rows = [
    { id: 0, title: 'Example' },
    { id: 1, title: 'Demo' }
];

type Props = {}

const BasicDataGrid = (props: Props) => {
    return (
        <Box width={"80%"} m={"auto"}>
            <DataGrid columns={columns} rows={rows} />;
        </Box>
    )
}

export default BasicDataGrid