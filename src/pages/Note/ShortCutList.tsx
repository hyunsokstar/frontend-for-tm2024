import React, { useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import { Box, useToast } from '@chakra-ui/react';
import DataGrid, { RenderCheckboxProps } from 'react-data-grid';
import useApiForGetAllShortcutList from '@/hooks/useApiForGetAllShortcutList';
import { SelectColumnForReactDataGrid } from '@/components/Formatter/CheckBox/SelectColumnForRdg';
import { ITypeForShortCutRow } from '@/types/typeForShortCut';
import SelectBoxForUserEmail from '@/components/GridEditor/SelectBox/SelectBoxForUserEmail';

type Props = {}

const ShortCutList = (props: Props) => {
    const pageNum = 1;
    const { isLoading, error, data: dataForShortCutList } = useApiForGetAllShortcutList({ pageNum });
    const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());
    const [shortcutRows, setShortcutRows] = useState<ITypeForShortCutRow[]>()
    const toast = useToast();

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
        }, { key: 'shortcut', name: 'Shortcut' }, // shortcut 추가
        { key: 'description', name: 'Description' }, // description 추가
        { key: 'category', name: 'Category' } // category 추가
    ];

    // const handleSave = () => {
    //     if (selectedRows.size === 0 || roadMapList.length === 0) {
    //         return;
    //     }
    //     const selectedRoadMapIds = Array.from(selectedRows).map((selectedId) => selectedId)

    //     const checkedRoadMaps = roadMapList.filter((roadMap) => {
    //         if (selectedRoadMapIds.includes(roadMap.id)) {
    //             return roadMap
    //         }
    //     })

    //     const roadMapsToSave = checkedRoadMaps
    //     mutationForSaveRoadMaps.mutate(roadMapsToSave);

    // };
    const handleDelete = () => {
        console.log('Delete button clicked');

        const checkNoteIdsForDelete = Array.from(selectedRows);
        // mutationForDeleteCheckedRows.mutate(checkNoteIdsForDelete)
    };

    // const handleAddRow = () => {
    //     console.log('Add Row button clicked');
    //     const randomId = Math.random().toString().substring(2, 7);
    //     const currentTime = Date.now().toString();
    //     const id = parseInt(randomId + currentTime, 10).toString().substring(0, 5);

    //     const newRow: ITypeForRoadMapRow = {
    //         type: "MASTER",
    //         id: id,
    //         title: '',
    //         description: '',
    //         category: '',
    //         email: loginUser.email ? loginUser.email : "",
    //         writer: {
    //             id: 0,
    //             email: '',
    //             password: '',
    //             nickname: '',
    //             role: '',
    //             gender: '',
    //             phoneNumber: null,
    //             backEndLevel: 0,
    //             frontEndLevel: 0,
    //             profileImage: null,
    //         },
    //         expanded: false
    //     }

    //     if (!isLoggedIn) {
    //         toast({
    //             title: "로그인 필요",
    //             description: "로그인 해주세요",
    //             status: "warning",
    //             duration: 3000,
    //             isClosable: true,
    //         });
    //         return null; // 로그인 안 되어 있으면 아무것도 렌더링하지 않음
    //     }

    //     // setRoadMapList((prev: ITypeForRoadMapRow[]) => [...prev, newRow])
    // };

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
    }, [])


    return (
        <Box width={"100%"} m={"auto"}>

            <Box display="flex" justifyContent="flex-end" mb={1}>
                {/* <Button onClick={handleSave} variant="outline" size="sm" mr={1}>
                    Save
                </Button>
                <Button onClick={handleDelete} variant="outline" size="sm" mr={1}>
                    Delete
                </Button>
                <Button onClick={handleAddRow} variant="outline" size="sm">
                    Add Row
                </Button> */}
            </Box>

            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : (
                <DataGrid
                    columns={columns}
                    rows={dataForShortCutList ? dataForShortCutList.shortCutList : []}

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
