import React, { useEffect, useState } from 'react'
import 'react-data-grid/lib/styles.css';
import { Box, Button, useToast } from '@chakra-ui/react'
import DataGrid, { RenderCheckboxProps, RowsChangeData } from 'react-data-grid';
import useApiForGetAllRoadMapList from '@/hooks/useApiForGetAllRoadMapList';
import { SelectColumnForReactDataGrid } from '../Formatter/CheckBox/SelectColumnForRdg';
import SelectBoxForUserEmail from '../GridEditor/SelectBox/SelectBoxForUserEmail';
import CommonTextEditor from '../GridEditor/TextEditor/CommonTextEditor';
import { ITypeForRoadMapRow } from '@/types/typeForRoadMap';
import useApiForSaveRoadMaps from '@/hooks/useApiForSaveRoadMaps';
import useApiForDeleteRoadMapsForCheckedIds from '@/hooks/useApiForDeleteRoadMapsForCheckedIds';
import useUser from '@/hooks/useUser';
import CellExpanderFormatter from '@/pages/Test/ReactDataGrid/CellExpanderFormatter';
import DataGridForTechNotesForRoadMap from './DataGridForTechNotesForRoadMap';
import { format } from 'date-fns';
import ModalButtonForParticipantsListForRoadMap from '../Modal/ModalButtonForParticipantsListForRoadMap';
import ModalButtonForTechNoteForRoadMap from '../Modal/ModalButtonForTechNoteForRoadMap';


const formatDateTime = (dateTime: string | any) => {
    console.log("dateTime : ", typeof dateTime);

    if (dateTime !== undefined) {
        const time = new Date(dateTime);
        return format(time, "MM-dd HH:mm");
    }

};

interface ITypeForParameterForRenderCell {
    row: ITypeForRoadMapRow;
    tabIndex: number;
    onRowChange: (updated: ITypeForRoadMapRow) => void;
}

const columns = [
    SelectColumnForReactDataGrid,
    {
        key: 'expanded',
        name: '',
        minWidth: 30,
        width: 30,
        colSpan(args: any) {
            return args.type === 'ROW' && args.row.type === 'DETAIL' ? 7 : undefined;
        },
        renderCell({ row, tabIndex, onRowChange }: ITypeForParameterForRenderCell) {
            if (row.type === 'DETAIL') {
                return (
                    <Box width={"100%"} bgColor={"#DCEDF9"}>
                        <DataGridForTechNotesForRoadMap
                            techNotes={row.techNotes ? row.techNotes : []}
                            roadMapId={row.parentId}
                        />
                    </Box>
                )
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
        },
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
    {
        key: 'techNote',
        name: 'techNote',
        width: 200,
        // ModalButtonForTechNoteForRoadMap
        renderCell(props: any) {
            return (
                <Box>
                    <ModalButtonForTechNoteForRoadMap
                        techNotes={props.row.techNotes}
                        roadMapId={props.row.id}
                    />
                </Box>
            )
        },
    },
    {
        key: 'participants',
        name: 'particiPants',
        renderCell(props: any) {
            return (
                <Box>
                    <ModalButtonForParticipantsListForRoadMap
                        participants={props.row.participants ? props.row.participants : []}
                        button_text={'participant'}
                    />
                </Box>
            )
        },
    },
    {
        key: 'createdAt',
        name: 'Created At',
        renderCell(props: any) {
            // console.log("props.row.startTime : ", props.row);
            // console.log("props.row.startTime : ", props.row.startTime);
            if (props.row.startTime !== null && props.row.startTime !== "") {
                // console.log("이게 실행 되면 에러 발생 인데 !");
                console.log("props.row.createdAt : ", props.row.createdAt);

                const value = formatDateTime(props.row.createdAt);
                return (
                    <>
                        {value}
                    </>
                );
            } else {
                return ""
            }
        },
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
    const toast = useToast();

    const { isLoading, error, data: dataForRoadMapList } = useApiForGetAllRoadMapList({ pageNum: 1 });
    const [roadMapList, setRoadMapList] = useState<ITypeForRoadMapRow[]>([])
    const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());

    const { isLoggedIn, loginUser, logout } = useUser();

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

        setSelectedRows(new Set())
    };


    console.log("dataForRoadMapList : ", dataForRoadMapList);

    // function onRowsChange(rows: ITypeForRoadMapRow[], { indexes, column }: any) {
    //     console.log("click ?? : ", rows);
    //     setRoadMapList(rows);
    // }

    function onRowsChange(rows: ITypeForRoadMapRow[], { indexes, column }: RowsChangeData<ITypeForRoadMapRow>) {
        console.log("onRowsChange excute check ??? roadmaps ??", rows);

        const updatedRows = [...rows]; // 기존 배열을 복사하여 새로운 배열 생성

        const row = updatedRows[indexes[0]];

        // if (row.type === 'MASTER') {
        //     if (row.expanded) {
        //         updatedRows.splice(indexes[0] + 1, 0, {
        //             type: 'DETAIL',
        //             title: 'sample title',
        //             id: row.id + 100,
        //             techNotes: row.techNotes,
        //             parentId: row.id,
        //         });
        //     }
        //     else {
        //         updat    edRows.splice(indexes[0] + 1, 1);
        //     }
        // }

        if (row.type === 'MASTER') {
            console.log("here 1?");

            if (row.expanded) {
                console.log("here2 ? ");
                updatedRows.splice(indexes[0] + 1, 0, {
                    type: 'DETAIL',
                    title: 'sample title',
                    id: row.id + 100,
                    techNotes: row.techNotes,
                    parentId: row.id,
                    participants: row.participants
                });
            } else {
                console.log("here ?");
                if (column.key === "expanded") {
                    updatedRows.splice(indexes[0] + 1, 1);
                }
            }
        }
        setRoadMapList(updatedRows); // 새로운 배열을 상태로 설정

    }


    const handleDelete = () => {
        console.log('Delete button clicked');

        const checkNoteIdsForDelete = Array.from(selectedRows);
        mutationForDeleteCheckedRows.mutate(checkNoteIdsForDelete)
    };

    const handleAddRow = () => {
        console.log('Add Row button clicked');
        const randomId = Math.random().toString().substring(2, 7);
        const currentTime = Date.now().toString();
        const id = parseInt(randomId + currentTime, 10).toString().substring(0, 5);

        const newRow: ITypeForRoadMapRow = {
            type: "MASTER",
            id: id,
            title: '',
            description: '',
            category: '',
            email: loginUser.email ? loginUser.email : "",
            writer: {
                id: 0,
                email: '',
                password: '',
                nickname: '',
                role: '',
                gender: '',
                phoneNumber: null,
                backEndLevel: 0,
                frontEndLevel: 0,
                profileImage: null,
            },
            expanded: false
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

        setRoadMapList((prev: ITypeForRoadMapRow[]) => [newRow, ...prev])
    };

    // 2244
    useEffect(() => {
        let roadMapListToUpdate: ITypeForRoadMapRow[] = [];
        if (dataForRoadMapList && dataForRoadMapList.roadMapList) {
            roadMapListToUpdate = [];
            dataForRoadMapList.roadMapList.forEach((row) => {
                roadMapListToUpdate.push({
                    type: 'MASTER',
                    id: row.id,
                    email: row.writer.email,
                    title: row.title,
                    description: row.description,
                    category: row.category,
                    createdAt: row.createdAt,
                    writer: row.writer,
                    expanded: false,
                    techNotes: row.techNotes,
                    participants: row.participants
                });
            });
        }

        setRoadMapList(roadMapListToUpdate)
    }, [dataForRoadMapList, setRoadMapList])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Box width={"100%"} border={"2px solid red"} >

            <Box display="flex" justifyContent="flex-end" m={2}>
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
            <Box>
                {dataForRoadMapList ?
                    <DataGrid
                        columns={columns}
                        rows={roadMapList}

                        rowKeyGetter={(row) => row.id}
                        renderers={{ renderCheckbox }}
                        selectedRows={selectedRows}
                        onSelectedRowsChange={setSelectedRows}

                        onRowsChange={onRowsChange}
                        rowHeight={(row) => (row.type === 'DETAIL' ? 300 : 45)}
                        style={{ height: "70vh" }}
                    />
                    : "no data"}

            </Box>
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