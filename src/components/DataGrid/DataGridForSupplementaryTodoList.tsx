import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import DataGrid, { RenderCheckboxProps, RenderSortStatusProps } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { SupplementaryTodo } from '@/types/typeforTodos';
import { SelectColumnForReactDataGrid } from '../Formatter/CheckBox/SelectColumnForRdg';
import useApiForUpdateRefSkilnoteForTodo from '@/hooks/useApiForUpdateRefSkilnoteForTodo';
import CommonSelectBoxEdtior from '../GridEditor/SelectBox/CommonSelectBoxEdtior';
import CommonTextEditor from '../GridEditor/TextEditor/CommonTextEditor';
import StarRatingForPriority from '../StarRating/StarRatingForPriority';
import { format } from 'date-fns';
import CommonDateTimePicker from '../GridEditor/DateTimePicker/CommonDateTimePicker';
import ModalButtonForTodoBrifingsForTodoId from '../Modal/ModalButtonForTodoBrifingsForTodoId';

import { FaRegFileAlt, FaTimes } from 'react-icons/fa';  // 노트와 취소 아이콘 추가
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import ModalButtonForSelectNoteForTodo from '../Modal/ModalButtonForSelectNoteForTodo';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import useApiForSaveSupplementaryTodoListForUserMutation from '@/hooks/useApiForSaveSupplementaryTodoListForUserMutation';
import ModalButtonForSelectDeadLine from '../Modal/ModalButtonForSelectDeadLine';
import SelectBoxForNumberToAddRow from '../Select/SelectBoxForNumberToAddRow';
import {
    Avatar,
    Box,
    Button,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Text,
    useToast
} from '@chakra-ui/react';
import useApiForSimpleCreateSupplementaryTodo from '@/hooks/useApiForSimpleCreateSupplementaryTodo';
import useApiForDeleteSupplementaryTodosForCheckedIds from '@/hooks/useApiForDeleteSupplementaryTodosForCheckedIds';
import Link from 'next/link';
import useApiForMultiUpdateForSupplementaryTodoRowsForChecked from '@/hooks/useApiForMultiUpdateForSupplementaryTodoRowsForChecked';
import SelectBoxForDefaultTodoStatus from '../Select/SelectBoxForDefaultTodoStatus';


const formatDateTime = (dateTime: string | any) => {
    console.log("dateTime : ", typeof dateTime);

    if (dateTime !== undefined) {
        const time = new Date(dateTime);
        return format(time, "MM-dd HH:mm");
    }

};

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

type Props = {
    parentTodoId: number;
    supplementaryTodos: SupplementaryTodo[];
    usersEmailInfo: string[]
    todoStatusOption: "all_uncompleted" | "all_completed" | "idea" | "uncompleted" | "completed" | "entry",
    userId: string
}

const getBasicColumns = (
    usersEmailInfo: string[],
    mutationForUpdateRefSkilnoteForTodo: any,
    originUrl: string
) => {
    return [
        SelectColumnForReactDataGrid,
        {
            key: "id",
            name: "id"
        },
        {
            key: 'email',
            name: 'Email',
            width: 280,
            // frozen: true,
            renderCell(props: any) {
                return (
                    <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"} gap={2}>
                        <Avatar src={props.row.manager?.profileImage} size={"sm"} />
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
            renderEditCell: CommonTextEditor
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
            key: 'briefing',
            name: 'briefings',
            width: 200,
            renderCell(props: any) {
                return (
                    <Box
                        display={"flex"}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                    >
                        <ModalButtonForTodoBrifingsForTodoId
                            todoWriterEmail={props.row.email}
                            todoId={props.row.id}
                            briefings={props.row.briefings}
                            isMainOrSub='sub'
                        />

                    </Box>
                )
            }
        },
        {
            key: "priority",
            name: "priority",
            width: 300,
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
                // console.log("props.row.startTime : ", props.row);
                // console.log("props.row.startTime : ", props.row.startTime);
                if (props.row.startTime !== null && props.row.startTime !== "") {
                    // console.log("이게 실행 되면 에러 발생 인데 !");
                    console.log("props.row.startTime : ", props.row.startTime);

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
                    console.log("props.row.completedAt : ", props.row.completedAt);

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
                    console.log("props.row.deadline : ", props.row.deadline);

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
            key: "skilNoteUrl",
            name: 'skilNoteUrl',
            width: 110,
            renderCell(props: any) {
                const pageInfo = "uncompletedTodosPageForUser"
                const todoId = props.row.id
                const isMainOrSub = "sub"

                return (
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        {props.row.skilNoteUrl ? (
                            <Box>
                                {/* {props.row.skilNoteUrl} */}
                                {/* <Link href={originUrl + props.row.skilNoteUrl} target="_blank" rel="noopener noreferrer">
                                    <Icon as={FaRegFileAlt} mr={2} />
                                </Link> */}
                                <a href={originUrl + props.row.skilNoteUrl} target="_blank" rel="noopener noreferrer">
                                    <Icon as={FaRegFileAlt} mr={2} />
                                </a>
                                <Icon as={FaTimes} ml={2} onClick={() => mutationForUpdateRefSkilnoteForTodo.mutate({ todoId, isMainOrSub })} cursor={"pointer"} />
                            </Box>
                        ) :
                            <HStack gap={1} mt={1.5}>
                                <Button
                                    size="xs"
                                    onClick={() => mutationForUpdateRefSkilnoteForTodo.mutate({ todoId, isMainOrSub })}
                                    leftIcon={<AddIcon />}
                                    textAlign={"center"}
                                >
                                </Button>
                                <ModalButtonForSelectNoteForTodo toDoId={props.row.id} pageInfo={pageInfo} buttonText={"선택"} isMainOrSub={isMainOrSub} />
                            </HStack>
                        }
                    </Box>
                )
            }
        }
    ]
}

// 1122
const DataGridForSupplementaryTodoList = ({
    parentTodoId,
    usersEmailInfo,
    supplementaryTodos,
    todoStatusOption,
    userId
}: Props) => {

    const originUrl = window.location.origin;

    console.log("originUrl ", originUrl);

    const toast = useToast();
    const [todoRows, setTodoRows] = useState<SupplementaryTodo[] | any>()
    const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());

    const [pageNum, setPageNum] = useState(1);
    const loginUser = useSelector((state: RootState) => state.user.loginUser);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const pageInfo = "test"
    const [defaultUserEmail, setDefaultUserEmail] = useState<string>();
    const [defaultDeadLine, setDefaultDeadline] = useState<Date | null>(null);
    const [rowNumToAdd, setRowNumToAdd] = useState<number>(1);
    const [inputValue, setInputValue] = useState('');
    const [defaultTodoStatus, setDefaultTodoStatus] = useState<string>("ready");

    // mutations
    const mutationForUpdateRefSkilnoteForTodo = useApiForUpdateRefSkilnoteForTodo({ pageNum });
    const mutationFordSupplementarySaveTodoRows = useApiForSaveSupplementaryTodoListForUserMutation({ pageNum, userId, todoStatusOption });

    const mutationForSimpleCreateSupplementaryTodo = useApiForSimpleCreateSupplementaryTodo({ pageInfo });
    const deleteForSupplementaryTodosForCheckedIdsMutation = useApiForDeleteSupplementaryTodosForCheckedIds({ pageNum, pageInfo });
    const mutationForMultiUpdateForSupplementaryTodoRowsForChecked = useApiForMultiUpdateForSupplementaryTodoRowsForChecked({ pageNum, userId, todoStatusOption });


    const columns = useMemo(() => getBasicColumns(
        usersEmailInfo,
        mutationForUpdateRefSkilnoteForTodo,
        originUrl
    ), [usersEmailInfo, supplementaryTodos]);


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setDefaultUserEmail(event.target.value); // 선택한 이메일로 defaultUserEmail 상태 업데이트
    };

    const saveButtonClick = () => {
        const supplementaryTodoRowsForSave = todoRows?.filter((row: SupplementaryTodo) => selectedRows.has(row.id)) || [];

        // alert("체크 버튼이 체크된 행들에 대해 save button 을 클릭하면 추가된 행은 추가 수정된 행은 update")
        mutationFordSupplementarySaveTodoRows.mutate({ supplementaryTodoRowsForSave, parentTodoId });
        setSelectedRows(new Set())
    }

    const deleteButtonClick = () => {
        const selectedRowsArray = Array.from(selectedRows);
        const idsToDelete = selectedRowsArray.map(id => id);
        console.log("IDs to delete:", idsToDelete);
        deleteForSupplementaryTodosForCheckedIdsMutation.mutate(idsToDelete)
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

        // fix 0129
        mutationForSimpleCreateSupplementaryTodo.mutate({
            parentTodoId: parentTodoId,
            task: inputValue,
            deadline: defaultDeadLine,
            email: defaultUserEmail,
            rowNum: rowNumToAdd,
        })

    };

    // addRowButtonClick
    const addRowButtonClick = () => {
        console.log("add row check");
        console.log("todo Rows : ", todoRows);

        if (!defaultUserEmail || !defaultDeadLine) {
            toast({
                title: "경고",
                description: "이메일 또는 마감 기한을 설정해주세요.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // if (!todoRows) return;
        if (todoRows) {
            const newRows = Array.from({ length: rowNumToAdd }, (_, index) => {
                const newId = todoRows.length ? Math.max(...todoRows.map((row: any) => row.id)) + index + 1 : index + 1;
                return {
                    id: newId,
                    email: defaultUserEmail || '',
                    task: 'todo for sample',
                    status: 'ready',
                    startTime: '',
                    deadline: defaultDeadLine || ''
                };
            });
            setTodoRows((prevRows: any) => (prevRows ? [...newRows, ...prevRows,] : newRows));

        } else {
            const newId = 1
            const newRow = {
                id: newId,
                email: defaultUserEmail,
                task: 'todo for sample',
                status: 'ready',
                startTime: '',
                deadline: defaultDeadLine
            };
            setTodoRows((prev: any) => [newRow]);
        }
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


        const dtoForMultiUpdateSupplementaryTodoRowsForChecked = {
            selectedRowIdsArray,
            defaultDeadLine,
            defaultTodoStatus,
            defaultUserEmail
        }

        mutationForMultiUpdateForSupplementaryTodoRowsForChecked.mutate(dtoForMultiUpdateSupplementaryTodoRowsForChecked);
    };

    // 2244
    useEffect(() => {
        let todoRowsForUpdate = []
        if (supplementaryTodos) {
            todoRowsForUpdate = supplementaryTodos.map((row) => {
                return {
                    id: row.id,
                    email: row.manager.email,
                    manager: row.manager,
                    task: row.task,
                    details: row.details,
                    status: row.status,
                    startTime: row.startTime,
                    completedAt: row.completedAt,
                    deadline: row.deadline,
                    elapsedTime: row.elapsedTime,
                    priority: row.priority,
                    skilNoteUrl: row.skilNoteUrl,
                    refSkilNoteId: row.refSkilNoteId,
                    briefings: row.briefings
                }
            })
            setTodoRows(todoRowsForUpdate)
        }

    }, [supplementaryTodos])

    console.log("usersEmailInfo : ", usersEmailInfo);

    return (
        <Box>
            <Box display={"flex"} gap={2} flexDirection={"column"}>

                <Box display={"flex"} gap={2}>
                    <Button onClick={() => basicOptionButtonClick("b1")}>b1</Button>
                    <Button onClick={() => basicOptionButtonClick("b2")}>b2</Button>
                    <Box width={"20%"}>
                        {usersEmailInfo.length ? (
                            <Select
                                placeholder="default user"
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

                    {/* fix 0203 */}
                    {/* 데드라인  */}
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
                    <Box>
                        <Button variant={"outline"} onClick={addRowButtonClick}>Add Row</Button>
                    </Box>
                    <Box>
                        <Button onClick={saveButtonClick}>save</Button>
                    </Box>

                    <Box>
                        <Button variant={"outline"} onClick={deleteButtonClick}>Delete ({selectedRows.size})</Button>
                    </Box>

                </Box>

                <Box display={"flex"} border={"0px solid orange"} justifyContent={"space-between"} alignItems={"center"}>

                    <Box>
                        <SelectBoxForNumberToAddRow rowNumToAdd={rowNumToAdd} setRowNumToAdd={setRowNumToAdd} />
                    </Box>

                    <Box border={"0px solid green"} width={"100%"} p={1}>
                        <InputGroup>
                            <Input
                                placeholder="Enter text"
                                value={inputValue}
                                onChange={handleInputChange}
                                width={"100%"}
                            />
                            <InputRightElement>
                                <Button h="1.75rem" size="sm" onClick={createTodoButtonClick}>
                                    입력
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                </Box>

            </Box>


            <DataGrid
                rowKeyGetter={(row) => row.id}
                columns={columns}
                rows={todoRows ? todoRows : []}
                renderers={{ renderSortStatus, renderCheckbox }}
                selectedRows={selectedRows}
                onSelectedRowsChange={(selected) => {
                    const selectedRowIds = Array.from(selected.values());
                    console.log("체크된 번호들: ", selectedRowIds);
                    setSelectedRows(selected);
                }}
                onRowsChange={setTodoRows}
                style={{ height: "50vh" }}
            />
        </Box>
    );
}

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

export default DataGridForSupplementaryTodoList;



