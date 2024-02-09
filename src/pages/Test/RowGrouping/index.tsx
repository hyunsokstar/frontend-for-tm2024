import React, { useState } from 'react';
import { Box, Checkbox, Input } from '@chakra-ui/react';
import DataGrid, { Column, TreeDataGrid } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { groupBy as rowGrouper } from 'lodash-es';
import styles from './groupby.module.scss';


type Row = {
    id: number;
    title: string;
    email: string;
    status: string;
    priority: string;
    gender: string;
    month: string;
};

const columns: readonly Column<Row>[] = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' },
    { key: 'email', name: 'Email' },
    { key: 'status', name: 'Status' },
    { key: 'priority', name: 'Priority' },
    { key: 'gender', name: 'Gender' },
    { key: 'month', name: 'Month' },
];

const generateRows = (): Row[] => {
    const rows: Row[] = [];
    const titles = ['Example', 'Demo']; // For repeating titles
    const emails = ['test@example.com', 'user@example.com', 'another@example.com']; // Sample emails
    const priorities = ['1', '2', '3', '4', '5']; // Priorities
    const statuses = [
        'ready',
        'progress',
        'testing',
        'complete'
    ]; // Statuses

    const months = Array.from({ length: 12 }, (_, i) => {
        const date = new Date(0, i);
        return date.toLocaleString('default', { month: 'long' });
    });

    for (let i = 1; i < 20; i++) {
        rows.push({
            id: i,
            title: titles[i % titles.length],
            email: emails[i % emails.length],
            status: statuses[i % statuses.length],
            priority: priorities[i % priorities.length],
            gender: i % 2 === 0 ? 'Male' : 'Female',
            month: months[i % priorities.length],
        });
    }

    return rows;
};


const options = [
    'email',
    'status',
    'priority',
    'gender',
    'month'
] as const;


// 1122
const GroupBy = () => {
    const rows = generateRows();

    // step1 group by 관련 state 선언 1
    const [selectedOptions, setSelectedOptions] = useState<readonly string[]>([
        // options[0],
        // options[1]
    ]);

    // step2 group by 관련 state 선언 2
    const [expandedGroupIds, setExpandedGroupIds] = useState(
        (): ReadonlySet<unknown> =>
            new Set<unknown>(['United States of America', 'United States of America__2015'])
    );


    function toggleOption(option: string, enabled: boolean) {
        const index = selectedOptions.indexOf(option);
        if (enabled) {
            if (index === -1) {
                setSelectedOptions((options) => [...options, option]);
            }
        } else if (index !== -1) {
            setSelectedOptions((options) => {
                const newOptions = [...options];
                newOptions.splice(index, 1);
                return newOptions;
            });
        }
        setExpandedGroupIds(new Set());
    }

    function rowKeyGetter(row: Row) {
        return row.id;
    }



    return (
        <Box width={"80%"} m={"auto"}>
            {/* className={styles.groupingClassname} */}
            <Box display={"flex"} gap="2" my={1} mt={2} >
                <b>Group by:</b>
                <Box display={"flex"} gap={2}>
                    {options.map((option) => (
                        <label key={option}>
                            <input
                                type="checkbox"
                                checked={selectedOptions.includes(option)}
                                onChange={(event) => toggleOption(option, event.target.checked)}
                            />{' '}
                            {option}
                        </label>
                    ))}

                </Box>
            </Box>

            <TreeDataGrid
                columns={columns}
                rows={rows}

                rowKeyGetter={rowKeyGetter}
                style={{ height: "60vh" }}

                groupBy={selectedOptions}
                rowGrouper={rowGrouper}
                expandedGroupIds={expandedGroupIds}
                onExpandedGroupIdsChange={setExpandedGroupIds}

                defaultColumnOptions={{ resizable: true }}
                direction={'ltr'}

            />
        </Box>
    );
};

export default GroupBy;
