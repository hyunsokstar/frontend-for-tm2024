import { useEffect, useState } from "react";
import { Box, Button, Flex, HStack, Icon, Radio, RadioGroup, Stack, Text, Skeleton } from "@chakra-ui/react";
// import DataGrid, { RenderCheckboxProps, SelectColumn } from 'react-data-grid';
import DataGrid, { RenderCheckboxProps, RowsChangeData, SelectColumn, TreeDataGrid, textEditor } from 'react-data-grid';

import useApiForGetSkilNoteListByTechNoteId from "@/hooks/useGetSkilNoteListByTechNoteId";
import { useRouter } from 'next/router';
import { SkillNoteRow } from "@/types/typeForSkilNote";
import { SelectColumnForReactDataGrid } from "../Formatter/CheckBox/SelectColumnForRdg";
import CommonTextEditor from "../GridEditor/TextEditor/CommonTextEditor";
import SelectBoxForUserEmail from "../GridEditor/SelectBox/SelectBoxForUserEmail";
import useSaveSkilNotesMutation from "@/hooks/useSaveSkilNotesMutation";
import useUser from "@/hooks/useUser";
import { useQueryClient } from '@tanstack/react-query';
import SearchInputForSkilNote from "../SearchInput/SearchInputForSkilNote";
import { groupBy as rowGrouper } from 'lodash-es';
import { FaThumbsUp, FaRegThumbsUp, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import useApiForLikeSkilNote from "@/hooks/useApiForLikeSkilNote";
import useApiForBookMarkSkilNote from "@/hooks/useApiForBookMarkSkilNote";
import useApiForDeleteSkilNotesForCheckedIds from "@/hooks/useApiForDeleteSkilNotesForCheckedIds";
import MyPagination from "../MyPagination";
import ModalButtonForReorderSkilNoteList from "../Modal/ModalButtonForReorderSkilNoteList";
import ModalButtonForParticipantsListForSkilNote from "../Modal/ModalButtonForParticipantsListForSkilNote";
import SkeletonForBoard from "../Skeleton/SkeletonForBoard";


interface IProps {
    techNoteId: any;
    isOpen: boolean;
}

const options = [
    'email',
    'category',
] as const;

// 1122
const DataGridForSkilNoteListForTechNoteId2 = ({ techNoteId, isOpen }: IProps) => {
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


    const { isLoading, error, data: dataForSkilNotesByTechNoteId } = isOpen
        ? useApiForGetSkilNoteListByTechNoteId({
            techNoteId, // parentId 값을 techNoteId로 전달
            pageNum, // pageNum을 전달
            searchOption,
            searchText,
            isBestByLikes,
            isBestByBookMarks,
        })
        : { isLoading: false, error: null, data: null };
    console.log("dataForSkilNotesByTechNoteId : ", dataForSkilNotesByTechNoteId);


    const mutationToSaveSkilNoteRows = useSaveSkilNotesMutation({
        techNoteId,
        pageNum,
        searchOption,
        searchText,
        isBestByLikes,
        isBestByBookMarks
    });

    // const deleteSkilNoteRowsForCheckedIdsMutation = useApiForDeleteSkilNotesForCheckedIds({ techNoteId, pageNum });
    const deleteSkilNoteRowsForCheckedIdsMutation = useApiForDeleteSkilNotesForCheckedIds({
        techNoteId,
        pageNum,
        searchOption,
        searchText,
        isBestByLikes,
        isBestByBookMarks
    });

    // const mutationForLikeSkilNote = useApiForLikeSkilNote({ techNoteId, pageNum });
    const mutationForLikeSkilNote = useApiForLikeSkilNote({
        techNoteId,
        pageNum,
        searchOption,
        searchText,
        isBestByLikes,
        isBestByBookMarks
    });

    // const mutationForBookMarkSkilNote = useApiForBookMarkSkilNote({ techNoteId, pageNum });
    const mutationForBookMarkSkilNote = useApiForBookMarkSkilNote({
        techNoteId,
        pageNum,
        searchOption,
        searchText,
        isBestByLikes,
        isBestByBookMarks
    });

    const [selectedOptions, setSelectedOptions] = useState<string[]>([
        // options[0],
        // options[1]
    ]);


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
                    participants: [],
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
            key: "index",
            name: "index",
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
            width: 650,
            renderEditCell: CommonTextEditor
        },
        // {
        //     key: 'description',
        //     name: 'description',
        //     renderEditCell: CommonTextEditor
        // },
        // {
        //     key: 'category',
        //     name: 'category',
        //     width: 300,
        //     renderEditCell: CommonTextEditor
        // },
        // { key: 'createdAt', name: 'createdAt' },
        {
            key: 'detailButton',
            name: 'DetailButton',
            width: 200,
            renderCell({ row, tabIndex, onRowChange }: any): React.ReactNode {
                return (
                    <Box>
                        <Button size={"xs"} variant={"outline"} onClick={() => detailHandler(row.id)} width={"6vdh"}
                            _hover={{
                                border: "1px solid black", // change to your desired hover border color
                                bg: "blue.100", // change to your desired hover background color
                            }}
                        >
                            contents
                            ({row.countForSkilNoteContentsPages}page , {row.countForSkilNoteContents} 개)
                        </Button>
                    </Box>
                )
            }
        },

        {
            key: 'participants',
            name: 'particiPants',
            renderCell(props: any) {
                return (
                    <Box>
                        {/* {props.row.participants.length} */}
                        {/* 0228 */}
                        <ModalButtonForParticipantsListForSkilNote
                            participants={props.row.participants ? props.row.participants : []}
                            button_text={'participant'}
                            skilNoteId={props.row.id}
                            techNoteId={techNoteId}
                        />
                    </Box>
                )
            },
        },

        {
            key: "likes",
            name: 'Likes',
            width: 140,
            renderCell({ row, tabIndex, onRowChange }: any): React.ReactNode {
                const isLiked = row.likes.includes(loginUser.id);
                const userId = loginUser.id;
                const skilNoteId = row.id;

                return (
                    <Box border={"0px solid black"}>
                        <Button
                            bg={isLiked ? "green.200" : "red.100"}
                            p={2}
                            size={"sm"}
                            onClick={() => likeButtonHandler(userId, skilNoteId)}
                            isDisabled={!isLoggedIn}
                        >
                            <Icon as={isLiked ? FaThumbsUp : FaRegThumbsUp} color={isLiked ? "green.500" : "gray.500"} mr={1} />
                            <Text>({row.likes.length})</Text>
                        </Button>
                    </Box>
                );
            },
        },
        {
            key: "bookMarks",
            name: 'bookMarks',
            width: 140,
            renderCell({ row, tabIndex, onRowChange }: any): React.ReactNode {
                const isBookMarked = row.bookMarks.includes(loginUser.id);
                const userId = loginUser.id;
                const skilNoteId = row.id;

                return (
                    <Box border={"0px solid black"}>
                        <Button
                            bg={isBookMarked ? "green.200" : "red.100"}
                            p={2}
                            size={"sm"}
                            onClick={() => bookMarkButtonHandler(userId, skilNoteId)}
                            isDisabled={!isLoggedIn}
                        >
                            <Icon as={isBookMarked ? FaBookmark : FaRegBookmark} color={isBookMarked ? "green.500" : "gray.500"} mr={1} />
                            <Text>({row.bookMarks.length})</Text>
                        </Button>
                    </Box>
                );
            },
        },

        {
            key: "viewCount",
            name: 'viewCount',
            width: 140,
            renderCell(props: any) {
                return (
                    <div onClick={() => { alert("hi") }}>
                        {props.row.viewCount}
                    </div>
                )
            },
        }

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
            techNoteId: techNoteId,
            title: '',
            description: '',
            category: '',
            email: loginUser.email ? loginUser.email : "",
            expanded: false,
            participants: [],
            likes: [],
            bookMarks: [],
            type: "MASTER"
        }

        setSkilNoteRows((prev: SkillNoteRow[]) => [newRow, ...prev])
    }

    const handleSearchButtonForClick = (searchOption: string, searchText: string) => {
        console.log("hi search : ", searchOption, searchText);
        queryClient.refetchQueries({
            queryKey: ['apiForGetAllTechNoteList', pageNum, searchOption, searchText],
        });
    }


    // fix
    // useEffect(() => {
    //     // master detal step(1) 최초 type 과 expanded 를 설정에 추가
    //     if (dataForSkilNotesByTechNoteId && dataForSkilNotesByTechNoteId.skilNoteList.length > 0) {
    //         const initialSkilnoteRows = dataForSkilNotesByTechNoteId.skilNoteList.map((row, index) => {
    //             return {
    //                 index: index + 1,
    //                 id: row.id,
    //                 techNoteId: techNoteId,
    //                 email: row.writer?.email,
    //                 title: row.title,
    //                 description: row.description,
    //                 category: row.category,
    //                 createdAt: row.createdAt,
    //                 writer: row.writer,
    //                 participants: row.participants,
    //                 likes: row.likes.map((like: any) => like.user.id),
    //                 bookMarks: row.bookMarks.map((bookmark: any) => bookmark.user.id),
    //                 countForSkilNoteContents: row.countForSkilNoteContents,
    //                 countForSkilNoteContentsPages: row.countForSkilNoteContentsPages,
    //                 order: row.order,
    //                 type: "MASTER",
    //                 expanded: false
    //             }
    //         })
    //         setSkilNoteRows(initialSkilnoteRows);
    //     }
    // }, [dataForSkilNotesByTechNoteId])

    useEffect(() => {
        // master detail step(1): 최초 type과 expanded를 설정에 추가
        if (dataForSkilNotesByTechNoteId && dataForSkilNotesByTechNoteId.skilNoteList.length > 0) {
            const initialSkilnoteRows = dataForSkilNotesByTechNoteId.skilNoteList.map((row, index) => {
                // 역순으로 index 부여
                const reversedIndex = dataForSkilNotesByTechNoteId.skilNoteList.length - index;
                return {
                    index: reversedIndex,
                    id: row.id,
                    techNoteId: techNoteId,
                    email: row.writer?.email,
                    title: row.title,
                    description: row.description,
                    category: row.category,
                    createdAt: row.createdAt,
                    writer: row.writer,
                    participants: row.participants,
                    likes: row.likes.map((like: any) => like.user.id),
                    bookMarks: row.bookMarks.map((bookmark: any) => bookmark.user.id),
                    countForSkilNoteContents: row.countForSkilNoteContents,
                    countForSkilNoteContentsPages: row.countForSkilNoteContentsPages,
                    order: row.order,
                    viewCount: row.viewCount,
                    type: "MASTER",
                    expanded: false
                };
            });
            setSkilNoteRows(initialSkilnoteRows);
        }
    }, [dataForSkilNotesByTechNoteId]);




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
                {/* fix 11 */}
                {

                    searchText === ""
                        && selectedOptions.length === 0
                        && isBestByLikes === false
                        && isBestByBookMarks === false ?
                        <Box mr={1}>
                            <ModalButtonForReorderSkilNoteList
                                techNoteId={techNoteId}
                                pageNum={pageNum}
                                dataForSkilNoteList={dataForSkilNotesByTechNoteId?.skilNoteList}
                            />
                        </Box>
                        : ""
                }

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
                        :
                        <Box px={6}>
                            {isLoading ? (
                                <Box>
                                    <SkeletonForBoard />
                                </Box>
                            ) : (
                                <Box>
                                    {/* 로딩 중이 아닐 때 실제 데이터를 렌더링합니다. */}
                                    {/* 예시: <ListItem data={data} /> */}
                                    <Box>No data</Box>
                                </Box>
                            )}
                        </Box>
                    }
                </Box>

            </Box>
            <Box m={3}>
                <MyPagination
                    totalCount={dataForSkilNotesByTechNoteId?.totalCount}
                    perPage={dataForSkilNotesByTechNoteId?.perPage}
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