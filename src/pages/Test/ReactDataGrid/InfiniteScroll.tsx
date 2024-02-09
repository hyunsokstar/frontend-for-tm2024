"use client"
import { faker } from '@faker-js/faker';
import { useState } from 'react';
import DataGrid, { Column } from 'react-data-grid';
import { css } from '@linaria/core';
import styles from './infiniteScroll.module.scss';
import 'react-data-grid/lib/styles.css';
import { Box } from '@chakra-ui/react';


// const loadMoreRowsClassname = css`
//   inline-size: 180px;
//   padding-block: 8px;
//   padding-inline: 16px;
//   position: absolute;
//   inset-block-end: 8px;
//   inset-inline-end: 8px;
//   color: white;
//   line-height: 35px;
//   background: rgb(0 0 0 / 0.6);
// `;

type Props = {}

interface Row {
    id: string;
    email: string;
    title: string;
    firstName: string;
    lastName: string;
}


const columns: readonly Column<Row>[] = [
    {
        key: 'id',
        name: 'ID'
    },
    {
        key: 'title',
        name: 'Title'
    },
    {
        key: 'firstName',
        name: 'First Name'
    },
    {
        key: 'lastName',
        name: 'Last Name'
    },
    {
        key: 'email',
        name: 'Email'
    }
];

function createFakeRowObjectData(index: number): Row {
    return {
        id: `id_${index}`,
        email: faker.internet.email(),
        title: faker.person.prefix(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
    };
}

function createRows(numberOfRows: number): Row[] {
    const rows: Row[] = [];

    for (let i = 0; i < numberOfRows; i++) {
        rows[i] = createFakeRowObjectData(i);
    }

    return rows;
}

function isAtBottom({ currentTarget }: React.UIEvent<HTMLDivElement>): boolean {
    return currentTarget.scrollTop + 10 >= currentTarget.scrollHeight - currentTarget.clientHeight;
}

function rowKeyGetter(row: Row) {
    return row.id;
}

function loadMoreRows(newRowsCount: number, length: number): Promise<Row[]> {
    return new Promise((resolve) => {
        const newRows: Row[] = [];

        for (let i = 0; i < newRowsCount; i++) {
            newRows[i] = createFakeRowObjectData(i + length);
        }

        setTimeout(() => resolve(newRows), 1000);
    });
}

// Test\ReactDataGrid\InfiniteScroll.tsx
const InfiniteScroll = (props: Props) => {
    const [rows, setRows] = useState(() => createRows(50));
    const [isLoading, setIsLoading] = useState(false);


    async function handleScroll(event: React.UIEvent<HTMLDivElement>) {
        if (isLoading || !isAtBottom(event)) return;

        setIsLoading(true);

        const newRows = await loadMoreRows(50, rows.length);

        setRows([...rows, ...newRows]);
        setIsLoading(false);
    }

    return (
        <Box width={"100%"}>
            <DataGrid
                columns={columns}
                rows={rows}
                rowKeyGetter={rowKeyGetter}
                onRowsChange={setRows}
                rowHeight={30}
                onScroll={handleScroll}
                className="fill-grid"
                direction={"ltr"}
            />
            {isLoading && <div className={styles.loadMoreRowsClassname}>Loading more rows...</div>}
        </Box>
    )
}

export default InfiniteScroll