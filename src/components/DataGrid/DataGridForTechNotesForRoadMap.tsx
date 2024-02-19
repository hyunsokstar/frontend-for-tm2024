import React from 'react';
import 'react-data-grid/lib/styles.css';
import { Box, Button } from '@chakra-ui/react';
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
        { key: 'updatedAt', name: 'Updated At' },
        {
            key: 'skilnotes',
            name: 'Skil Notes',
            width: 220,
            renderCell({ row, tabIndex, onRowChange }: any): React.ReactNode {
                return (
                    <Box border={"0px solid red"}>
                        <Button onClick={() => skilNotePageButtonClick(row.id)}
                            size={"sm"}
                            variant={"outline"}
                        >
                            {/* 스킬 노트 ({row.skilnotes.length}) */}
                            스킬 노트 ({row.skilnotes.length})
                        </Button>
                    </Box>
                );
            },
        },
    ];

    // techNotes 배열을 rows로 설정
    const rows = techNotes.map(note => ({
        id: note.id,
        title: note.title,
        skilnotes: note.skilnotes,
        description: note.description,
        category: note.category,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt
    }));

    const skilNotePageButtonClick = (techNoteId: any) => {
        console.log("skil note page button click", techNoteId);

        // 현재 URL 가져오기
        const currentURL = window.location.href;
        const baseUrl = currentURL.substring(0, currentURL.indexOf('/', 7)); // 7은 'http://' 다음의 첫 번째 '/' 인덱스입니다.

        console.log("currentURL : ", baseUrl);

        console.log("currentURL : ", currentURL);


        // 새로운 URL 생성
        const newURL = `${baseUrl}/Note/TechNoteList/${techNoteId}/SkilNoteListPage`;

        // 새 탭으로 열기
        window.open(newURL, '_blank');
    }

    return (
        <Box width={"100%"} >
            {/* techNotes 배열을 출력 */}
            <DataGrid columns={columns} rows={rows} />;
        </Box>
    );
};

export default DataGridForTechNotesForRoadMap;
