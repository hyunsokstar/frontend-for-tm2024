import React, { useState } from 'react'
import 'react-data-grid/lib/styles.css';
import { Box } from '@chakra-ui/react'
import DataGrid, { RenderCheckboxProps } from 'react-data-grid';
import { SelectColumnForReactDataGrid } from '@/components/Formatter/CheckBox/SelectColumnForRdg';

const columns = [
    SelectColumnForReactDataGrid,
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' }
];

const rows = [
    { id: 0, title: 'Example' },
    { id: 1, title: 'Demo' }
];

type Props = {}

const RowReorder = (props: Props) => {
    const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());

    return (
        <Box width={"80%"} m={"auto"}>
            <DataGrid
                rowKeyGetter={(row) => row.id}
                columns={columns}
                rows={rows}
                renderers={{ renderCheckbox }}
                selectedRows={selectedRows}
                onSelectedRowsChange={setSelectedRows}
            />;
        </Box>
    )
}

function renderCheckbox({ onChange, ...props }: RenderCheckboxProps) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
    }
    return <input type="checkbox" {...props} onChange={handleChange} />;
}

export default RowReorder