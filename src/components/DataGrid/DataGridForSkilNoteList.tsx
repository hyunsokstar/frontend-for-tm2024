import { useEffect, useState } from "react";
import { Box, Button, Flex, HStack, Icon, Input, Radio, RadioGroup, Select, Stack, Text, VStack } from "@chakra-ui/react";
// import DataGrid, { RenderCheckboxProps, SelectColumn } from 'react-data-grid';
import DataGrid, { RenderCheckboxProps, RowsChangeData, SelectColumn, TreeDataGrid, textEditor } from 'react-data-grid';

import useApiForGetSkilNoteListByTechNoteId from "@/hooks/useGetSkilNoteListByTechNoteId";
import { useRouter } from 'next/router';
import { SkillNoteRow } from "@/types/typeForSkilNote";
import { SelectColumnForReactDataGrid } from "../Formatter/CheckBox/SelectColumnForRdg";
import CommonTextEditor from "../GridEditor/TextEditor/CommonTextEditor";
import SelectBoxForUserEmail from "../GridEditor/SelectBox/SelectBoxForUserEmail";
import useSaveSkilNotesMutation from "@/hooks/useSaveSkilNotesMutation copy";
import useUser from "@/hooks/useUser";
import { useQueryClient } from '@tanstack/react-query';
import SearchInputForSkilNote from "../SearchInput/SearchInputForSkilNote";
import { groupBy as rowGrouper } from 'lodash-es';
import { FaThumbsUp, FaRegThumbsUp, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import useApiForLikeSkilNote from "@/hooks/useApiForLikeSkilNote";
import useApiForBookMarkSkilNote from "@/hooks/useApiForBookMarkSkilNote";
import useApiForDeleteSkilNotesForCheckedIds from "@/hooks/useApiForDeleteSkilNotesForCheckedIds";
import MyPagination from "../MyPagination";
import useApiForGetAllSkilNoteList from "@/hooks/useApiForGetAllSkilNoteList";


interface IProps {

}

const options = [
    'email',
    'category',
] as const;

// 1122
const DataGridForSkilNoteListForTechNoteId2 = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [pageNum, setpageNum] = useState(1);
    const { isLoggedIn, loginUser, logout } = useUser();
    const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());

    const [skilnoteRows, setSkilNoteRows] = useState<SkillNoteRow[]>([]);

    const [searchText, setSearchText] = useState('');
    const [searchOption, setSearchOption] = useState('title');

    const [isBestByLikes, setIsBestByLikes] = useState<boolean>(false)
    const [isBestByBookMarks, setIsBestByBookMarks] = useState<boolean>(false)

    const { isLoading, error, data: dataForSkilNotesList } =
        useApiForGetAllSkilNoteList({
            pageNum,
            searchOption,
            searchText,
            isBestByLikes,
            isBestByBookMarks,
        })

    console.log("dataForSkilNotesList : ", dataForSkilNotesList);

    // const techNoteId = 0
    const mutationToSaveSkilNoteRows = useSaveSkilNotesMutation({ pageNum });
    const mutationForLikeSkilNote = useApiForLikeSkilNote({ pageNum });
    const mutationForBookMarkSkilNote = useApiForBookMarkSkilNote({ pageNum });

    const [selectedOptions, setSelectedOptions] = useState<string[]>([
        // options[0],
        // options[1]
    ]);

    const deleteSkilNoteRowsForCheckedIdsMutation
        = useApiForDeleteSkilNotesForCheckedIds({ pageNum });

    const deleteButtonHandler = () => {
        // selectedRows를 배열로 변환
        const checkedIds = Array.from(selectedRows);
        console.log("checkedIds", checkedIds);
        deleteSkilNoteRowsForCheckedIdsMutation.mutate(checkedIds)
    }

    const detailHandler = (skilNoteId: any) => {
        window.open(`/Note/SkilNoteContents/${skilNoteId}/1`, '_blank');
    }

    // step3 
    function onRowsChange(rows: SkillNoteRow[], { indexes, column }: any) {
        console.log("click ?? : ", rows);
        console.log("indexes : ", indexes);
        console.log("column : ", column);

        const row = rows[indexes[0]];
        if (row.type === 'MASTER') {
            console.log("here 1?");

            if (row.expanded) {
                console.log("here2 ? ");
                rows.splice(indexes[0] + 1, 0, {
                    type: 'DETAIL',
                    id: row.id + 100,
                    likes: [],
                    bookMarks: [],
                    skilnote_contents: [],
                    countForSkilNoteContents: 0,
                    order: 0
                });
            } else {
                console.log("here ?");

                if (column.key === "expanded")
                    rows.splice(indexes[0] + 1, 1);
            }
        }
        setSkilNoteRows(rows);
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

    const likeButtonHandler = (userId: any, skilNoteId: any) => {
        // alert(skilNoteId)
        mutationForLikeSkilNote.mutate({ userId, skilNoteId })
    }

    const bookMarkButtonHandler = (userId: any, skilNoteId: any) => {
        mutationForBookMarkSkilNote.mutate({ userId, skilNoteId })
    }

    const columns = [
        SelectColumnForReactDataGrid,

        {
            key: "id",
            name: "id",
            width: 20
        },
        {
            key: 'email',
            name: 'Email',
            width: 200,
            renderEditCell: SelectBoxForUserEmail
        },
        {
            key: 'title',
            name: 'Title',
            width: 600,
            renderEditCell: CommonTextEditor
        },

        {
            key: 'category',
            name: 'category',
            width: 300,
            renderEditCell: CommonTextEditor
        },
        {
            key: 'detailButton',
            name: 'DetailButton',
            width: 200,
            renderCell({ row, tabIndex, onRowChange }: any): React.ReactNode {
                return (
                    <Box>
                        <Button size={"sm"} variant={"outline"} onClick={() => detailHandler(row.id)} width={"6vdh"}>
                            contents
                            ({row.countForSkilNoteContentsPages}page , {row.countForSkilNoteContents} 개)
                        </Button>
                    </Box>
                )
            }
        },

        {
            key: "likes",
            name: 'Likes',
            width: 140,
            // techNoteId, loginUser.id
            renderCell({ row, tabIndex, onRowChange }: any): React.ReactNode {
                const isLiked = row.likes.includes(loginUser.id);
                const userId = loginUser.id
                const skilNoteId = row.id

                if (isLoggedIn) {
                    return (
                        <Box border={"0px solid black"}>
                            {isLiked ? (
                                <Button
                                    bg="green.200"
                                    p={2}
                                    size={"sm"}
                                    onClick={() => likeButtonHandler(userId, skilNoteId)}
                                >
                                    <Icon as={FaThumbsUp} color="green.500" mr={1} />
                                    <Text>({row.likes.length})</Text>
                                </Button>
                            ) : (
                                <Button
                                    bg="red.100"
                                    p={2}
                                    size={"sm"}
                                    onClick={() => likeButtonHandler(userId, skilNoteId)}

                                >
                                    <Icon as={FaRegThumbsUp} color="gray.500" mr={1} />
                                    <Text>({row.likes.length})</Text>
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
            // skilNoteId, loginUser.id
            renderCell({ row, tabIndex, onRowChange }: any): React.ReactNode {
                const isBookMarked = row.bookMarks.includes(loginUser.id);
                const userId = loginUser.id
                const skilNoteId = row.id

                if (isLoggedIn) {
                    return (
                        <Box border={"0px solid black"}>
                            {isBookMarked ? (
                                <Button
                                    bg="green.200"
                                    p={2}
                                    size={"sm"}
                                    onClick={() => bookMarkButtonHandler(userId, skilNoteId)}
                                >
                                    <Icon as={FaBookmark} color="green.500" mr={1} />
                                    <Text>({row.bookMarks.length})</Text>
                                </Button>
                            ) : (
                                <Button
                                    bg="red.100"
                                    p={2}
                                    size={"sm"}
                                    onClick={() => bookMarkButtonHandler(userId, skilNoteId)}

                                >
                                    <Icon as={FaRegBookmark} color="gray.500" mr={1} />
                                    <Text>({row.bookMarks.length})</Text>
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


    ];

    const [expandedGroupIds, setExpandedGroupIds] = useState(
        (): ReadonlySet<unknown> =>
            new Set<unknown>(['United States of America', 'United States of America__2015'])
    );

    const handleRadioChange = (value: string) => {
        console.log("best by :", value);

        // Toggle values based on the selected radio button
        if (value === '1') {
            setIsBestByLikes(true);
            setIsBestByBookMarks(false);
        } else if (value === '2') {
            setIsBestByLikes(false);
            setIsBestByBookMarks(true);
        }
    };

    function saveHandler(event: React.MouseEvent<HTMLButtonElement>): void {
        const selectedRowsData = skilnoteRows?.filter(row => selectedRows.has(row.id));
        const selectedRowsIds = selectedRowsData?.map(row => row.id);
        console.log("Selected Rows IDs:", selectedRowsIds);
        console.log("selectedRowsData:", selectedRowsData);

        if (selectedRowsData !== undefined) {
            mutationToSaveSkilNoteRows.mutate(selectedRowsData);
        }
        setSelectedRows(new Set())
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
            // techNoteId: techNoteId,
            title: '',
            description: '',
            category: '',
            email: loginUser.email ? loginUser.email : "",
            expanded: false,
            likes: [],
            bookMarks: [],
            type: "MASTER"
        }

        setSkilNoteRows((prev: SkillNoteRow[]) => [newRow, ...prev])
    }

    const handleSearchButtonForClick = (searchOption: string, searchText: string) => {
        console.log("hi search : ", searchOption, searchText);
        queryClient.refetchQueries({
            queryKey: ['apiForGetAllSkilNoteList', pageNum, searchOption, searchText],
        });
    }

    // fix
    useEffect(() => {
        if (dataForSkilNotesList) {
            const initialSkilnoteRows = dataForSkilNotesList?.skilNoteList.map((row) => {
                return {
                    id: row.id,
                    // techNoteId: techNoteId,
                    email: row.writer?.email,
                    title: row.title,
                    description: row.description,
                    category: row.category,
                    createdAt: row.createdAt,
                    writer: row.writer,
                    likes: row.likes.map((like: any) => like.user.id),
                    bookMarks: row.bookMarks.map((bookmark: any) => bookmark.user.id),
                    countForSkilNoteContents: row.countForSkilNoteContents,
                    countForSkilNoteContentsPages: row.countForSkilNoteContentsPages,
                    order: row.order,
                    type: "MASTER",
                    expanded: false
                }
            })
            setSkilNoteRows(initialSkilnoteRows);
        }
    }, [dataForSkilNotesList])




    // 2244
    return (
        <Box width={"100%"} border={"1px solid purple"} height={"100%"} gap={1} lineHeight={"20px"}>


            <Box display={"flex"} justifyContent={"space-between"} pr={1} py={1}>
                <Box width={"100%"}>
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
                    </Box>

                    {/* {searchText} ? */}
                    <SearchInputForSkilNote
                        searchText={searchText}
                        setSearchText={setSearchText}
                        searchOption={searchOption}
                        setSearchOption={setSearchOption}
                        handleSearchButtonForClick={handleSearchButtonForClick}
                    />

                </Box>
            </Box>
            <Box display={"flex"} justifyContent={"flex-end"} mb={1}>
                {
                    isLoggedIn ?
                        <Box display={"flex"} gap={1} mr={1}>
                            {/* <Button variant={"outline"} size={"sm"}>reorder(구현중)</Button> */}
                            <Button variant={"outline"} size={"sm"} onClick={deleteButtonHandler} ml={0}>delete</Button>
                            <Button variant={"outline"} size={"sm"} onClick={saveHandler} ml={0}>save</Button>
                            <Button variant={"outline"} size={"sm"} onClick={addRowHandler} ml={0}>add</Button>
                        </Box>
                        :
                        "로그인 필요"
                }
            </Box>

            <Box mb={1} width={"100%"} border={"2px solid green"} lineHeight={"20px"}>

                <Box lineHeight={"20px"}>
                    {/* {skilnoteRows.length} 개 */}
                    {skilnoteRows && skilnoteRows.length > 0 ?
                        <TreeDataGrid
                            columns={columns}
                            rows={skilnoteRows}
                            rowKeyGetter={(row) => row.id}
                            rowHeight={(row: any) => {
                                if (row.row.type === "DETAIL") {
                                    return 270
                                }
                                else {
                                    return 38
                                }
                            }}
                            renderers={{ renderCheckbox }}
                            selectedRows={selectedRows}
                            onSelectedRowsChange={setSelectedRows}
                            onRowsChange={onRowsChange}
                            style={{ height: "90%", width: "100%" }}
                            expandedGroupIds={expandedGroupIds}
                            onExpandedGroupIdsChange={setExpandedGroupIds}
                            defaultColumnOptions={{ resizable: true }}
                            rowGrouper={rowGrouper}
                            groupBy={selectedOptions}
                        />
                        : "no data"}
                </Box>

            </Box>
            <Box m={3}>
                <MyPagination
                    totalCount={dataForSkilNotesList?.totalCount}
                    perPage={dataForSkilNotesList?.perPage}
                    currentPage={pageNum}
                    setCurrentPage={setpageNum}
                />
            </Box>

            <Box>
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

export default DataGridForSkilNoteListForTechNoteId2;