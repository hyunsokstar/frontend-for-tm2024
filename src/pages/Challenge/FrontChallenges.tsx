import React, { useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import {
    Box, ButtonGroup, IconButton, Flex, Text, HStack, Button
} from '@chakra-ui/react'; // Chakra UI 버튼을 사용합니다.
import { FaSave, FaTrash, FaPlus } from 'react-icons/fa'; // 아이콘을 사용합니다.
import DataGrid, { Column, RenderCheckboxProps, RenderSortStatusProps } from 'react-data-grid';
import useApiForGetAllChallengesWithPageNum from '@/hooks/useApiForGetAllChallengesWithPageNum';
import { IChallengeRow } from '@/types/typeforChallenges';
import CommonTextEditor from '@/components/GridEditor/TextEditor/CommonTextEditor';
import CommonDateTimePicker from '@/components/GridEditor/DateTimePicker/CommonDateTimePicker';
import ModalButtonForSimpleCreateChallenge from '@/components/Modal/ModalButtonForSimpleCreateChallenge';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { format } from 'date-fns';
import useUser from '@/hooks/useUser';
import useApiForDeleteChallenges from '@/hooks/useApiForDeleteChallenges';
import ModalButtonForUpdateChallenge from '@/components/Modal/ModalButtonForUpdateChallenge';
import ModalButtonForSubChallengeList from '@/components/Modal/ModalButtonForSubChallengeList';

const formatDateTime = (dateTime: string | any) => {
    console.log("dateTime : ", typeof dateTime);

    if (dateTime !== undefined) {
        const time = new Date(dateTime);
        return format(time, "MM-dd HH:mm");
    }

};

const getColumns = ({ loginUser, pageNum, handleEdit, handleDelete }: any): any[] => {
    return [
        {
            key: 'email',
            name: 'Writer Email'
        },
        {
            key: 'challengeName',
            name: 'Challenge Name',
            renderEditCell: CommonTextEditor
        },
        {
            key: 'description',
            name: 'Description',
            renderEditCell: CommonTextEditor
        },
        {
            key: 'subChallenges',
            name: 'subChallenges',
            renderCell: (props: any) => (
                <Box>
                    <ModalButtonForSubChallengeList
                        pageNum={pageNum}
                        buttonText={'subChallenges'}
                        challenge={props.row}
                        subChallenges={props.row.subChallenges}
                    />
                </Box>
            )
        },
        {
            key: 'deadline',
            name: 'Deadline',
            renderEditCell: CommonDateTimePicker,
            renderCell: (props: any) => (
                <Box>
                    {formatDateTime(props.row.deadline)}
                </Box>
            )
        },
        {
            key: 'utils',
            name: 'utils',
            renderCell: (props: any) => (
                <Box>
                    {loginUser.email === props.row.email ?
                        <>
                            <ModalButtonForUpdateChallenge
                                isMainOrSub="main"
                                challenge={props.row}
                                buttonText={'update'}
                                challengeId={props.row.id}
                                pageNum={pageNum}
                            />

                            <IconButton
                                aria-label="Delete"
                                icon={<DeleteIcon />}
                                onClick={() => handleDelete("main", props.row.id)}
                                variant="outline"
                                size="xs"
                                colorScheme="danger" // 버튼 색상 적용
                                _hover={{ bg: 'red.200' }} // 호버 시에 배경색 변경
                            />
                        </>
                        : ""}
                </Box>
            )
        }
    ];
};

type Props = {}

const FrontChallenges = (props: Props) => {
    const [pageNum, setPageNum] = useState(1); // pageNum 상태 선언 및 초기값 설정
    const [challengeRows, setChallengeRows] = useState<IChallengeRow[]>([])
    const { isLoading, error, data: dataForChallenges } = useApiForGetAllChallengesWithPageNum(pageNum);
    const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());
    const { isLoggedIn, loginUser, logout } = useUser();
    const deleteChallengesMutation = useApiForDeleteChallenges(pageNum);


    console.log("dataForChallenges : ", dataForChallenges);
    // 수정 및 삭제 버튼 클릭 시 실행될 함수 정의
    const handleEdit = (id: number) => {
        // 수정 버튼 클릭 시 실행될 로직을 구현합니다.
        console.log('Edit button clicked for row with id:', id);
    };

    const handleDelete = (isMainOrSub: string, challengeId: number) => {
        try {
            deleteChallengesMutation.mutateAsync({ isMainOrSub, challengeId });
        } catch (error) {
            console.error('챌린지 삭제 중 에러 발생:', error);
        }

    };
    const columns = getColumns({ loginUser, pageNum, handleEdit, handleDelete })

    useEffect(() => {
        let challengeRowsToUpdate;
        if (dataForChallenges && dataForChallenges.challengeList) {
            challengeRowsToUpdate = dataForChallenges.challengeList.map((row) => {
                return {
                    id: row.id,
                    challengeName: row.challengeName,
                    description: row.description,
                    prize: row.prize,
                    deadline: row.deadline,
                    createdAt: row.createdAt,
                    updatedAt: row.updatedAt,
                    writer: row.writer,
                    email: row.writer.email,
                    subChallenges: row.subChallenges
                }
            })
            setChallengeRows(challengeRowsToUpdate); // challengeRowsToUpdate가 정의된 경우에만 setChallengeRows 호출
        }
    }, [dataForChallenges]);

    const handleSaveButtonClick = () => {
        // 저장 버튼 클릭 시 실행할 로직을 구현합니다.
        console.log('Save button clicked');
    };

    const handleDeleteButtonClick = () => {
        // 삭제 버튼 클릭 시 실행할 로직을 구현합니다.
        console.log('Delete button clicked');
    };

    const handleAddRowButtonClick = () => {
        // 새로운 행 추가 버튼 클릭 시 실행할 로직을 구현합니다.
        console.log('Add row button clicked');
    };

    return (
        <Box width="100%" m="2">
            <Flex justifyContent="flex-end" m="2" mt={6} mr={2}>
                <HStack spacing="2">
                    <Button
                        aria-label="Delete"
                        leftIcon={<FaTrash />}
                        colorScheme="red"
                        variant="outline"
                        onClick={handleDeleteButtonClick}
                    >
                        Delete
                    </Button>

                    <Button
                        aria-label="Save"
                        leftIcon={<FaSave />}
                        colorScheme="facebook"
                        variant="outline"
                        onClick={handleSaveButtonClick}
                    >
                        Save
                    </Button>


                    <ModalButtonForSimpleCreateChallenge />

                </HStack>
            </Flex>


            <DataGrid
                rowKeyGetter={(row) => row.id}
                renderers={{ renderSortStatus, renderCheckbox }}
                columns={columns}
                rows={challengeRows}
                selectedRows={selectedRows}
                onSelectedRowsChange={(selected) => {
                    const selectedRowIds = Array.from(selected.values());
                    console.log("체크된 번호들: ", selectedRowIds);
                    setSelectedRows(selected);
                }}
            />

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


export default FrontChallenges;
