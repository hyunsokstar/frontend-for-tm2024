import React from 'react';
import 'react-data-grid/lib/styles.css';
import { Box } from '@chakra-ui/react';
import DataGrid from 'react-data-grid';
import { ITypeForCurriculmnRowForSkilNoteForTechNote } from '@/types/typeForTechNote';

type Props = {
    curriculmns: ITypeForCurriculmnRowForSkilNoteForTechNote[];
}

const DataGridForCorriculumnsForSkilNotesForTechNoteId: React.FC<Props> = ({ curriculmns: curriculmns }) => {

    console.log("curriculmns ??? ", curriculmns);


    // 컬럼 설정
    const columns = [
        // { key: 'id', name: 'ID' },
        { key: 'title', name: 'Title' },
        { key: 'isCompleted', name: 'Completed' },
        { key: 'authorityForEdit', name: 'Authority For Edit' },
        { key: 'createdAt', name: 'Created At' },
        { key: 'updatedAt', name: 'Updated At' }
    ];

    // 행 설정
    const rows = curriculmns.map((curriculum) => ({
        id: curriculum.id,
        title: curriculum.skilNote.title,
        isCompleted: curriculum.isCompleted ? 'Yes' : 'No',
        authorityForEdit: curriculum.authorityForEdit ? 'Yes' : 'No',
        createdAt: curriculum.createdAt,
        updatedAt: curriculum.updatedAt,
    }));

    return (
        <Box width={"100%"} m={"auto"}>
            <DataGrid columns={columns} rows={rows} />
        </Box>
    );
}

export default DataGridForCorriculumnsForSkilNotesForTechNoteId;
