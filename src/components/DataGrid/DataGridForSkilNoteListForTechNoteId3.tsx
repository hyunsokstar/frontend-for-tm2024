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
import useApiForSelectRefSkilnoteForTodo from "@/hooks/useApiForSelectRefSkilnoteForTodo";
import CellExpanderFormatter from "@/pages/Test/ReactDataGrid/CellExpanderFormatter";


interface IProps {
    techNoteId: any;
    isOpen: boolean;
    toDoId: string;
    onCloseForTechNoteModal: () => void;
    onCloseForSkilNoteModal: () => void;
    pageInfo?: string;
    isMainOrSub: "main" | "sub"
}

const options = [
    'email',
    'category',
] as const;

// 1122
// 스킬 노트 선택
const DataGridForSkilNoteListForTechNoteId2 = ({
    techNoteId,
    isOpen,
    toDoId,
    onCloseForTechNoteModal,
    pageInfo,
    isMainOrSub
}: IProps) => {
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
    const mutationForSelectRefSkilnoteForTodo = useApiForSelectRefSkilnoteForTodo(pageNum, pageInfo);

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

    const mutationToSaveSkilNoteRows =
        useSaveSkilNotesMutation({ techNoteId, pageNum });
    const mutationForLikeSkilNote = useApiForLikeSkilNote({ pageNum });
    const mutationForBookMarkSkilNote = useApiForBookMarkSkilNote({ pageNum });

    const [selectedOptions, setSelectedOptions] = useState<readonly string[]>([
        // options[0],
        // options[1]
    ]);



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
                    bookMarks: []
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

    const selectSkilNoteButtonHandler = (todoId: any, skilNoteId: any) => {
        console.log("todoId : ", todoId, "skilNoteId", skilNoteId);
        console.log("isMainOrSub at function ?: ", isMainOrSub);
        mutationForSelectRefSkilnoteForTodo.mutate({ toDoId, skilNoteId, isMainOrSub })
    }

    const columns = [
        SelectColumnForReactDataGrid,
        // step2 expanded 칼럼을 설정한뒤 클릭하면 row.expanded 가 toggle 되도록 설정
        {
            key: 'expanded',
            name: '',
            width: 50,
            colSpan(args: any) {
                return args.type === 'ROW' && args.row.type === 'DETAIL' ? 9 : undefined;
            }, renderCell({ row, tabIndex, onRowChange }: any) {
                if (row.type === "DETAIL") {
                    return (
                        <Flex display="grid" gridTemplateColumns="1fr 1fr" lineHeight={"20px"} height={"96%"} mx={2} mt={2} gap={2}>
                            <Box border={"1px solid blue"}>Description</Box>
                            <Box border={"1px solid red"}>관련 게시판</Box>
                        </Flex>

                    )
                }
                else {
                    return (
                        <CellExpanderFormatter
                            expanded={row.expanded}
                            tabIndex={tabIndex}
                            onCellExpand={() => {
                                onRowChange({ ...row, expanded: !row.expanded });
                            }}
                        />
                    )
                }

            }
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
            renderEditCell: CommonTextEditor
        },
        // {
        //     key: 'description',
        //     name: 'description',
        //     renderEditCell: CommonTextEditor
        // },
        {
            key: 'category',
            name: 'category',
            renderEditCell: CommonTextEditor
        },
        // { key: 'createdAt', name: 'createdAt' },
        {
            key: 'detailButton',
            name: 'DetailButton',
            renderCell({ row, tabIndex, onRowChange }: any): React.ReactNode {
                return (
                    <Box>
                        <Button size={"sm"} variant={"outline"} onClick={() => detailHandler(row.id)}>detail</Button>
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
                const isLiked = row.likes?.includes(loginUser.id);
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
        {
            key: "selectButton",
            name: 'selectButton',
            width: 200,
            renderCell({ row, tabIndex, onRowChange }: any): React.ReactNode {
                const skilNoteId = row.id;
                return (
                    <Box>
                        <Button
                            size={"xs"}
                            onClick={() => selectSkilNoteButtonHandler(toDoId, skilNoteId)}
                        >
                            참조 노트 선택{toDoId}
                        </Button>
                    </Box>
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
            likes: [],
            bookMarks: [],
            type: "MASTER"
        }

        setSkilNoteRows((prev: SkillNoteRow[]) => [...prev, newRow])
    }

    const handleSearchButtonForClick = (searchOption: string, searchText: string) => {
        console.log("hi search : ", searchOption, searchText);
        queryClient.refetchQueries({
            queryKey: ['apiForGetAllTechNoteList', pageNum, searchOption, searchText],
        });
    }

    useEffect(() => {
        // master detal step(1) 최초 type 과 expanded 를 설정에 추가
        if (dataForSkilNotesByTechNoteId && dataForSkilNotesByTechNoteId.skilNoteList.length > 0) {
            const initialSkilnoteRows = dataForSkilNotesByTechNoteId.skilNoteList.map((row) => {
                return {
                    id: row.id,
                    techNoteId: techNoteId,
                    email: row.writer?.email,
                    title: row.title,
                    description: row.description,
                    category: row.category,
                    createdAt: row.createdAt,
                    writer: row.writer,
                    likes: row.likes.map((like: any) => like.user.id),
                    bookMarks: row.bookMarks.map((bookmark: any) => bookmark.user.id),
                    type: "MASTER",
                    expanded: false
                }
            })
            setSkilNoteRows(initialSkilnoteRows);
        }
    }, [dataForSkilNotesByTechNoteId])




    // 2244
    return (
        <Box width={"100%"} border={"1px solid purple"} height={"100%"} gap={1} lineHeight={"20px"}>


            <Box display={"flex"} justifyContent={"space-between"} pr={1} py={1}>
                <Box width={"100vh"}>
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

                    <SearchInputForSkilNote
                        searchText={searchText}
                        setSearchText={setSearchText}
                        searchOption={searchOption}
                        setSearchOption={setSearchOption}
                        handleSearchButtonForClick={handleSearchButtonForClick}
                    />
                </Box>
                <Box display={"flex"} gap={1}>
                    {skilnoteRows && skilnoteRows.length > 0 ? (
                        <Box display={"flex"} gap={1} >
                            <Button variant={"outline"} size={"sm"}>delete</Button>
                            <Button variant={"outline"} size={"sm"} onClick={saveHandler}>save</Button>
                        </Box>
                    ) : ""}
                    {isLoggedIn ?
                        // <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"} pr={1}>
                        <Button variant={"outline"} size={"sm"} onClick={addRowHandler}>add</Button>
                        // </Box>
                        : ""}
                </Box>
            </Box>

            <Box mb={1} width={"100%"} border={"2px solid green"} lineHeight={"20px"}>
                hi11
                <Box lineHeight={"20px"}>
                    {/* {skilnoteRows.length} 개 */}
                    {skilnoteRows && skilnoteRows.length > 0 ?
                        <TreeDataGrid
                            columns={columns}
                            rows={skilnoteRows}
                            rowKeyGetter={(row) => row.id}
                            // rowHeight={(row) => (row.type === 'MASTER' ? 270 : 50)}
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