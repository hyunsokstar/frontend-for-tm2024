import React, { useState, useEffect } from 'react';
import 'react-data-grid/lib/styles.css';
import { Box } from '@chakra-ui/react';
import DataGrid, { RowsChangeData } from 'react-data-grid';
import { faker } from '@faker-js/faker';

import CellExpanderFormatter from '../ReactDataGrid/CellExpanderFormatter';

interface ITypeForParameterForRenderCell {
    row: IRoadMapRow;
    tabIndex: number;
    onRowChange: (updated: IRoadMapRow) => void;
}

type IRoadMapRow =
    | {
        type: 'MASTER';
        id: number;
        title: string;
        department: string;
        expanded: boolean;
    }
    | {
        type: 'DETAIL';
        id: number;
        title: string;
        parentId: number;
    };

const columns = [
    {
        key: 'expanded',
        name: '',
        minWidth: 30,
        width: 30,
        colSpan(args: any) {
            return args.type === 'ROW' && args.row.type === 'DETAIL' ? 3 : undefined;
        },
        renderCell({ row, tabIndex, onRowChange }: ITypeForParameterForRenderCell) {
            if (row.type === 'DETAIL') {
                return <Box>{row.title}, {row.parentId}</Box>;
            }

            return (
                <CellExpanderFormatter
                    expanded={row.expanded}
                    tabIndex={tabIndex}
                    onCellExpand={() => {
                        onRowChange({ ...row, expanded: !row.expanded });
                    }}
                />
            );
        },
    },
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' },
];

const MasterDetail = () => {
    const [testRows, setTestRows] = useState<IRoadMapRow[]>([]);

    useEffect(() => {
        const departments: IRoadMapRow[] = [];
        for (let i = 1; i < 30; i++) {
            departments.push({
                type: 'MASTER',
                id: i,
                title: faker.lorem.words(),
                department: faker.commerce.department(),
                expanded: false,
            });
        }
        setTestRows(departments);
    }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때 한 번만 실행됨을 의미

    function onRowsChange(rows: IRoadMapRow[], { indexes }: RowsChangeData<IRoadMapRow>) {
        const row = rows[indexes[0]];
        if (row.type === 'MASTER') {
            if (row.expanded) {
                rows.splice(indexes[0] + 1, 0, {
                    type: 'DETAIL',
                    title: faker.lorem.words(),
                    id: row.id + 100,
                    parentId: row.id,
                });
            } else {
                rows.splice(indexes[0] + 1, 1);
            }
            setTestRows([...rows]); // 새로운 배열을 생성하여 상태 업데이트
        }
    }

    return (
        <Box width={'100%'} m={'auto'}>
            <DataGrid rows={testRows} columns={columns} onRowsChange={onRowsChange} />
        </Box>
    );
};


export default MasterDetail;