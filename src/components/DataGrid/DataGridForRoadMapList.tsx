import React, { useEffect, useState } from 'react'
import 'react-data-grid/lib/styles.css';
import { Box, Button } from '@chakra-ui/react'
import DataGrid, { RenderCheckboxProps } from 'react-data-grid';
import useApiForGetAllRoadMapList from '@/hooks/useApiForGetAllRoadMapList';
import { SelectColumnForReactDataGrid } from '../Formatter/CheckBox/SelectColumnForRdg';
import SelectBoxForUserEmail from '../GridEditor/SelectBox/SelectBoxForUserEmail';
import CommonTextEditor from '../GridEditor/TextEditor/CommonTextEditor';
import { ITypeForRoadMapRow } from '@/types/typeForRoadMap';
import useApiForSaveRoadMaps from '@/hooks/useApiForSaveRoadMaps';
import useApiForDeleteRoadMapsForCheckedIds from '@/hooks/useApiForDeleteRoadMapsForCheckedIds';

const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' }
];

const rows = [
    { id: 0, title: 'Example' },
    { id: 1, title: 'Demo' }
];

const columns2 = [
    SelectColumnForReactDataGrid,
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
        renderEditCell: CommonTextEditor
    },

    {
        key: 'category',
        name: 'Category',
        width: 200,
        renderEditCell: CommonTextEditor
    },
    // {
    //     key: 'skilnotes',
    //     name: 'Skil Notes',
    //     width: 220,
    //     renderCell({ row, tabIndex, onRowChange }: any): React.ReactNode {
    //         return (
    //             <Box border={"0px solid red"}>
    //                 <Button onClick={() => skilNotePageButtonClick(row.id)}
    //                     size={"sm"}
    //                     variant={"outline"}
    //                 >
    //                     {/* 스킬 노트 ({row.skilnotes.length}) */}
    //                     스킬 노트 ({row.countForSkilNotes})
    //                 </Button>
    //             </Box>
    //         );
    //     },
    // },
    // {
    //     key: "likes",
    //     name: 'Likes',
    //     width: 140,
    //     // techNoteId, loginUser.id
    //     renderCell({ row, tabIndex, onRowChange }: any): React.ReactNode {
    //         const isLiked = row.likes?.includes(loginUser.id);
    //         const userId = loginUser.id
    //         const techNoteId = row.id

    //         if (isLoggedIn) {
    //             return (
    //                 <Box border={"0px solid black"}>
    //                     {isLiked ? (
    //                         <Button
    //                             bg="green.200"
    //                             p={2}
    //                             size={"sm"}
    //                             onClick={() => likeButtonHandler(userId, techNoteId)}
    //                         >
    //                             <Icon as={FaThumbsUp} color="green.500" mr={1} />
    //                             <Text>({row.likes?.length})</Text>
    //                         </Button>
    //                     ) : (
    //                         <Button
    //                             bg="red.100"
    //                             p={2}
    //                             size={"sm"}
    //                             onClick={() => likeButtonHandler(userId, techNoteId)}

    //                         >
    //                             <Icon as={FaRegThumbsUp} color="gray.500" mr={1} />
    //                             <Text>({row.likes?.length})</Text>
    //                         </Button>
    //                     )}
    //                 </Box>
    //             );
    //         } else {
    //             return (
    //                 <Box></Box>
    //             )
    //         }
    //     },
    // },
    // {
    //     key: "bookMarks",
    //     name: 'bookMarks',
    //     width: 140,
    //     // techNoteId, loginUser.id
    //     renderCell({ row, tabIndex, onRowChange }: any): React.ReactNode {
    //         const isBookMarked = row.bookMarks?.includes(loginUser.id);
    //         const userId = loginUser.id
    //         const techNoteId = row.id

    //         if (isLoggedIn) {
    //             return (
    //                 <Box border={"0px solid black"}>
    //                     {isBookMarked ? (
    //                         <Button
    //                             bg="green.200"
    //                             p={2}
    //                             size={"sm"}
    //                             onClick={() => bookMarkButtonHandler(userId, techNoteId)}
    //                         >
    //                             <Icon as={FaBookmark} color="green.500" mr={1} />
    //                             <Text>({row.bookMarks?.length})</Text>
    //                         </Button>
    //                     ) : (
    //                         <Button
    //                             bg="red.100"
    //                             p={2}
    //                             size={"sm"}
    //                             onClick={() => bookMarkButtonHandler(userId, techNoteId)}

    //                         >
    //                             <Icon as={FaRegBookmark} color="gray.500" mr={1} />
    //                             <Text>({row.bookMarks?.length})</Text>
    //                         </Button>
    //                     )}
    //                 </Box>
    //             );
    //         } else {
    //             return (
    //                 <Box></Box>
    //             )
    //         }
    //     },
    // }

];

type Props = {}

const DataGridForRoadMapList = (props: Props) => {
    const { isLoading, error, data: dataForRoadMapList } = useApiForGetAllRoadMapList({ pageNum: 1 });
    const [roadMapList, setRoadMapList] = useState<ITypeForRoadMapRow[]>([])
    const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());

    const pageNum = 1

    const mutationForSaveRoadMaps = useApiForSaveRoadMaps(pageNum); // custom hook 사용
    const mutationForDeleteCheckedRows = useApiForDeleteRoadMapsForCheckedIds(pageNum);

    // 사용자가 저장 버튼을 클릭할 때 실행될 함수
    const handleSave = () => {
        if (selectedRows.size === 0 || roadMapList.length === 0) {
            return;
        }
        const selectedRoadMapIds = Array.from(selectedRows).map((selectedId) => selectedId)

        const checkedRoadMaps = roadMapList.filter((roadMap) => {
            if (selectedRoadMapIds.includes(roadMap.id)) {
                return roadMap
            }
        })

        const roadMapsToSave = checkedRoadMaps

        mutationForSaveRoadMaps.mutate(roadMapsToSave); // API 호출

    };


    console.log("dataForRoadMapList : ", dataForRoadMapList);

    function onRowsChange(rows: ITypeForRoadMapRow[], { indexes, column }: any) {
        console.log("click ?? : ", rows);
        setRoadMapList(rows);
    }

    const handleDelete = () => {
        console.log('Delete button clicked');

        const checkNoteIdsForDelete = Array.from(selectedRows);

        mutationForDeleteCheckedRows.mutate(checkNoteIdsForDelete)
    };

    const handleAddRow = () => {
        console.log('Add Row button clicked');
    };

    // 2244
    useEffect(() => {
        let roadMapListToUpdate: ITypeForRoadMapRow[] = [];
        if (dataForRoadMapList && dataForRoadMapList.roadMapList) {
            roadMapListToUpdate = dataForRoadMapList?.roadMapList.map((row) => {
                return {
                    id: row.id,
                    title: row.title,
                    description: row.description,
                    category: row.category,
                    email: row.writer.email,

                    writer: row.writer
                }
            })
        }
        setRoadMapList(roadMapListToUpdate)
    }, [dataForRoadMapList])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

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

            {dataForRoadMapList && dataForRoadMapList?.roadMapList.length > 0 ?
                <DataGrid
                    columns={columns2} rows={roadMapList}

                    rowKeyGetter={(row) => row.id}
                    renderers={{ renderCheckbox }}
                    selectedRows={selectedRows}
                    onSelectedRowsChange={setSelectedRows}
                    onRowsChange={onRowsChange}
                />
                : "no data"}
        </Box>
    )
}

function renderCheckbox({ onChange, ...props }: RenderCheckboxProps) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
    }
    return <input type="checkbox" {...props} onChange={handleChange} />;
}

export default DataGridForRoadMapList