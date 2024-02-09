import React, { useMemo, useRef, useState } from 'react'
import DataGrid, { Column, DataGridHandle, RenderCheckboxProps, RenderSortStatusProps, RowsChangeData, textEditor } from 'react-data-grid';
import { faker } from '@faker-js/faker';
import styles from './groupby.module.css';
import 'react-data-grid/lib/styles.css';
import { Box, Button, HStack, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { SelectColumnForReactDataGrid } from '@/components/Formatter/CheckBox/SelectColumnForRdg';
import CheckBoxFormatterForHeader from '@/components/Formatter/CheckBox/CheckBoxFormatterForHeader';
import CheckBoxFormatterForRow from '@/components/Formatter/CheckBox/CheckBoxFormatterForRow';
import Link from 'next/link';
import CommonTextAreaEditor from '@/components/GridEditor/CommonTextAreaEditor';
import CellExpanderFormatter from './CellExpanderFormatter';

type Props = {}

const productsMap = new Map<number, readonly ProductRow[]>();

type DepartmentRow =
    | {
        type: 'MASTER';
        id: number;
        email: string;
        task: string;
        status: string,
        period: {
            start: string,
            end: string
        },
        page: string
        // deadline: Date,
        planNote: string;
        proportion: number;
        referNote: string;
        expanded: boolean;
    }
    | {
        type: 'DETAIL';
        id: number;
        parentId: number;
    };

interface ProductRow {
    id: number;
    task: string;
    status: string;
    planNote: string;
}

const productColumns: readonly Column<ProductRow>[] = [
    { key: 'id', name: 'ID', width: 35 },
    { key: 'task', name: 'Task' },
    { key: 'status', name: 'Status' },
    { key: 'planNote', name: 'Plan Note' }
];

function getProducts(parentId: number): readonly ProductRow[] {
    // if (productsMap.has(parentId)) return productsMap.get(parentId)!;
    const products: ProductRow[] = [];
    for (let i = 0; i < 20; i++) {
        products.push({
            id: i,
            task: `task ${i}`,
            status: `status ${i}`,
            planNote: `price ${i}`
        });
    }
    // productsMap.set(parentId, products);
    return products;
}

function createDepartments(): readonly DepartmentRow[] {
    const departments: DepartmentRow[] = [];
    for (let i = 1; i < 30; i++) {
        departments.push({
            type: 'MASTER',
            id: i,
            email: 'terecal@daum.net',
            task: `department? ${i}`,
            status: "ready",
            period: {
                start: "2023-12-12",
                end: "2023-12-13"
            },
            page: "/main",
            planNote: "https://bpb-us-e2.wpmucdn.com/sites.uci.edu/dist/f/3453/files/2021/04/Literacy-421.png",
            referNote: "https://bpb-us-e2.wpmucdn.com/sites.uci.edu/dist/f/3453/files/2021/04/Literacy-421.png",
            proportion: 1,
            expanded: false,
        });
    }
    return departments;
}

// column 의 key 와 row 의 key 는 서로 매칭됨
const MasterDetail = (props: Props) => {

    const [rows, setRows] = useState(createDepartments);
    const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());

    const SelectColumnForReactDataGrid2: Column<any, any> = {
        key: "select-row",
        name: '',
        width: 35,
        minWidth: 35,
        maxWidth: 35,
        resizable: false,
        sortable: false,
        frozen: true,
        renderHeaderCell(props) {
            return <CheckBoxFormatterForHeader {...props} />;
        },
        renderCell(props) {
            // console.log("porps at rendercell : ", props);
            if (props.row.type !== "DETAIL") {
                return <CheckBoxFormatterForRow {...props} />;
            }
        },
    };

    const columns = useMemo((): readonly Column<DepartmentRow>[] => {
        return [
            SelectColumnForReactDataGrid2,
            // { key: 'id', name: 'ID' },
            {
                key: 'expanded',
                name: '',
                width: 20,
                // frozen: true,
                colSpan(args) {
                    return args.type === 'ROW' && args.row.type === 'DETAIL' ? 7 : undefined;
                },
                cellClass(row) {
                    return row.type === 'DETAIL'
                        ? styles.expended_row
                        : "";
                },
                renderCell({ row, tabIndex, onRowChange }) {
                    if (row.type === 'DETAIL') {
                        // point2: 부모행 id를 아래와 같이 전달 가능
                        // return <ProductGrid parentId={row.parentId} />;
                        return (
                            <Box
                                style={{ lineHeight: "20px" }}
                                width={"100%"}
                                overflowY={"scroll"}
                                display={"flex"}
                                justifyContent={"center"}
                                // alignItems={"center"}
                                flexDirection={"column"}
                            // p={2}
                            >
                                {/* <Box width={"100%"} display={"flex"} justifyContent={"center"} border={"2px solid blue"} height={"70vh"} p={2} overflowY={"scroll"}>
                                </Box> */}
                                <br />
                                <VStack display={"flex"} width={"100%"}>
                                    <Text>progress</Text>
                                    <ProductGrid parentId={row.parentId} />
                                </VStack>
                            </Box>
                        );
                    }

                    return (
                        <CellExpanderFormatter
                            expanded={row.expanded}
                            tabIndex={tabIndex}
                            onCellExpand={() => {
                                onRowChange({ ...row, expanded: !row.expanded });
                            }}
                        />
                    );
                }
            },
            { key: 'email', name: "Email", width: 200 },
            {
                key: 'page',
                name: 'Page',
                width: 300
            },
            {
                key: 'task',
                name: 'Task',
                // frozen: true,
                width: 400,
                resizable: true,
                renderEditCell: (props: {
                    row: any;
                    column: { key: keyof any };
                    onRowChange: (updatedRow: any) => void;
                    onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void;
                }) => (
                    <CommonTextAreaEditor
                        {...props}
                    // arrayForSelectOption={usersEmailInfo}
                    />
                )
            },

            {
                key: 'status', name: 'Status',
                width: 200,
                // colSpan(args) {
                //     return 2;
                // },
                renderCell(props: any) {
                    if (props.row.type === "MASTER") {
                        return (
                            <SimpleGrid columns={2} spacing={1} width={"50%"}>
                                <Button borderRadius={100}>r</Button>
                                <Button borderRadius={100}>p</Button>
                                <Button borderRadius={100}>t</Button>
                                <Button borderRadius={100}>c</Button>
                            </SimpleGrid>
                        )
                    }
                },
            },
            {
                key: 'period',
                name: "Period",
                width: 200,
                renderCell: ((props) => {
                    if (props.row.type === "MASTER") {
                        return (
                            <Box lineHeight={"20px"} px={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} mt={5}>
                                <Box>{props.row.period.start}</Box>
                                <Box>{props.row.period.end}</Box>
                            </Box>
                        )
                    }
                }),
            },

            // { key: 'deadLine', name: "deadLine", width: 260 },
            {
                key: 'planNote', name: 'Plan Note',
                width: 200,
                renderCell(props: any) {
                    if (props.row.type !== "DETAIL") {
                        return (
                            <HStack display={"flex"} gap={2} lineHeight={"20px"} px={2}>
                                <Link href={props.row.planNote} target="_blank" rel="noreferrer" onClick={() => window.open(props.row.planNote, '_blank')}>
                                    <Image objectFit="contain" width={100} height={100} src={props.row.planNote} border={"1px solid black"} />
                                </Link>

                                <Box display={"flex"} flexDirection={"column"} gap={2}>
                                    <Button borderRadius={100}>r</Button>
                                    {/* <HStack gap={2}>
                                        <Button borderRadius={100}>left</Button>
                                        <Button borderRadius={100}>right</Button>
                                    </HStack> */}
                                </Box>
                            </HStack>
                        )
                    }
                },
            },
            // {
            //     key: 'reportNote', name: 'Report Note',
            //     width: 300,
            //     // colSpan(args) {
            //     //     return 2;
            //     // },
            //     renderCell(props: any) {
            //         if (props.row.type !== "DETAIL") {
            //             return (
            //                 <HStack display={"flex"} gap={2} lineHeight={"20px"} px={2}>
            //                     <Link href={props.row.planNote} target="_blank" rel="noreferrer" onClick={() => window.open(props.row.planNote, '_blank')}>
            //                         <Image objectFit="contain" width={100} height={100} src={props.row.planNote} border={"1px solid black"} />
            //                     </Link>

            //                     <Box display={"flex"} flexDirection={"column"} gap={2}>
            //                         <Button borderRadius={100}>open</Button>
            //                         <Button borderRadius={100}>link</Button>
            //                     </Box>
            //                 </HStack>
            //             )
            //         }
            //     },
            // },
            { key: "proportion", name: 'ProPortion' }
        ];
    }, []);

    // point2
    // 해당 행의 다음에 row 추가
    function onRowsChange(rows: DepartmentRow[], { indexes }: RowsChangeData<DepartmentRow>) {
        console.log("row change check");
        const row = rows[indexes[0]];
        if (row.type === 'MASTER') {
            if (row.expanded) {
                rows.splice(indexes[0] + 1, 0, {
                    type: 'DETAIL',
                    id: row.id + 100,
                    parentId: row.id
                });
            } else {
                rows.splice(indexes[0] + 1, 1);
            }
            setRows(rows);
        }
    }

    const renderSelectedRows = () => {
        const rowsArray: number[] = Array.from(selectedRows);
        return rowsArray.map((row, index) => (
            <div key={index}>
                Row {index + 1}: {row}
            </div>
        ));
    };

    return (
        <Box width={"98%"} margin={"auto"} m={2}>
            {renderSelectedRows()}

            <DataGrid
                rowKeyGetter={(row) => row.id}
                columns={columns}
                rows={rows}
                onRowsChange={onRowsChange}
                headerRowHeight={45}
                rowHeight={(row) => (row.type === 'DETAIL' ? 500 : 100)}
                className="fill-grid"
                enableVirtualization={false}
                direction={"ltr"}
                onCellKeyDown={(_, event) => {
                    if (event.isDefaultPrevented()) {
                        event.preventGridDefault();
                    }
                }}
                style={{ margin: "auto", height: "80vh" }}
                selectedRows={selectedRows}
                onSelectedRowsChange={(selected) => {
                    const selectedRowIds = Array.from(selected.values());
                    console.log("체크된 번호들: ", selectedRowIds);
                    setSelectedRows(selected);
                }}
                renderers={{ renderSortStatus, renderCheckbox }}
            />
        </Box>
    )
}

export type Direction = 'ltr' | 'rtl';

// point3 확장행에 출력될 컴퍼넌트
function ProductGrid({ parentId }: { parentId: number; }) {

    const [rows, setRows] = useState(createDepartments);
    const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());

    const gridRef = useRef<DataGridHandle>(null);
    const products = getProducts(parentId);

    const columns = useMemo((): readonly Column<DepartmentRow>[] => {
        return [
            SelectColumnForReactDataGrid,
            { key: 'email', name: "Email" },
            {
                key: 'task',
                name: 'Task',
                width: 300,
                resizable: true,
                renderEditCell: (props: {
                    row: any;
                    column: { key: keyof any };
                    onRowChange: (updatedRow: any) => void;
                    onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void;
                }) => (
                    <CommonTextAreaEditor
                        {...props}
                    // arrayForSelectOption={usersEmailInfo}
                    />
                )
            },

            {
                key: 'status', name: 'Status',
                width: 200,
                // colSpan(args) {
                //     return 2;
                // },
                renderCell(props: any) {
                    if (props.row.type !== "DETAIL") {
                        return (
                            <SimpleGrid columns={2} spacing={1} width={"50%"}>
                                <Button borderRadius={100}>r</Button>
                                <Button borderRadius={100}>p</Button>
                                <Button borderRadius={100}>t</Button>
                                <Button borderRadius={100}>c</Button>
                            </SimpleGrid>
                        )
                    }
                },
            },
            {
                key: 'period',
                name: "Period",
                width: 220,
                renderCell: ((props) => {
                    if (props.row.type !== "DETAIL") {
                        return (
                            <Box lineHeight={"20px"} px={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} mt={3}>
                                <Box>{props.row.period.start}</Box>
                                <Box>{props.row.period.end}</Box>
                            </Box>
                        )
                    }
                }),
            },
            // { key: 'startTime', name: "startTime", width: 260 },
            // { key: 'deadLine', name: "deadLine", width: 260 },
            {
                key: 'planNote', name: 'Plan Note',
                width: 200,
                renderCell(props: any) {
                    if (props.row.type !== "DETAIL") {
                        return (
                            <HStack display={"flex"} gap={2} lineHeight={"20px"}>
                                <Link href={props.row.planNote} target="_blank" rel="noreferrer" onClick={() => window.open(props.row.planNote, '_blank')}>
                                    <Image objectFit="contain" width={100} height={100} src={props.row.planNote} border={"1px solid black"} />
                                </Link>

                                <Box display={"flex"} flexDirection={"column"} gap={2}>
                                    <Button borderRadius={100}>r</Button>
                                    {/* <HStack gap={2}>
                                        <Button borderRadius={100}>l</Button>
                                        <Button borderRadius={100}>r</Button>
                                    </HStack> */}
                                </Box>
                            </HStack>
                        )
                    }
                },
            },
            {
                key: 'reportNote', name: 'Report Note',
                width: 200,
                // colSpan(args) {
                //     return 2;
                // },
                renderCell(props: any) {
                    if (props.row.type !== "DETAIL") {
                        return (
                            <HStack display={"flex"} gap={2} lineHeight={"20px"} px={2}>
                                <Link href={props.row.planNote} target="_blank" rel="noreferrer" onClick={() => window.open(props.row.planNote, '_blank')}>
                                    <Image objectFit="contain" width={100} height={100} src={props.row.planNote} border={"1px solid black"} />
                                </Link>

                                <Box display={"flex"} flexDirection={"column"} gap={2}>
                                    <Button borderRadius={100}>r</Button>
                                    {/* <HStack gap={2}>
                                        <Button borderRadius={100}>l</Button>
                                        <Button borderRadius={100}>r</Button>
                                    </HStack> */}
                                </Box>
                            </HStack>
                        )
                    }
                },
            },
            { key: "proportion", name: 'ProPortion' }
        ];
    }, []);

    // point2
    // 해당 행의 다음에 row 추가
    function onRowsChange(rows: DepartmentRow[], { indexes }: RowsChangeData<DepartmentRow>) {
        console.log("row change check");
        const row = rows[indexes[0]];
        if (row.type === 'MASTER') {
            if (row.expanded) {
                rows.splice(indexes[0] + 1, 0, {
                    type: 'DETAIL',
                    id: row.id + 100,
                    parentId: row.id
                });
            } else {
                rows.splice(indexes[0] + 1, 1);
            }
            setRows(rows);
        }
    }

    const renderSelectedRows = () => {
        const rowsArray: number[] = Array.from(selectedRows);
        return rowsArray.map((row, index) => (
            <div key={index}>
                Row {index + 1}: {row}
            </div>
        ));
    };

    return (
        <Box width={"98%"} border={"2px solid green"}>

            <DataGrid
                rowKeyGetter={(row) => row.id}
                columns={columns}
                rows={rows}
                onRowsChange={onRowsChange}
                headerRowHeight={45}
                className="fill-grid"
                enableVirtualization={false}
                direction={"ltr"}
                onCellKeyDown={(_, event) => {
                    if (event.isDefaultPrevented()) {
                        event.preventGridDefault();
                    }
                }}
                style={{ margin: "auto", height: "25rem", width: "100%" }}
                selectedRows={selectedRows}
                onSelectedRowsChange={(selected) => {
                    const selectedRowIds = Array.from(selected.values());
                    console.log("체크된 번호들: ", selectedRowIds);
                    setSelectedRows(selected);
                }}
                renderers={{ renderSortStatus, renderCheckbox }}
                rowHeight={(row) => (row.type === 'DETAIL' ? 500 : 50)}
            />
        </Box>
    )
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




function rowKeyGetter(row: DepartmentRow | ProductRow) {
    return row.id;
}

export default MasterDetail