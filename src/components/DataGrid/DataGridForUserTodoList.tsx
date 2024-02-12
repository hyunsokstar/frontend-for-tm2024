import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import {
    Avatar, Box, Text,
    Icon,
    HStack,
    Button,
    InputGroup,
    Input,
    InputRightElement,
    useToast,
    Select,

} from '@chakra-ui/react';
import { AddIcon, CloseIcon, InfoIcon } from '@chakra-ui/icons';
import DataGrid, { RenderCheckboxProps, RenderSortStatusProps } from 'react-data-grid';
import { SelectColumnForReactDataGrid } from '../Formatter/CheckBox/SelectColumnForRdg';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import useApiForGetUncompletedTodoListForUserId from '@/hooks/useApiForGetUncompletedTodoListForUserId';
import { ITypeForTodoRow } from '@/types/typeforTodos';
import { format } from 'date-fns';
import CommonDateTimePicker from '../GridEditor/DateTimePicker/CommonDateTimePicker';
import CommonSelectBoxEdtior from '../GridEditor/SelectBox/CommonSelectBoxEdtior';
import CommonTextEditor from '../GridEditor/TextEditor/CommonTextEditor';
import ModalButtonForTodoBrifingsForTodoId from '../Modal/ModalButtonForTodoBrifingsForTodoId';
import Link from 'next/link';
import useApiForUpdateRefSkilnoteForTodo from '@/hooks/useApiForUpdateRefSkilnoteForTodo';
import { FaRegFileAlt, FaTimes } from 'react-icons/fa';  // 노트와 취소 아이콘 추가
import ModalButtonForSelectNoteForTodo from '../Modal/ModalButtonForSelectNoteForTodo';
import useApiForDeleteTodosForCheckedIds from '@/hooks/useApiForDeleteTodosForCheckedIds';
import useApiForSimpleCreateTodo from '@/hooks/useApiForSimpleCreateTodo';
import SelectBoxForNumberToAddRow from '../Select/SelectBoxForNumberToAddRow';
import ModalButtonForSelectDeadLine from '../Modal/ModalButtonForSelectDeadLine';
import useApiForSaveTodoListForUserMutation from '@/hooks/useApiForSaveTodoListForUserMutation';
import styles from "./dataGrid.module.scss"
import StarRatingForPriority from '../StarRating/StarRatingForPriority';
import ModalButtonForSupplementTodos from '../Modal/ModalButtonForSupplementTodos';
import SelectBoxForDefaultTodoStatus from '../Select/SelectBoxForDefaultTodoStatus';
import useApiForMultiUpdateForTodoRowsForChecked from '@/hooks/useApiForMultiUpdateForTodoRowsForChecked';


const formatDateTime = (dateTime: string) => {
    return format(new Date(dateTime), "MM-dd HH:mm");
};

interface ITodoRow {
    id: any,
    email: string;
    task: string;
    status: string;
    startTime: string;
    deadline: Date;
}

const getColorForStatus = (status: string) => {
    if (status === "ready") {
        return "yellow.100"
    }
    else if (status === "idea") {
        return "gray.100"
    }
    else if (status === "progress") {
        return "green.100"
    } else if (status === "testing") {
        return "orange"
    } else if (status === "complete") {
        return "purple.100"
    }
}

const getBasicColumns = (
    isMainOrSub: "main" | "sub",
    usersEmailInfo: string[],
    pageNum: string,
    mutationForUpdateRefSkilnoteForTodo: any,
    pageInfo: string,
    todoStatusOption: "all_uncompleted" | "all_completed" | "idea" | "uncompleted" | "completed",
    userId: string
) => {
    return [
        SelectColumnForReactDataGrid,
        {
            key: 'id',
            name: 'id'
        },
        {
            key: 'email',
            name: 'Email',
            width: 280,
            // frozen: true,
            renderCell(props: any) {
                return (
                    <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"} gap={2}>
                        <Avatar src={props.row.profileImage} size={"sm"} />
                        <Link href={`/UserProfile/${props.row.managerId}`} >
                            <Text _hover={{ textDecoration: 'underline' }}>
                                {props.row.email}
                            </Text>
                        </Link>

                    </Box>
                )
            },
            renderEditCell: (props: {
                row: any;
                column: { key: keyof any };
                onRowChange: (updatedRow: any) => void;
                onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void;
            }) => (
                <CommonSelectBoxEdtior
                    {...props}
                    arrayForSelectOption={usersEmailInfo}
                />
            )
        },
        {
            key: 'task',
            name: 'Task',
            width: 500,
            renderEditCell: CommonTextEditor,
            renderCell(props: any) {
                return (
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={2} height={"100%"} border={"1px dotted green"}>
                        <Text>{props.row.task}</Text>
                        {/* <ModalButtonForSupplementTodos
                            buttonText={'sub todos'}
                            countForSupplementTodos={props.row.supplementaryTodos?.length}
                            supplementaryTodos={props.row.supplementaryTodos}
                            usersEmailInfo={usersEmailInfo}
                        /> */}
                        {/* <ProgressBarButton
                            percentage={50}
                            colorScheme="black"
                            buttonText='Sub Todos'
                        /> */}
                    </Box>
                )
            },
        },
        {
            // fix 0202
            key: "supplementaryTodos",
            name: "SubTodos",
            width: 200,
            renderCell(props: any) {
                return (
                    <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
                        <ModalButtonForSupplementTodos
                            parentTodoId={props.row.id}
                            buttonText={'sub todos'}
                            countForSupplementTodos={props.row.supplementaryTodos?.length}
                            supplementaryTodos={props.row.supplementaryTodos}
                            usersEmailInfo={usersEmailInfo}
                            todoStatusOption={todoStatusOption}
                            userId={userId}
                        />
                    </Box>

                )
            }
        },
        {
            key: 'status',
            name: "Status",
            // frozen: true,
            width: 200,
            renderCell(props: any) {
                return (
                    <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"} gap={2} border={"1px dotted gray"}>
                        <Text backgroundColor={getColorForStatus(props.row.status)} width={"100%"} textAlign={"left"} pl={2}>
                            {props.row.status}
                        </Text>
                    </Box>
                )
            },

            renderEditCell: (props: {
                row: any;
                column: { key: keyof any };
                onRowChange: (updatedRow: any) => void;
                onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void;
            }) => (
                <CommonSelectBoxEdtior
                    {...props}
                    arrayForSelectOption={["idea", "ready", "progress", "testing", "complete"]}
                />
            )
        },
        {
            key: "priority",
            name: "priority",
            width: 200,
            renderCell(props: any) {
                return (
                    <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"} gap={0} border={"1px dotted gray"} height={"100%"}>
                        {/* <Icon as={true ? AiFillStar : AiOutlineStar} color={true ? "yellow.400" : "gray.400"} fontSize={"xl"} />
                        <Icon as={false ? AiFillStar : AiOutlineStar} color={false ? "yellow.400" : "gray.400"} fontSize={"xl"} /> */}
                        <StarRatingForPriority totalStars={props.row.priority} />
                    </Box>
                )
            },
        },

        {
            key: 'startTime',
            name: 'startTime',
            width: 200,
            renderCell(props: any) {
                // console.log("props.row.startTime : ", props.row.startTime);
                if (props.row.startTime !== null && props.row.startTime !== "") {
                    const value = formatDateTime(props.row.startTime);
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
        {
            key: "completedAt",
            name: "completedAt",
            width: 200,
            renderCell(props: any) {
                // console.log("props.row.startTime : ", props.row.startTime);
                if (props.row.completedAt !== null && props.row.completedAt !== "") {
                    const value = formatDateTime(props.row.completedAt);
                    return (
                        <>
                            {value}
                        </>
                    );
                } else {
                    return ""
                }
            }
        },
        {
            key: 'deadline',
            name: 'deadline',
            width: 200,
            renderCell(props: any) {
                if (props.row.deadline !== null && props.row.deadline !== "") {
                    const value = formatDateTime(props.row.deadline);
                    return (
                        <>
                            {value}
                        </>
                    );
                } else {
                    return ""
                }
            },
            renderEditCell: CommonDateTimePicker
        },
        {
            key: 'elapsedTime',
            name: 'elapsedTime',
            width: 200,
        },
        {
            key: 'briefing',
            name: 'briefings',
            width: 200,
            renderCell(props: any) {
                // const pageInfo = "uncompletedTodosPageForUser"
                return <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
                    <ModalButtonForTodoBrifingsForTodoId
                        todoWriterEmail={props.row.email}
                        todoId={props.row.id}
                        briefings={props.row.briefings}
                        pageInfo={pageInfo}
                        isMainOrSub={"main"}
                    />

                </Box>
            }
        },
        {
            key: "skilNoteUrl",
            name: 'skilNoteUrl',
            width: 110,
            renderCell(props: any) {
                const pageInfo = "uncompletedTodosPageForUser"
                const todoId = props.row.id

                return (
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        {/* 노트가 이미 존재 */}
                        {/* {props.row.skilNoteUrl} */}
                        {props.row.skilNoteUrl ? (
                            <Box>
                                <Link href={"/" + props.row.skilNoteUrl}>
                                    <Icon as={FaRegFileAlt} mr={2} /> {/* 노트 아이콘 */}
                                </Link>
                                <Icon as={FaTimes} ml={2} onClick={() => mutationForUpdateRefSkilnoteForTodo.mutate({ todoId, isMainOrSub })} cursor={"pointer"} />
                            </Box>
                        ) :
                            <HStack gap={1} mt={1.5}>
                                {/* fix 0204 참조 노트 즉시 추가 버튼 */}
                                <Button
                                    size="xs"
                                    onClick={() => mutationForUpdateRefSkilnoteForTodo.mutate({ todoId, isMainOrSub })}
                                    leftIcon={<AddIcon />}
                                    textAlign={"center"}
                                >
                                </Button>
                                {/* fix 0204 노트 선택 */}
                                <ModalButtonForSelectNoteForTodo toDoId={props.row.id} pageInfo={pageInfo} buttonText={"선택"} isMainOrSub={isMainOrSub} />
                            </HStack>
                        }
                    </Box>
                )
            }
        }
    ]
}

function getColumnsForUserUncompletedTodoList(
    isMainOrSub: "main" | "sub",
    usersEmailInfo: string[],
    pageNum: string,
    mutationForUpdateRefSkilnoteForTodo: any,
    pageInfo: string,
    todoStatusOption: "all_uncompleted" | "all_completed" | "idea" | "uncompleted" | "completed",
    userId: string
) {
    const basicColumns = getBasicColumns(isMainOrSub, usersEmailInfo, pageNum, mutationForUpdateRefSkilnoteForTodo, pageInfo, todoStatusOption, userId)

    let filteredColumns = basicColumns

    if (todoStatusOption) {

        if (todoStatusOption === "uncompleted" || todoStatusOption === "idea" || todoStatusOption === "all_uncompleted") {
            filteredColumns = basicColumns.filter(column => {
                if (column.key !== 'elapsedTime' && column.key !== 'completedAt') {
                    return column
                }
            });
            return filteredColumns;
        }

        if (todoStatusOption === "completed") {
            filteredColumns = basicColumns.filter(column => {
                if (column.key !== 'elapsedTime') {
                    return column
                }
            });
            return filteredColumns;
        }

        if (todoStatusOption === "all_completed") {
            filteredColumns = basicColumns.filter(column => {
                if (column.key !== 'deadline') {
                    return column
                }
            });
            return filteredColumns
        }

        return filteredColumns;
    }


    return basicColumns
}


interface ITypeForGridRows {
    id: any,
    email: string;
    task: string;
    status: string;
    startTime: string;
    deadline: Date | null;
}

interface IProps {
    todoStatusOption: "all_uncompleted" | "all_completed" | "idea" | "uncompleted" | "completed";
    pageInfo: "todosPageForAllUser" | "uncompletedTodosPageForUser";
    selectedUserId?: any;
}

console.log("styles.completedRow : ", styles.completedRow);

// 1122
const DataGridForUserTodoList = ({ selectedUserId, todoStatusOption, pageInfo }: IProps) => {
    const isMainOrSub = "main"

    const toast = useToast();
    const loginUser = useSelector((state: RootState) => state.user.loginUser);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    const [pageNum, setPageNum] = useState(1);

    const userId = selectedUserId ? selectedUserId : loginUser.id
    const { isLoading, error, data: dataForUncompletedTodoListForUser }
        = useApiForGetUncompletedTodoListForUserId({ pageNum, userId, todoStatusOption });

    // console.log("dataForUncompletedTodoListForUser : ", dataForUncompletedTodoListForUser);

    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const [todoList, setTodoList] = useState<ITypeForGridRows[]>([
    ])

    const [usersEmailInfo, setUsersEmailInfo] = useState<string[]>([])
    const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());

    const mutationForUpdateRefSkilnoteForTodo = useApiForUpdateRefSkilnoteForTodo({ pageNum });
    const [rowNumToAdd, setRowNumToAdd] = useState<number>(1);
    const [defaultUserEmail, setDefaultUserEmail] = useState(loginUser.email);
    const [defaultDeadLine, setDefaultDeadline] = useState<Date | null>(null);
    const [defaultTodoStatus, setDefaultTodoStatus] = useState<string>("ready");

    const mutationForSaveTodoRows = useApiForSaveTodoListForUserMutation(pageNum, loginUser.id, todoStatusOption);
    const deleteForTodosForCheckedIdsMutation = useApiForDeleteTodosForCheckedIds({ pageNum, pageInfo, todoStatusOption });

    const mutationForMultiUpdateForTodoRowsForChecked = useApiForMultiUpdateForTodoRowsForChecked({ pageNum, userId, todoStatusOption });

    const mutationForSimpleCreateTodo = useApiForSimpleCreateTodo({ pageInfo });

    const columns = useMemo(() => getColumnsForUserUncompletedTodoList(
        isMainOrSub,
        usersEmailInfo,
        String(pageNum),
        mutationForUpdateRefSkilnoteForTodo,
        pageInfo,
        todoStatusOption,
        userId
    ), [dataForUncompletedTodoListForUser, usersEmailInfo]);

    const deleteButtonHandler = () => {
        const selectedRowsArray = Array.from(selectedRows);
        const idsToDelete = selectedRowsArray.map(id => id);
        console.log("IDs to delete:", idsToDelete);
        deleteForTodosForCheckedIdsMutation.mutate(idsToDelete)
        setSelectedRows(new Set())
    };

    const handleAddRow = () => {
        console.log("add row check");
        console.log("todo Rows : ", todoList);

        // if (!todoRows) return;
        if (todoList) {
            const newRows = Array.from({ length: rowNumToAdd }, (_, index) => {
                const newId = todoList.length ? Math.max(...todoList.map(row => row.id)) + index + 1 : index + 1;
                return {
                    id: newId,
                    email: loginUser.email || '',
                    task: 'todo for sample',
                    status: 'ready',
                    startTime: '',
                    deadline: defaultDeadLine
                };
            });
            setTodoList(prevRows => (prevRows ? [...prevRows, ...newRows] : newRows));

        } else {
            const newId = 1
            const newRow = {
                id: newId,
                email: loginUser.email || '',
                task: 'todo for sample',
                status: 'ready',
                startTime: '',
                deadline: defaultDeadLine || null
            };
            setTodoList((prev) => [newRow]);
        }
    };

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setDefaultUserEmail(event.target.value); // 선택한 이메일로 defaultUserEmail 상태 업데이트
    };

    const handleSave = () => {
        const todoRowsForSave = todoList?.filter(row => selectedRows.has(row.id)) || [];
        console.log('todoRowsForSave : ', todoRowsForSave);
        mutationForSaveTodoRows.mutate({ todoRowsForSave });
        setSelectedRows(new Set())
    };

    const createTodoButtonClick = () => {
        if (!defaultUserEmail || defaultDeadLine === null || !rowNumToAdd || !inputValue) {
            toast({
                title: "알림",
                description: "모든 필드를 입력해주세요.",
                status: "warning",
                duration: 3000, // 토스트 메시지가 표시될 시간 (ms)
                isClosable: true, // 사용자가 닫을 수 있는지 여부
            });
            return;
        }

        mutationForSimpleCreateTodo.mutate({
            task: inputValue,
            deadline: defaultDeadLine,
            email: defaultUserEmail,
            rowNum: rowNumToAdd,
            todoStatusOption: todoStatusOption
        })

    };

    const basicOptionButtonClick = (option: string) => {
        const currentUser = loginUser.email;
        const currentTime = new Date();
        console.log(currentUser);

        if (option === "b1") {
            // 오후 1시(13시) 설정
            const twoHoursLater = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000);
            twoHoursLater.setHours(13, 0, 0, 0); // 오후 1시로 설정
            setDefaultUserEmail(currentUser);
            setDefaultDeadline(twoHoursLater);
        } else if (option === "b2") {
            // 오후 6시(18시) 설정
            const twoHoursLater = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000);
            twoHoursLater.setHours(18, 0, 0, 0); // 오후 6시로 설정
            setDefaultUserEmail(currentUser);
            setDefaultDeadline(twoHoursLater);
        }
    }


    // fix
    const multiUpdateTodoRowsForCheckedButonClick = () => {
        const selectedRowIdsArray = Array.from(selectedRows);

        if (selectedRowIdsArray.length < 1) {
            toast({
                title: "알림",
                description: "최소 1개의 항목을 선택해주세요.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }


        const dtoForMultiUpdateTodoRowsForChecked = {
            selectedRowIdsArray,
            defaultDeadLine,
            defaultTodoStatus,
            defaultUserEmail
        }

        mutationForMultiUpdateForTodoRowsForChecked.mutate(dtoForMultiUpdateTodoRowsForChecked);
    };


    // 2244 
    useEffect(() => {
        // let todoRowsToShow: ITypeForGridRows | {
        //     id: number; email: string; task: string; status: string; startTime: string; // 변환된 형태로 저장
        //     deadline: Date; elapsedTime: string; briefings: IBriefing[]; skilNoteUrl: string; refSkilNoteId: number;
        // }[];
        let todoRowsToShow;

        if (dataForUncompletedTodoListForUser) {
            setUsersEmailInfo(dataForUncompletedTodoListForUser.usersEmailInfo)
        }

        console.log("dataForUncompletedTodoListForUser check ???", dataForUncompletedTodoListForUser);

        if (dataForUncompletedTodoListForUser && dataForUncompletedTodoListForUser.todoList.length > 0) {
            todoRowsToShow = dataForUncompletedTodoListForUser.todoList.map((row: ITypeForTodoRow) => {
                return {
                    id: row.id,
                    email: row.manager.email,
                    managerId: row.manager.id,
                    profileImage: row.manager.profileImage,
                    task: row.task,
                    supplementaryTodos: row.supplementaryTodos,
                    priority: row.priority,
                    status: row.status,
                    startTime: row.startTime, // 변환된 형태로 저장
                    deadline: row.deadline,
                    completedAt: row.completedAt,
                    elapsedTime: row.elapsedTime,
                    briefings: row.briefings,
                    skilNoteUrl: row.skilNoteUrl,
                    refSkilNoteId: row.refSkilNoteId
                    // fix 11
                }
            })
            setTodoList(todoRowsToShow)
            // setIsEnd(false)
            // setTodoRows((prev: any) => [prev, todoRowsToShow])
        }
    }, [dataForUncompletedTodoListForUser])

    return (
        <Box width="100%" mt={2} my={1} px={1} border={"1px solid black"} py={2}>

            <Box display={"flex"} justifyContent={"space-between"} gap={2} m={1}>

                총 {dataForUncompletedTodoListForUser?.todoList.length} 개
                {/* <Button>multi update</Button> */}
                <Button onClick={() => basicOptionButtonClick("b1")}>b1</Button>
                <Button onClick={() => basicOptionButtonClick("b2")}>b2</Button>

                {pageInfo === "todosPageForAllUser" && todoStatusOption !== "all_completed" ?
                    (
                        <Box width={"14%"}>
                            {usersEmailInfo.length ? (
                                <Select
                                    placeholder="Select user"
                                    value={defaultUserEmail} // 현재 defaultUserEmail 상태값으로 선택
                                    onChange={handleSelectChange} // 선택 시 상태 업데이트
                                    size={"md"}
                                >
                                    {usersEmailInfo.map((email, index) => (
                                        <option key={index} value={email}>
                                            {email}
                                        </option>
                                    ))}
                                </Select>
                            ) : (
                                "No users"
                            )}
                        </Box>
                    )
                    : ""}

                {
                    todoStatusOption !== "completed" && todoStatusOption !== "all_completed" ?
                        (
                            <>
                                <Box
                                    width={"14%"}
                                    // border={"1px solid green"}
                                    textAlign={"center"}
                                >
                                    {/* 0203 */}
                                    {/* fix */}
                                    {defaultDeadLine !== null ?
                                        (
                                            <Box display={"flex"} gap={1} justifyContent={"center"}>
                                                <Text>
                                                    {defaultDeadLine.toLocaleString()}
                                                </Text>
                                                <Button onClick={() => setDefaultDeadline(null)} ml={2} variant="ghost" size={"sm"}>
                                                    <CloseIcon />
                                                </Button>
                                            </Box>
                                        )
                                        : (
                                            <>
                                                <ModalButtonForSelectDeadLine button_text={"select deadline"} setDefaultDeadline={setDefaultDeadline} />
                                            </>
                                        )}
                                </Box>

                                <Box>
                                    <SelectBoxForDefaultTodoStatus
                                        onChangeStatus={setDefaultTodoStatus}
                                    />
                                </Box>
                                <Button variant={"outline"} onClick={multiUpdateTodoRowsForCheckedButonClick}>update ({selectedRows.size})</Button>

                                <Box width={"30%"}>
                                    <InputGroup>
                                        <Input
                                            placeholder="Enter text"
                                            value={inputValue}
                                            onChange={handleInputChange}
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={createTodoButtonClick}>
                                                입력
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </Box>

                                <Box>
                                    <SelectBoxForNumberToAddRow rowNumToAdd={rowNumToAdd} setRowNumToAdd={setRowNumToAdd} />
                                </Box>

                                <Button variant={"outline"} onClick={handleAddRow}>Add Row</Button>
                                <Button variant={"outline"} onClick={handleSave}>Save</Button>
                            </>
                        )
                        : ""
                }
                <Button variant={"outline"} onClick={deleteButtonHandler}>Delete ({selectedRows.size})</Button>
            </Box>

            <Box>
                <DataGrid
                    rowKeyGetter={(row) => row.id}
                    columns={columns}
                    rows={todoList}
                    renderers={{ renderSortStatus, renderCheckbox }}
                    selectedRows={selectedRows}
                    onSelectedRowsChange={(selected) => {
                        const selectedRowIds = Array.from(selected.values());
                        console.log("체크된 번호들: ", selectedRowIds);
                        setSelectedRows(selected);
                    }}
                    // rowClass={(row, index) =>
                    //     row.status === "complete" ? styles.completedRow : ""
                    // }
                    style={{ width: "100%", height: pageInfo === "todosPageForAllUser" ? "70vh" : "50vh" }}
                    onRowsChange={setTodoList}
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

function renderSortStatus({ sortDirection, priority }: RenderSortStatusProps) {
    return (
        <>
            {sortDirection !== undefined ? (sortDirection === 'ASC' ? '\u2B9D' : '\u2B9F') : null}
            <span>{priority}</span>
        </>
    );
}

export default DataGridForUserTodoList;
