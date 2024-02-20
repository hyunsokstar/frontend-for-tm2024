import React, { useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import { Box, Button, useToast } from '@chakra-ui/react';
import DataGrid, { RenderCheckboxProps, RowsChangeData } from 'react-data-grid';
import useApiForGetAllShortcutList from '@/hooks/useApiForGetAllShortcutList';
import { SelectColumnForReactDataGrid } from '@/components/Formatter/CheckBox/SelectColumnForRdg';
import { ITypeForShortCutRow } from '@/types/typeForShortCut';
import SelectBoxForUserEmail from '@/components/GridEditor/SelectBox/SelectBoxForUserEmail';
import CommonTextEditor from '@/components/GridEditor/TextEditor/CommonTextEditor';
import useApiForSaveShortCuts from '@/hooks/useApiForSaveShortCuts';
import useApiForDeleteShortCutForCheckedIds from '@/hooks/useApiForDeleteShortCutForCheckedIds';
import { ITypeForRoadMapRow } from '@/types/typeForRoadMap';
import useUser from '@/hooks/useUser';

type Props = {}

const ShortCutList = (props: Props) => {
    const toast = useToast();
    const pageNum = 1;
    const { isLoading, error, data: dataForShortCutList } = useApiForGetAllShortcutList({ pageNum });
    const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());
    const [shortcutRows, setShortcutRows] = useState<ITypeForShortCutRow[]>([])
    const saveShortcutsMutation = useApiForSaveShortCuts(pageNum); // useApiForSaveShortCuts 훅을 호출합니다.
    const deleteShortcutsMutation = useApiForDeleteShortCutForCheckedIds(pageNum); // useApiForDeleteShortCutForCheckedIds 훅을 호출합니다.
    const { isLoggedIn, loginUser, logout } = useUser();


    const columns = [
        SelectColumnForReactDataGrid,
        { key: 'id', name: 'ID' },
        {
            key: 'email',
            name: 'email',
            hidden: true,
            width: 200,
            renderCell({ row, tabIndex, onRowChange }: any): React.ReactNode {
                return (
                    <Box>{row.writer.email}</Box>
                );
            },
            renderEditCell: SelectBoxForUserEmail
        },
        {
            key: 'shortcut',
            name: 'Shortcut',
            renderEditCell: CommonTextEditor,
        }, // shortcut 추가
        {
            key: 'description',
            name: 'Description',
            renderEditCell: CommonTextEditor,
        }, // description 추가
        {
            key: 'category',
            name: 'Category',
            renderEditCell: CommonTextEditor,
        } // category 추가
    ];

    const handleSave = () => {
        console.log("save 클릭  :", selectedRows);

        if (selectedRows.size === 0 || shortcutRows?.length === 0) {
            console.log("here ?");

            return;
        }
        const selectedShortCutIds = Array.from(selectedRows).map((selectedId) => selectedId)

        const checkedShortCuts = shortcutRows?.filter((shortcut) => {
            if (selectedShortCutIds.includes(shortcut.id)) {
                return shortcut
            }
        })

        const shortCutsToSave = checkedShortCuts
        saveShortcutsMutation.mutate(shortCutsToSave);

    };

    const handleDelete = () => {
        console.log('Delete button clicked');

        const checkNoteIdsForDelete = Array.from(selectedRows);
        deleteShortcutsMutation.mutate(checkNoteIdsForDelete)
    };

    const handleAddRow = () => {
        console.log('Add Row button clicked');
        const randomId = Math.random().toString().substring(2, 7);
        const currentTime = Date.now().toString();
        const id = parseInt(randomId + currentTime, 10).toString().substring(0, 5);

        const newRow: ITypeForShortCutRow = {
            id: id,
            description: '',
            shortcut: '',
            category: '',
            writer: {
                id: 0,
                email: loginUser.email,
                password: '',
                nickname: '',
                role: '',
                gender: '',
                phoneNumber: null,
                backEndLevel: 0,
                frontEndLevel: 0,
                profileImage: null,
            },
        }

        if (!isLoggedIn) {
            toast({
                title: "로그인 필요",
                description: "로그인 해주세요",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return null; // 로그인 안 되어 있으면 아무것도 렌더링하지 않음
        }

        setShortcutRows((prev: ITypeForShortCutRow[]) => [newRow, ...prev])
    };

    function onRowsChange(
        rows: ITypeForShortCutRow[],
        { indexes }: RowsChangeData<ITypeForShortCutRow>
    ) {
        console.log("onRowsChange excute check ???", rows);

        // console.log("onRowsChange excute check ???");
        // const row = rows[indexes[0]];
        // if (row.type === 'MASTER') {
        //     if (row.expanded) {
        //         rows.splice(indexes[0] + 1, 0, {
        //             type: 'DETAIL',
        //             title: 'sample title',
        //             id: row.id + 100,
        //             techNotes: row.techNotes,
        //             parentId: row.id,
        //         });
        //     } else {
        //         rows.splice(indexes[0] + 1, 1);
        //     }
        setShortcutRows(rows); // 새로운 배열을 생성하여 상태 업데이트
    }

    useEffect(() => {
        let shortCutRowsForUpdate: ITypeForShortCutRow[] = [];
        if (dataForShortCutList && dataForShortCutList.shortCutList) {
            shortCutRowsForUpdate = [];
            dataForShortCutList.shortCutList.forEach((row: ITypeForShortCutRow) => {
                shortCutRowsForUpdate.push({
                    id: row.id,
                    writer: row.writer,
                    description: row.description,
                    category: row.category,
                    shortcut: row.shortcut,
                });
            });
        }
        setShortcutRows(shortCutRowsForUpdate)
    }, [dataForShortCutList])


    return (
        <Box width={"100%"} m={"auto"}>

            <Box display="flex" justifyContent="flex-end" mb={1}>
                <Button onClick={handleSave} variant="outline" size="sm" mr={1}>
                    Save
                </Button>
                <Button onClick={handleDelete} variant="outline" size="sm" mr={1}>
                    Delete
                </Button>

                <Button onClick={handleAddRow} variant="outline" size="sm">
                    Add Row
                </Button>

            </Box>

            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : (
                <DataGrid
                    columns={columns}
                    rows={shortcutRows}
                    onRowsChange={onRowsChange}
                    rowKeyGetter={(row) => row.id}
                    renderers={{ renderCheckbox }}
                    selectedRows={selectedRows}
                    onSelectedRowsChange={setSelectedRows}

                />
            )}
        </Box>
    );
};

function renderCheckbox({ onChange, ...props }: RenderCheckboxProps) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
    }
    return <input type="checkbox" {...props} onChange={handleChange} />;
}

export default ShortCutList;
