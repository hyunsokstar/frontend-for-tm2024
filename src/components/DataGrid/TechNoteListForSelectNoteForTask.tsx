import React, { useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import { Box, Button, Icon, Radio, RadioGroup, Stack, Text, useToast } from '@chakra-ui/react';
import DataGrid, { RenderCheckboxProps, RowsChangeData, SelectColumn, TreeDataGrid, textEditor } from 'react-data-grid';
import useGetAllTechNoteList from '@/hooks/useGetAllTechNoteList';
import { SelectColumnForReactDataGrid } from '@/components/Formatter/CheckBox/SelectColumnForRdg';
import CommonTextEditor from '@/components/GridEditor/TextEditor/CommonTextEditor';
import useSaveTechNotesMutation from '@/hooks/useSaveTechNotesMutation';
import SelectBoxForUserEmail from '@/components/GridEditor/SelectBox/SelectBoxForUserEmail';
import useUser from '@/hooks/useUser';
import DataGridForSkilNoteListForTechNoteId2 from '@/components/DataGrid/DataGridForSkilNoteListForTechNoteId2';
import useApiForDeleteTechNotesForCheckedIds from '@/hooks/useApiForDeleteTechNotesForCheckedIds';
import SearchInputForTechNote from '../SearchInput/SearchInputForTechNote';
import { useQueryClient } from '@tanstack/react-query';
import { groupBy as rowGrouper } from 'lodash-es';
import { FaThumbsUp, FaRegThumbsUp, FaBookmark, FaRegBookmark } from 'react-icons/fa';

import useApiForLikeTechNote from '@/hooks/useApiForLikeTechNote';
import useApiForBookMarkTechNote from '@/hooks/useApiForBookMarkTechNote';
import { TechNote } from '@/types/typeForTechNote';
import ModalButtonForSelectSkilNoteForTodo from '../Modal/ModalButtonForSkilNoteListById2';

const options = [
    'email',
    'category',
] as const;

// type OnCloseFunction = () => void;


interface IProps {
    toDoId: string
    onCloseForTechNoteModal: any
    pageInfo?: string
    isMainOrSub: "main" | "sub"
    selectedUserId: any;
}

// 1122
const TechNoteListForSelectNoteForTask = ({
    toDoId,
    onCloseForTechNoteModal,
    pageInfo,
    isMainOrSub,
    selectedUserId
}: IProps) => {
    const queryClient = useQueryClient();
    const [searchText, setSearchText] = useState('');
    const [searchOption, setSearchOption] = useState('title');

    const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());
    const [noteRows, setNoteRows] = useState<TechNote[] | any>();
    const { isLoggedIn, loginUser, logout } = useUser();
    const toast = useToast();
    const deleteTechNoteRowsForCheckedIdsMutation = useApiForDeleteTechNotesForCheckedIds();

    const [expandedGroupIds, setExpandedGroupIds] = useState(
        (): ReadonlySet<unknown> =>
            new Set<unknown>(['United States of America', 'United States of America__2015'])
    );

    const [selectedOptions, setSelectedOptions] = useState<readonly string[]>([
        // options[0],
        // options[1]
    ]);

    const [isBestByLikes, setIsBestByLikes] = useState<boolean>(false)
    const [isBestByBookMarks, setIsBestByBookMarks] = useState<boolean>(false)

    const [pageNum, setPageNum] = useState(1);

    // useQuery
    const { isLoading, error, data: dataForTechNoteList }
        = useGetAllTechNoteList(
            pageNum,
            searchOption,
            searchText,
            isBestByLikes,
            isBestByBookMarks
        );
    const mutationForLikeTechNote = useApiForLikeTechNote(pageNum);
    const mutationForBookMarkTechNote = useApiForBookMarkTechNote(pageNum);

    const handleRadioChange = (value: string) => {
        // Toggle values based on the selected radio button
        if (value === '1') {
            setIsBestByLikes(true);
            setIsBestByBookMarks(false);
        } else if (value === '2') {
            setIsBestByLikes(false);
            setIsBestByBookMarks(true);
        }
    };

    const likeButtonHandler = (userId: any, techNoteId: any) => {
        mutationForLikeTechNote.mutate({ userId, techNoteId })
    }

    const bookMarkButtonHandler = (userId: any, techNoteId: any) => {
        mutationForBookMarkTechNote.mutate({ userId, techNoteId })
    }

    const columns = [
        SelectColumnForReactDataGrid,
        // {
        //     key: 'expanded',
        //     name: '',
        //     minWidth: 30,
        //     width: 30,
        //     colSpan(args: any) {
        //         return args.type === 'ROW' && args.row.type === 'DETAIL' ? 6 : undefined;
        //     },
        //     renderCell({ row, tabIndex, onRowChange }: any): React.ReactNode {
        //         if (row.type === 'DETAIL') {
        //             return <DataGridForSkilNoteListForTechNoteId techNoteId={row.parentId} />;
        //         }

        //         return (
        //             <CellExpanderFormatter
        //                 expanded={row.expanded}
        //                 tabIndex={tabIndex}
        //                 onCellExpand={() => {
        //                     onRowChange({ ...row, expanded: !row.expanded });
        //                 }}
        //             />
        //         );
        //     }
        // },
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
            width: 240,
            renderEditCell: CommonTextEditor
        },
        {
            key: 'skilnotes',
            name: 'Skil Notes',
            width: 180,
            renderCell({ row, tabIndex, onRowChange }: any): React.ReactNode {
                return (
                    <Box border={"0px solid red"}>
                        {/* fix 22 */}
                        <ModalButtonForSelectSkilNoteForTodo
                            selectedUserId={selectedUserId}
                            TechNoteId={row.id}
                            skilNoteLength={row.skilnotes?.length !== 0 ? row.skilnotes?.length : 0}
                            toDoId={toDoId}
                            onCloseForTechNoteModal={onCloseForTechNoteModal}
                            pageInfo={pageInfo}
                            isMainOrSub={isMainOrSub}
                        />

                    </Box>
                );
            },
        },
        {
            key: "likes",
            name: 'Likes',
            width: 140,
            // techNoteId, loginUser.id
            renderCell({ row, tabIndex, onRowChange }: any): React.ReactNode {
                const isLiked = row.likes?.includes(loginUser.id);
                const userId = loginUser.id
                const techNoteId = row.id

                if (isLoggedIn) {
                    return (
                        <Box border={"0px solid black"}>
                            {isLiked ? (
                                <Button
                                    bg="green.200"
                                    p={2}
                                    size={"sm"}
                                    onClick={() => likeButtonHandler(userId, techNoteId)}
                                >
                                    <Icon as={FaThumbsUp} color="green.500" mr={1} />
                                    <Text>({row.likes?.length})</Text>
                                </Button>
                            ) : (
                                <Button
                                    bg="red.100"
                                    p={2}
                                    size={"sm"}
                                    onClick={() => likeButtonHandler(userId, techNoteId)}

                                >
                                    <Icon as={FaRegThumbsUp} color="gray.500" mr={1} />
                                    <Text>({row.likes?.length})</Text>
                                </Button>
                            )}
                        </Box>
                    );
                } else {
                    return (
                        <Box></Box>
                    )
                }
            },
        },
        {
            key: "bookMarks",
            name: 'bookMarks',
            width: 140,
            // techNoteId, loginUser.id
            renderCell({ row, tabIndex, onRowChange }: any): React.ReactNode {
                const isBookMarked = row.bookMarks?.includes(loginUser.id);
                const userId = loginUser.id
                const techNoteId = row.id

                if (isLoggedIn) {
                    return (
                        <Box border={"0px solid black"}>
                            {isBookMarked ? (
                                <Button
                                    bg="green.200"
                                    p={2}
                                    size={"sm"}
                                    onClick={() => bookMarkButtonHandler(userId, techNoteId)}
                                >
                                    <Icon as={FaBookmark} color="green.500" mr={1} />
                                    <Text>({row.bookMarks.length})</Text>
                                </Button>
                            ) : (
                                <Button
                                    bg="red.100"
                                    p={2}
                                    size={"sm"}
                                    onClick={() => bookMarkButtonHandler(userId, techNoteId)}

                                >
                                    <Icon as={FaRegBookmark} color="gray.500" mr={1} />
                                    <Text>({row.bookMarks?.length})</Text>
                                </Button>
                            )}
                        </Box>
                    );
                } else {
                    return (
                        <Box></Box>
                    )
                }
            },
        }

    ];

    // mutation
    const mutationForSaveTechNotes = useSaveTechNotesMutation();

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

        setNoteRows((prev: TechNote[]) => [newRow, ...prev])
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
        mutationForSaveTechNotes.mutate({
            techNotesToSave: techNoteRowsToSave,
        });
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

    // noteRows
    const handleSearchButtonForClick = (searchOption: string, searchText: string) => {
        console.log("hi search : ", searchOption, searchText);
        queryClient.refetchQueries({
            queryKey: ['apiForGetAllTechNoteList', pageNum, searchOption, searchText],
        });
    }

    function toggleOption(option: string, enabled: boolean) {
        const index = selectedOptions.indexOf(option);
        if (enabled) {
            if (index === -1) {
                setSelectedOptions((options) => [...options, option]);
            }
        } else if (index !== -1) {
            setSelectedOptions((options) => {
                const newOptions = [...options];
                newOptions.splice(index, 1);
                return newOptions;
            });
        }
        setExpandedGroupIds(new Set());
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
                    skilnotes: row.skilnotes,
                    likes: row.likes.map((like: any) => like.user.id),
                    bookMarks: row.bookMarks.map((bookmark: any) => bookmark.user.id),
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
            {/* 선택용 테크 노트 */}
            <Box display={"flex"} gap="2" ml={2} my={1} mt={2} >
                <b>Group by:</b>
                <Box display={"flex"} gap={2}>
                    {options.map((option) => (
                        <label key={option}>
                            <input
                                type="checkbox"
                                checked={selectedOptions.includes(option)}
                                onChange={(event) => toggleOption(option, event.target.checked)}
                            />{' '}
                            {option}
                        </label>
                    ))}

                </Box>
            </Box>
            <Box display={"flex"} gap={2} ml={2}>
                <b>best by:</b>
                <RadioGroup defaultValue='' onChange={(value) => handleRadioChange(value)}>
                    <Stack spacing={5} direction='row'>
                        <Radio colorScheme='red' value='1'>
                            by likes
                        </Radio>
                        <Radio colorScheme='green' value='2'>
                            by bookmark
                        </Radio>
                    </Stack>
                </RadioGroup>
            </Box>

            <Box display={"flex"} justifyContent={"space-between"} my={2} gap={2}>
                <Box width={"100vh"}>
                    <SearchInputForTechNote
                        searchText={searchText}
                        setSearchText={setSearchText}
                        searchOption={searchOption}
                        setSearchOption={setSearchOption}
                        handleSearchButtonForClick={handleSearchButtonForClick}
                    />
                </Box>
                <Box display={"flex"} gap={2} px={2}>
                    <Button onClick={deleteHandler} variant={"outline"}>Delete</Button>
                    <Button onClick={saveHandler} variant={"outline"}>save</Button>
                    {isLoggedIn ?
                        <Button onClick={addRowHandler} variant={"outline"}>add</Button>
                        : ""}
                </Box>
            </Box>

            <Box width={"100%"} border={"2px solid red"} py={1}>
                <TreeDataGrid
                    rowKeyGetter={(row) => row.id}
                    columns={columns}
                    rows={noteRows ? noteRows : []}
                    renderers={{ renderCheckbox }}
                    selectedRows={selectedRows}
                    onSelectedRowsChange={setSelectedRows}
                    onRowsChange={onRowsChange}
                    expandedGroupIds={expandedGroupIds}
                    onExpandedGroupIdsChange={setExpandedGroupIds}
                    defaultColumnOptions={{ resizable: true }}
                    rowGrouper={rowGrouper}
                    groupBy={selectedOptions}
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

export default TechNoteListForSelectNoteForTask;


