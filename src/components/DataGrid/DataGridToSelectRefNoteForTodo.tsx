import React, { useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import { Box, Button, useToast } from '@chakra-ui/react';
import DataGrid, { RenderCheckboxProps, RowsChangeData, SelectColumn, textEditor } from 'react-data-grid';
import useGetAllTechNoteList from '@/hooks/useGetAllTechNoteList';
import { SelectColumnForReactDataGrid } from '@/components/Formatter/CheckBox/SelectColumnForRdg';
import CommonTextEditor from '@/components/GridEditor/TextEditor/CommonTextEditor';
import useSaveTechNotesMutation from '@/hooks/useSaveTechNotesMutation';
import SelectBoxForUserEmail from '@/components/GridEditor/SelectBox/SelectBoxForUserEmail';
import useUser from '@/hooks/useUser';
import DataGridForSkilNoteListForTechNoteId2 from '@/components/DataGrid/DataGridForSkilNoteListForTechNoteId2';
import useApiForDeleteTechNotesForCheckedIds from '@/hooks/useApiForDeleteTechNotesForCheckedIds';
import CellExpanderFormatter from '@/pages/Test/ReactDataGrid/CellExpanderFormatter';

interface IProps {
    isOpen: boolean
}

const DataGridToSelectRefNoteForTodo = ({ isOpen }: IProps) => {
    const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());
    const [noteRows, setNoteRows] = useState<TechNote[] | any>();
    const { isLoggedIn, loginUser, logout } = useUser();
    const toast = useToast();
    const deleteTechNoteRowsForCheckedIdsMutation = useApiForDeleteTechNotesForCheckedIds();

    const columns = [
        SelectColumnForReactDataGrid,
        // { key: "id", name: "id" },
        {
            key: 'expanded',
            name: '',
            minWidth: 30,
            width: 30,
            colSpan(args: any) {
                return args.type === 'ROW' && args.row.type === 'DETAIL' ? 6 : undefined;
            },
            renderCell({ row, tabIndex, onRowChange }: any): React.ReactNode {
                if (row.type === 'DETAIL') {
                    return <DataGridForSkilNoteListForTechNoteId2 techNoteId={row.parentId} isOpen={isOpen} />;
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
            }
        },
        // { key: 'id', name: 'ID' }, // Column에 id 추가
        {
            key: 'email',
            name: 'email',
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
            renderEditCell: CommonTextEditor
        },
        // {
        //     key: 'description',
        //     name: 'Description',
        //     renderEditCell: CommonTextEditor,
        // },
        {
            key: 'category',
            name: 'Category',
            renderEditCell: CommonTextEditor
        },
        { key: 'createdAt', name: 'Created At' },
    ];
    const [pageNum, setPageNum] = useState(1);

    // useQuery
    const { isLoading, error, data: dataForTechNoteList } = useGetAllTechNoteList(pageNum);

    // mutation
    const mutationForSaveTodoRows = useSaveTechNotesMutation();

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
            email: loginUser.email ? loginUser.email : ""
        }

        setNoteRows((prev: TechNote[]) => [...prev, newRow])
    }

    const saveHandler = () => {
        if (selectedRows.size === 0 || !noteRows) {
            return;
        }

        const selectedNoteIds = Array.from(selectedRows).map((selectedId) => selectedId)

        const techNoteRowsToSave = noteRows.filter((note: TechNote) => {
            if (selectedNoteIds.includes(note.id)) {
                return note
            }
        })

        // console.log('Selected Notes:', selectedNotes);
        mutationForSaveTodoRows.mutate(techNoteRowsToSave);
    };

    // fix
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

    useEffect(() => {
        if (!isLoading) {
            const rowsToUpdate = dataForTechNoteList?.techNoteList.map((row: any) => {
                return {
                    id: row.id,
                    email: row.writer ? row.writer.email : "",
                    title: row.title,
                    description: row.description,
                    category: row.category,
                    createdAt: row.createdAt,
                    type: "MASTER",
                    expanded: false,
                }
            })
            setNoteRows(rowsToUpdate);
        }
    }, [dataForTechNoteList])



    // 2244
    return (
        <Box width={"98%"} m={"auto"} border={"2px solid blue"}>
            <Box display={"flex"} justifyContent={"flex-end"} my={2} gap={2}>
                <Button onClick={deleteHandler} variant={"outline"}>Delete</Button>
                <Button onClick={saveHandler} variant={"outline"}>save</Button>
                {isLoggedIn ?
                    <Button onClick={addRowHandler} variant={"outline"}>add</Button>
                    : ""}
            </Box>
            <Box width={"100%"} border={"2px solid red"} py={1}>
                <DataGrid
                    rowKeyGetter={(row) => row.id}
                    columns={columns}
                    rows={noteRows ? noteRows : []}
                    renderers={{ renderCheckbox }}
                    selectedRows={selectedRows}
                    onSelectedRowsChange={setSelectedRows}
                    onRowsChange={onRowsChange}
                    rowHeight={(row) => (row.type === 'DETAIL' ? 420 : 50)}
                    style={{ width: "100%", height: "80vh", borderColor: "orange" }}
                />
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

export default DataGridToSelectRefNoteForTodo;


