import React, { useState } from 'react';
import 'react-data-grid/lib/styles.css';
import { Box } from '@chakra-ui/react';
import DataGrid from 'react-data-grid';

const columns = [
    {
        key: 'id',
        name: 'ID',
    }, // ID 열의 너비를 70으로 설정
    {
        key: 'task',
        name: 'Task',
    }, // Task 열의 너비를 200으로 설정
    {
        key: 'status',
        name: 'Status',
    }, // Status 열의 너비를 150으로 설정
    {
        key: 'gender',
        name: 'Gender',
    }, // Gender 열의 너비를 150으로 설정
];

const genders = ['man', 'girl'];
const statuses = ['ready', 'progress', 'testing', 'complete'];

const initialRows: {
    id: number;
    task: string;
    status: string;
    gender: string;
}[] = [];

for (let i = 0; i < 20; i++) {
    const newPatternRow = {
        id: i,
        task: `Task ${i}`,
        status: statuses[i % statuses.length],
        gender: genders[i % genders.length],
    };
    initialRows.push(newPatternRow);
}

const DataGridWithSampleData = () => {

    const [rows, setRows] = useState(initialRows)

    return (
        <Box width="80%" m="auto" mt={5} px={5}>
            <Box>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    style={{ width: "100%" }}
                />
            </Box>
        </Box>
    );
};

export default DataGridWithSampleData;
