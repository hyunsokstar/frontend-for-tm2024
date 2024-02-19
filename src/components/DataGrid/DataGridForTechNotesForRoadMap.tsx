import React from 'react';
import 'react-data-grid/lib/styles.css';
import { Box } from '@chakra-ui/react';
import DataGrid from 'react-data-grid';
import { ITypeForTechNotesRowForRoadMapsMasterDetail } from '@/types/typeForRoadMap';

type Props = {
    techNotes: ITypeForTechNotesRowForRoadMapsMasterDetail[]; // techNotes 배열을 Props로 받음
};

const DataGridForTechNotesForRoadMap: React.FC<Props> = ({ techNotes }) => {
    const columns = [
        { key: 'id', name: 'ID' },
        { key: 'title', name: 'Title' },
        { key: 'description', name: 'Description' },
        { key: 'category', name: 'Category' },
        { key: 'createdAt', name: 'Created At' },
        { key: 'updatedAt', name: 'Updated At' }
    ];

    // techNotes 배열을 rows로 설정
    const rows = techNotes.map(note => ({
        id: note.id,
        title: note.title,
        description: note.description,
        category: note.category,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt
    }));

    return (
        <Box width={"100%"} m={"auto"}>
            {/* techNotes 배열을 출력 */}
            <DataGrid columns={columns} rows={rows} />;
        </Box>
    );
};

export default DataGridForTechNotesForRoadMap;
