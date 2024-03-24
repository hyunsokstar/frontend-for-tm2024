import React, { useState, useEffect } from 'react';
import 'react-data-grid/lib/styles.css';
import { Box, Button } from '@chakra-ui/react';
import DataGrid from 'react-data-grid';
import useApiForGetAllMySkilNoteList from '@/hooks/useApiForGetAllMySkilNoteList';
import { ITypeForSkilNoteListRowForSelectNoteForChallenges } from '@/types/typeForSkilNote';
import useApiForUpdateParticipantNoteUrl from '@/hooks/useApiForUpdateParticipantNoteUrl';

interface IProps {
    subChallengeId: number;
    participantId: number;
    setIsOpen: (isOpen: boolean) => void;
}

const DataGridForMySkilNoteListForSelectNoteForChallenge = ({ setIsOpen, subChallengeId, participantId }: IProps) => {
    const [pageNum, setPageNum] = useState(1);
    const [skilNoteRows, setSkilNoteRows] = useState<any[]>([])
    const { isLoading, error, data } = useApiForGetAllMySkilNoteList({ pageNum }); // 1페이지의 데이터를 요청

    const mutationForUpdateParticipantNoteUrl = useApiForUpdateParticipantNoteUrl(subChallengeId);


    const selectNoteButtonClick = (noteId: number) => {
        const noteUrlToUpdate = `/Note/SkilNoteContents/${noteId}/1`;
        // participantId
        mutationForUpdateParticipantNoteUrl.mutate({
            participantId,
            noteUrlForUpdate: noteUrlToUpdate
        })
        setIsOpen(false)
        // todo: 
        // participantId, noteUrlToUpdate 를 이용해 apiForUpdateIsPassedForParticipantForSubChallenge.mutate 호출
    }

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
        {
            key: 'select',
            name: 'select',
            renderCell: (props: any) => (
                <Box>
                    <Button variant={"outline"} size={"xs"} onClick={() => selectNoteButtonClick(props.row.id)}>선택 ({props.row.id})</Button>
                </Box>
            )
        }
    ];

    return (
        <Box width={"100%"} m={"auto"}>
            <DataGrid columns={columns} rows={skilNoteRows} />
        </Box>
    );
};

export default DataGridForMySkilNoteListForSelectNoteForChallenge;
