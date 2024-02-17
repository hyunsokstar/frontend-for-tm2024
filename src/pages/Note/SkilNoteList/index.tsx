
import React from 'react'
import 'react-data-grid/lib/styles.css';
import { Box } from '@chakra-ui/react'
import DataGrid from 'react-data-grid';
import DataGridForSkilNoteList from '@/components/DataGrid/DataGridForSkilNoteList';



type Props = {}

const SkilNoteListPage = (props: Props) => {
    return (
        <Box width={"100%"} m={"auto"}>
            {/* <DataGrid columns={columns} rows={rows} />; */}
            <DataGridForSkilNoteList />
        </Box>
    )
}

export default SkilNoteListPage