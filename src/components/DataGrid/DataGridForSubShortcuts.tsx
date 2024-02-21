import React, { useState, useEffect, useMemo } from 'react';
import 'react-data-grid/lib/styles.css';
import { Box, Button, Input, useToast, useClipboard, Flex, Editable, EditablePreview, EditableInput } from '@chakra-ui/react';
import DataGrid from 'react-data-grid';
import { ITypeForSubShortCutListRow } from '@/types/typeForShortCut';

const getColumnsForSubShortCutList = (toast: any) => {
    return [
        {
            key: 'id',
            name: 'ID',
            width: 10
        },
        {
            key: 'shortcut',
            name: 'Shortcut',
            renderCell({ row, tabIndex, onRowChange }: any): React.ReactNode {


                const { onCopy, value, setValue, hasCopied } = useClipboard(row.shortcut);

                // navigator.clipboard.writeText(row.shortcut)
                //     .then(() => {
                //         toast({
                //             title: 'Shortcut Copied!',
                //             status: 'success',
                //             duration: 2000, // 메시지가 표시되는 시간
                //             isClosable: true, // 닫기 버튼 표시 여부
                //             position: 'top', // 메시지가 표시될 위치
                //         });
                //     })
                //     .catch((error) => {
                //         console.error('Failed to copy shortcut: ', error);
                //         toast({
                //             title: 'Copy Failed',
                //             description: 'Failed to copy shortcut. Please try again.',
                //             status: 'error',
                //             duration: 2000,
                //             isClosable: true,
                //             position: 'top', // 메시지가 표시될 위치
                //         });
                //     });

                return (
                    <Box display="flex" alignItems="center">
                        {/* <Input value={row.shortcut} />
                        <Button ml={2} onClick={copyShortcut}>복사</Button> */}
                        <Flex mb={2}>
                            <Input
                                value={row.shortcut}
                                mr={2}
                            />
                            <Button onClick={onCopy}>{hasCopied ? "Copied!" : "Copy"}</Button>
                        </Flex>

                    </Box>
                );
            },

        },
        { key: 'description', name: 'Description' },
        { key: 'category', name: 'Category' }
    ];
};


interface IProps {
    subShortCuts: ITypeForSubShortCutListRow[]
}

const DataGridForSubShortcuts = ({ subShortCuts }: IProps) => {
    // Chakra UI의 toast 객체 사용
    const toast = useToast();

    // 컬럼 초기화 함수

    // 컬럼 초기화
    const columns = useMemo(() => getColumnsForSubShortCutList(toast), [toast]);

    // State 및 Effect
    const [subShortcutRows, setSubShortcutRows] = useState<ITypeForSubShortCutListRow[]>([]);

    useEffect(() => {
        // subShortCuts가 변경될 때마다 subShortcutRows 업데이트
        const mappedRows = subShortCuts.map(subShortcut => ({
            id: subShortcut.id,
            shortcut: subShortcut.shortcut,
            description: subShortcut.description,
            category: subShortcut.category
        }));
        setSubShortcutRows(mappedRows);
    }, [subShortCuts]);

    return (
        <Box width={"100%"} m={"auto"}>
            <DataGrid columns={columns} rows={subShortcutRows} />
        </Box>
    );
}

export default DataGridForSubShortcuts;
