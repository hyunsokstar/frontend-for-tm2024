import React, { useMemo, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import { Box } from '@chakra-ui/react';
import DataGrid from 'react-data-grid';
import SummaryRow from '@/components/Formatter/SummaryRow';

const genders = ['man', 'girl'];
const statuses = ['ready', 'progress', 'testing', 'complete'];

interface SummaryRow {
    id: string;
    totalCount: number;
    totalCountForReady: number;
    totalCountForProgress: number;
}

const columns = [
    {
        key: 'id',
        name: 'ID',
        // width: 70,
        renderSummaryCell() {
            return <strong>Total</strong>;
        }
    }, // ID 열의 너비를 70으로 설정
    {
        key: 'task',
        name: 'Task',
        // width: 200,
        renderSummaryCell({ row }: any) {
            return `${row.totalCount} records`;
        }
    }, // Task 열의 너비를 200으로 설정
    {
        key: 'status',
        name: 'Status',
        // width: 150,
        renderSummaryCell({ row }: any) {
            return (
                <Box>
                    <Box>
                        ready: {row.totalCountForReady}
                    </Box>
                    <Box>
                        progress: {row.totalCountForProgress}
                    </Box>
                </Box>
            )
        }
    }, // Status 열의 너비를 150으로 설정
    {
        key: 'gender',
        name: 'Gender',
        // width: 150
    }, // Gender 열의 너비를 150으로 설정
];

const initialRows: any[] | (() => any[]) = []

for (let i = 1; i < 21; i++) {
    const newPatternRow = {
        id: i,
        task: `Task ${i}`,
        status: statuses[i % statuses.length],
        gender: genders[i % genders.length],
    };
    initialRows.push(newPatternRow);
}

const TotalCount = () => {
    // const rows = [];
    const [rows, setRows] = useState(initialRows)

    const summaryRows = useMemo((): readonly SummaryRow[] => {

        const countForReady = rows.filter((row) => {
            if (row.status === "ready") {
                return row
            }
        })

        const countForProgress = rows.filter((row) => {
            if (row.status === "progress") {
                return row
            }
        })

        return [
            {
                id: 'total_0',
                totalCount: rows.length,
                totalCountForReady: countForReady.length,
                totalCountForProgress: countForProgress.length
            }
        ];
    }, [rows]);

    return (
        <Box width="80%" m="auto" mt={5} height={"70vh"} border={"1px solid black"}>
            <DataGrid
                columns={columns}
                rows={rows}
                rowHeight={80}
                topSummaryRows={summaryRows}
                // bottomSummaryRows={summaryRows}
                headerRowHeight={50}
                style={{ width: "100%", height: '70vh' }} // 이렇게 직접 스타일로 설정 가능

            />
        </Box>
    );
};

export default TotalCount;
