import React, { useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import { Box, Button, Center, Text, useToast } from '@chakra-ui/react';
import DataGrid, { RenderCheckboxProps } from 'react-data-grid';
import { ITypeForTechNotesRowForRoadMapsMasterDetail } from '@/types/typeForRoadMap';
import { SelectColumnForReactDataGrid } from '../Formatter/CheckBox/SelectColumnForRdg';
import useSaveTechNotesMutation from '@/hooks/useSaveTechNotesMutation';
import useUser from '@/hooks/useUser';
import useApiForDeleteTechNotesForCheckedIds from '@/hooks/useApiForDeleteTechNotesForCheckedIds';
import CommonTextEditor from '../GridEditor/TextEditor/CommonTextEditor';
import SelectBoxForUserEmail from '../GridEditor/SelectBox/SelectBoxForUserEmail';
import { TechNote } from '@/types/typeForTechNote';

type Props = {
    techNotes: ITypeForTechNotesRowForRoadMapsMasterDetail[]; // techNotes 배열을 Props로 받음
    roadMapId: any
};



const DataGridForTechNotesForRoadMap: React.FC<Props> = ({ techNotes, roadMapId }) => {
    const toast = useToast();

    const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());

    const mutationForSaveTechNotes = useSaveTechNotesMutation();
    const [noteRows, setNoteRows] = useState<any[] | any>(techNotes);
    const { isLoggedIn, loginUser, logout } = useUser();

    const from = "roadMapPage"
    const deleteTechNoteRowsForCheckedIdsMutation = useApiForDeleteTechNotesForCheckedIds();
    console.log("techNotes : ", techNotes);


    const columns = [
        SelectColumnForReactDataGrid,
        {
            key: 'id',
            name: 'ID',
            width: 10,
        },
        {
            key: 'email',
            name: 'email',
            hidden: true,
            width: 200,
            renderCell({ row, tabIndex, onRowChange }: any): React.ReactNode {
                return (
                    <Box>{row.email}</Box>
                );
            },
            renderEditCell: SelectBoxForUserEmail
        },
        {
            key: 'title',
            name: 'Title',
            width: 500,

            renderEditCell: CommonTextEditor
        },

        {
            key: 'category',
            name: 'Category',
            width: 200,
            renderEditCell: CommonTextEditor
        },
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


    const deleteHandler = () => {

        if (selectedRows.size === 0) {
            toast({
                title: '삭제할 항목을 선택해주세요.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const checkNoteIdsForDelete = Array.from(selectedRows);
        deleteTechNoteRowsForCheckedIdsMutation.mutate(checkNoteIdsForDelete)
    }

    const saveHandler = () => {
        console.log("save handler excute !!");

        if (selectedRows.size === 0 || !noteRows) {
            return;
        }

        const selectedNoteIds = Array.from(selectedRows).map((selectedId) => selectedId)

        const techNoteRowsToSave = noteRows.filter((note: TechNote) => {
            if (selectedNoteIds.includes(note.id)) {
                return note
            }
        })

        console.log("roadMapId : ", roadMapId);

        // console.log('Selected Notes:', selectedNotes);
        mutationForSaveTechNotes.mutate({ techNotesToSave: techNoteRowsToSave, roadMapId });
    };

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

    // techNotes 배열을 rows로 설정
    // const rows = techNotes.map(note => ({
    //     id: note.id,
    //     title: note.title,
    //     skilnotes: note.skilnotes,
    //     description: note.description,
    //     category: note.category,
    //     createdAt: note.createdAt,
    //     updatedAt: note.updatedAt
    // }));

    const addRowHandler = () => {
        console.log("addRowHandler");
        // addrowhandler 는 뭔가?
        // 목표

        const randomId = Math.random().toString().substring(2, 7);
        const currentTime = Date.now().toString();
        const id = parseInt(randomId + currentTime, 10).toString().substring(0, 5);

        const newRow = {
            id: id,
            title: '',
            description: '',
            category: '',
            email: loginUser.email ? loginUser.email : "",
            skilnotes: []

        }

        setNoteRows((prev: TechNote[]) => [...prev, newRow])
    }

    function onRowsChange(rows: TechNote[], { indexes, column }: any) {
        // console.log("indexes : ", indexes);

        const row = rows[indexes[0]];
        if (row.type === 'MASTER') {
            console.log("here 1?");

            if (row.expanded) {
                console.log("here2 ? ");
                rows.splice(indexes[0] + 1, 0, {
                    type: 'DETAIL',
                    id: row.id + 100,
                    parentId: row.id
                });
            } else {
                console.log("here ?");

                if (column.key === "expanded")
                    rows.splice(indexes[0] + 1, 1);
            }
        }
        setNoteRows(rows);
    }

    // 2244
    useEffect(() => {
        if (techNotes) {
            const rowsToUpdate = techNotes?.map((note: any) => {
                return {
                    id: note.id,
                    email: note.writer.email,
                    title: note.title,
                    skilnotes: note.skilnotes ? note.skilnotes : [],
                    description: note.description,
                    category: note.category,
                    createdAt: note.createdAt,
                    updatedAt: note.updatedAt
                }
            })
            setNoteRows(rowsToUpdate);
        }
    }, [techNotes])

    return (
        <Box width={"100%"} >
            <Box display={"flex"} gap={2} px={2} justifyContent={"flex-end"} my={1}>
                <Button onClick={deleteHandler} variant={"outline"}>Delete</Button>
                <Button onClick={saveHandler} variant={"outline"}>save</Button>
                {isLoggedIn ?
                    <Button onClick={addRowHandler} variant={"outline"}>add</Button>
                    : ""}
            </Box>
            <Box>
                {noteRows.length !== 0 ? (
                    <DataGrid
                        columns={columns}
                        rows={noteRows}
                        rowKeyGetter={(row) => row.id}
                        renderers={{ renderCheckbox }}
                        selectedRows={selectedRows}
                        onSelectedRowsChange={setSelectedRows}
                        onRowsChange={onRowsChange}

                    />
                ) : (
                    <Center h="200px">
                        <Text fontSize="xl" fontWeight="bold">No techo note data</Text>
                    </Center>
                )}
            </Box>

        </Box>

    );
};


function renderCheckbox({ onChange, ...props }: RenderCheckboxProps) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
    }
    return <input type="checkbox" {...props} onChange={handleChange} />;
}

export default DataGridForTechNotesForRoadMap;
