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
import { SelectColumnForReactDataGrid } from '@/components/Formatter/CheckBox/SelectColumnForRdg';


const columns: Column<IChallengeRow>[] = [
    SelectColumnForReactDataGrid,
    {
        key: 'id',
        name: 'ID'
    },
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
        key: 'prize',
        name: 'Prize',
        renderEditCell: CommonTextEditor
    },
    {
        key: 'deadline',
        name: 'Deadline',
        renderEditCell: CommonDateTimePicker
    },
];

type Props = {}

const FrontChallenges = (props: Props) => {
    const [pageNum, setPageNum] = useState(1); // pageNum 상태 선언 및 초기값 설정
    const [challengeRows, setChallengeRows] = useState<IChallengeRow[]>([])
    const { isLoading, error, data: dataForChallenges } = useApiForGetAllChallengesWithPageNum(pageNum);
    const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());

    console.log("dataForChallenges : ", dataForChallenges);

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
                    email: row.writer.email
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

                    <Button
                        aria-label="Add Row"
                        leftIcon={<FaPlus />}
                        colorScheme="green"
                        variant="outline"
                        onClick={handleAddRowButtonClick}
                    >
                        Add Row
                    </Button>
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
