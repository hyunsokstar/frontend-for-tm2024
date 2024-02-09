import React, { useState } from 'react';
import {
    Box,
    Flex,
    Button,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Checkbox,
    useToast,
} from '@chakra-ui/react';
import MyPagination from '@/components/MyPagination';
import { UseMutationOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiForDeleteUsersForCheckedIds, apiForGetAllUsers } from '@/api/apiForUserBoard';
import { ITypeForResponseDataForGetAllUsers } from '@/types/typeForUserBoard';


const ContainerForUserBoard = ({
}) => {

    const queryClient = useQueryClient();
    const toast = useToast();
    const [pageNum, setPageNum] = useState(1);
    const [checkedIds, setCheckedIds] = useState<number[]>([]); // 체크된 아이템 ID를 저장하는 상태
    const [isAllChecked, setIsAllChecked] = useState(false); // 모두 선택 여부를 저장하는 상태

    const { isLoading: isPending, error, data: dataForUserBoard } = useQuery<ITypeForResponseDataForGetAllUsers>({
        queryKey: ['apiForGetAllUsers', pageNum],
        queryFn: apiForGetAllUsers,
    });

    console.log("dataForUserBoard : ", dataForUserBoard);

    const handleCheckboxChange = (id: number) => {
        // 이미 체크된 아이디면 제거, 아니면 추가하는 방식으로 상태 업데이트
        if (checkedIds.includes(id)) {
            setCheckedIds(checkedIds.filter((checkedId) => checkedId !== id));
        } else {
            setCheckedIds([...checkedIds, id]);
        }
    };

    const handleAllCheckboxChange = () => {
        if (isAllChecked) {
            setCheckedIds([]);
        } else {
            const allIds = dataForUserBoard?.users.map((user) => user.id) || [];
            setCheckedIds(allIds);
        }
        setIsAllChecked(!isAllChecked);
    };

    const mutationForDeleteCheckedRows = useMutation(
        {
            mutationFn: (checkedIds: number[]) => apiForDeleteUsersForCheckedIds(checkedIds),
            onSuccess: (result: any) => {
                // queryClient.refetchQueries({ queryKey: ['apiForGetAllUsers'] })

                queryClient.setQueryData<ITypeForResponseDataForGetAllUsers | undefined>(
                    ['apiForGetAllUsers', pageNum],
                    (oldData) => {
                        if (!oldData) return undefined;
                        const updatedUsers = oldData.users.filter(user => !checkedIds.includes(user.id));
                        return {
                            ...oldData,
                            users: updatedUsers,
                        };
                    }
                );

                toast({
                    title: "Delete Users For Checked",
                    description: result.message,
                    status: "success",
                    duration: 2000, // 토스트 메시지가 보여지는 시간 (2초)
                    isClosable: true,
                });
            },
            onError: (error: Error) => {
                // ...
            },
            onSettled: () => {
                queryClient.invalidateQueries({ queryKey: ['apiForGetAllUsers'] })
            }
        } as UseMutationOptions<Promise<any>, Error, number[], unknown>
    );

    const handleDelete = () => {
        // 체크된 아이템이 없다면 삭제를 실행하지 않음
        if (checkedIds.length === 0) {
            alert("삭제할 아이템을 선택해주세요.");
            return;
        }

        mutationForDeleteCheckedRows.mutate(checkedIds);
    };

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Flex width={"80%"} justifyContent={"space-between"} pr={2} gap={2} mt={5}>
                <Button
                    variant="outline"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </Flex>


            <Table variant="striped" colorScheme="gray" width="80%" textAlign={"center"}>
                <Thead>
                    <Tr>
                        <Th width="5%"><Checkbox isChecked={isAllChecked} onChange={handleAllCheckboxChange} /></Th>
                        <Th width="15%">Email</Th>
                        <Th width="15%">Nickname</Th>
                        <Th width="10%">Role</Th>
                        <Th width="10%">Gender</Th>
                        <Th width="25%">Phone Number</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {dataForUserBoard ? dataForUserBoard.users.map((user) => (
                        <Tr key={user.id}>
                            <Td width="5%"><Checkbox isChecked={checkedIds.includes(user.id)} onChange={() => handleCheckboxChange(user.id)} /></Td>
                            <Td width="15%">{user.email}</Td>
                            <Td width="15%">{user.nickname}</Td>
                            <Td width="10%">{user.role}</Td>
                            <Td width="10%">{user.gender}</Td>
                            <Td width="25%">{user.phoneNumber}</Td>
                        </Tr>
                    )) : "no users"}
                </Tbody>
            </Table>
            {dataForUserBoard && dataForUserBoard?.users.length > 0 ?
                <Box style={{ marginTop: "15px" }}>
                    <MyPagination totalCount={dataForUserBoard.totalCount} perPage={dataForUserBoard.perPage} currentPage={pageNum} setCurrentPage={setPageNum} />
                </Box>
                : ""}
        </Box>
    );
};

export default ContainerForUserBoard;
