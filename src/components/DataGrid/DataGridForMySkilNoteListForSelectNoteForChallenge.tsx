import React, { useState, useEffect } from 'react';
import 'react-data-grid/lib/styles.css';
import { Box } from '@chakra-ui/react';
import DataGrid from 'react-data-grid';
import useApiForGetAllMySkilNoteList from '@/hooks/useApiForGetAllMySkilNoteList';
import { ITypeForSkilNoteListRowForSelectNoteForChallenges } from '@/types/typeForSkilNote';

const DataGridForMySkilNoteListForSelectNoteForChallenge = () => {
    const [pageNum, setPageNum] = useState(1);
    const [skilNoteRows, setSkilNoteRows] = useState<any[]>([])
    const { isLoading, error, data } = useApiForGetAllMySkilNoteList({ pageNum }); // 1페이지의 데이터를 요청

    console.log("data ????????????????????? ", data);


    useEffect(() => {
        if (data) {
            const transformedRows = data.allMySkilNoteList.map((row: ITypeForSkilNoteListRowForSelectNoteForChallenges) => ({
                id: row.id,
                title: row.title,
                category: row.category,
                createdAt: row.createdAt,
            }));
            setSkilNoteRows(transformedRows);
        }
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const columns = [
        { key: 'id', name: 'ID' },
        { key: 'title', name: 'Title' },
        { key: 'category', name: 'Category' },
        { key: 'createdAt', name: 'Created At' },
    ];

    return (
        <Box width={"100%"} m={"auto"}>
            <DataGrid columns={columns} rows={skilNoteRows} />
        </Box>
    );
};

export default DataGridForMySkilNoteListForSelectNoteForChallenge;
