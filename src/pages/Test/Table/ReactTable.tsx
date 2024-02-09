import * as React from 'react'

import './index.css'

import {
    ColumnDef,
    RowData,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Box, Button, Checkbox, Input } from '@chakra-ui/react'

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateData: (rowIndex: number, columnId: string, value: unknown) => void
        allToggle: (rowIndex: number, columnId: string, value: unknown) => void
        checkRow: (rowIndex: number) => void
        isChecked: (rowIndex: number) => boolean | undefined
    }
}

type Person = {
    id: number;
    select: boolean;
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
}

const defaultData: Person[] = [
    {
        id: 1,
        select: false,
        firstName: 'hyun',
        lastName: 'oh',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        id: 2,
        select: false,
        firstName: 'tandy123123sadfasdfsadfewrqe',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        id: 3,
        select: false,
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'smart',
        progress: 10,
    },
]

const columnHelper = createColumnHelper<Person>()

const columns = [

    columnHelper.accessor('select', {
        id: 'select',
        header: ({ table }) => (
            <>
                {/* 헤더 체크 박스 */}
                <Checkbox
                    onChange={(e: any) => {
                        // 전체 체크박스 토글 기능
                        let allChecked = e.target.checked
                        table.options.meta?.allToggle(-1, 'select', allChecked);
                    }}
                />
            </>
        ),
        cell: ({ table, row }) => {
            // console.log("table : ", table);
            // console.log("row : ", row);


            return (
                <>
                    <Checkbox
                        checked={table.options.meta?.isChecked(row.original.id)}
                        onChange={(e: any) => {
                            // 전체 체크박스 토글 기능
                            table.options.meta?.checkRow(row.original.id);
                        }}
                    />
                </>
            )
        },
    }),

    columnHelper.accessor('firstName', {
        // cell: info => info.getValue(),
        footer: info => info.column.id,
    }),

    columnHelper.accessor(row => row.lastName, {
        id: 'lastName',
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Last Name</span>,
        footer: info => info.column.id,
    }),
    columnHelper.accessor('age', {
        header: () => 'Age',
        cell: info => info.renderValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('visits', {
        header: () => <span>Visits</span>,
        cell: ({ row, column }) => {
            return row.getValue(column.id)
        },
        footer: info => info.column.id,
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        footer: info => info.column.id,
    }),
    columnHelper.accessor('progress', {
        header: 'Profile Progress',
        footer: info => info.column.id,
    }),
    columnHelper.accessor('progress', {
        header: 'Profile Progress',
        footer: info => info.column.id,
    }),
    columnHelper.accessor('progress', {
        header: 'Profile Progress',
        footer: info => info.column.id,
    }),
]

function useSkipper() {
    const shouldSkipRef = React.useRef(true)
    const shouldSkip = shouldSkipRef.current

    // Wrap a function with this to skip a pagination reset temporarily
    const skip = React.useCallback(() => {
        shouldSkipRef.current = false
    }, [])

    React.useEffect(() => {
        shouldSkipRef.current = true
    })

    return [shouldSkip, skip] as const
}

function ReactTable() {
    const [data, setData] = React.useState(() => [...defaultData])
    const rerender = React.useReducer(() => ({}), {})[1]
    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()
    const [isEditing, setIsEditing] = React.useState(false);
    const [checkedRowIds, setCheckedRowIds] = React.useState<number[]>([]); // 체크된 행의 ID를 저장할 state

    const handleToggleCheckbox = (rowId: number) => {
        const newCheckedRows = [...checkedRowIds];
        const index = newCheckedRows.indexOf(rowId);

        if (index === -1) {
            newCheckedRows.push(rowId); // 선택되지 않은 경우, ID를 추가하여 체크 상태로 변경
        } else {
            newCheckedRows.splice(index, 1); // 이미 선택된 경우, ID를 제거하여 체크 해제 상태로 변경
        }

        setCheckedRowIds(newCheckedRows); // 변경된 체크된 ID 목록으로 state 업데이트
    };

    const addCheckedIds = (rowId: number) => {
        console.log("checkedRowIds : ", checkedRowIds);
        console.log("rowId : ", typeof rowId);
        console.log("rowId : ", rowId);


        console.log("checkedRowIds for check : ", checkedRowIds);
        setCheckedRowIds((prev) => {
            if (prev.includes(rowId)) {
                return prev; // 이미 있는 번호면 현재 상태 그대로 반환
            } else {
                return [...prev, rowId]; // 새로운 번호 추가
            }
        })

    }

    const defaultColumn: Partial<ColumnDef<Person>> = {
        cell: ({ getValue, row: { index, original, id }, column: { id: columnId }, table }) => {
            const initialValue = getValue()
            const [value, setValue] = React.useState(initialValue)

            // When the input is blurred, we'll call our table meta's updateData function
            const onBlur = (e: any) => {
                table.options.meta?.updateData(index, columnId, value)
                if (initialValue !== e.target.value) {
                    addCheckedIds(original.id); // 행의 ID를 등록
                }
            }

            const handleChange = (e: any) => {
                const inputValue = e.target.value;

                // Update input value
                setValue(inputValue);

            };

            // If the initialValue is changed external, sync it up with our state
            React.useEffect(() => {
                setValue(initialValue)
            }, [initialValue])

            return (
                <input
                    value={value as string}
                    onChange={handleChange}
                    onBlur={onBlur}
                    style={{ border: "2px solid black", width: "200px", }}
                />
            )
        },
    }

    const table = useReactTable({
        data,
        columns,
        defaultColumn,
        getCoreRowModel: getCoreRowModel(),
        meta: {
            updateData: (rowIndex, columnId, value) => {
                // Skip page index reset until after next rerender
                skipAutoResetPageIndex()
                setData(old =>
                    old.map((row, index) => {
                        if (index === rowIndex) {
                            return {
                                ...old[rowIndex]!,
                                [columnId]: value,
                            }
                        }
                        return row
                    })
                )
            },
            allToggle: (rowIndex, columnId, value) => {
                // columns 의 헤더 체크 누르면 allToggle 이 실행 되도록
                if (value) {
                    const idsForUpdate = data.map(row => row.id)
                    setCheckedRowIds(idsForUpdate)
                } else {
                    setCheckedRowIds([])
                }
            },
            checkRow: (rowId) => {
                // columns 의 헤더 체크 누르면 allToggle 이 실행 되도록
                if (!checkedRowIds.includes(rowId)) {
                    setCheckedRowIds((prev) => [...prev, rowId])
                } else {
                    setCheckedRowIds((prev) => prev.filter((id) => id !== rowId));
                    // setCheckedRowIds([])
                }
            },
            // isChecked: (rowId) => {
            //     console.log("rowId ??? ", rowId);
            //     if (
            //         checkedRowIds.includes(rowId)
            //     ) {
            //         return true;
            //     } else {
            //         false
            //     }
            // }
            isChecked: (rowId) => checkedRowIds.includes(rowId),
        },
    })

    console.log("table.getHeaderGroups()[0] : ", table.getHeaderGroups()[0]);

    const saveModifiedRows = () => {
        const dataForUpdate = data.filter((row) => {
            if (checkedRowIds.includes(row.id)) {
                return row
            } else {

            }
        })
        console.log("dataForUpdate : ", dataForUpdate);

    };

    return (
        <Box width={"80%"} mx={"auto"} mt={3}>
            {checkedRowIds ? checkedRowIds.map((id) => <Box>{id}</Box>) : ""}
            <Box className='table-container'>
                <table>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                                <th>
                                    수정/삭제
                                </th>
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {/* {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
                                        {
                                            flexRender(
                                                cell.column.id === 'select'
                                                    ? <IndeterminateCheckbox
                                                        checked={checkedRowIds.includes(row.original.id)} // 체크된 행인지 확인하여 checked prop 설정
                                                        onChange={() => handleToggleCheckbox(row.original.id)} // 행의 ID를 토글 함수로 전달
                                                    />
                                                    : isEditing
                                                        ? cell.column.columnDef.cell
                                                        : info => info.getValue()
                                                , cell.getContext()
                                            )
                                        }
                                    </td>
                                ))}
                                <td>
                                    {!isEditing ?
                                        (
                                            <Box display={"flex"} gap={2} width={"100%"}>
                                                <Button
                                                    size={"sm"}
                                                    variant={"outline"}
                                                    onClick={() => {
                                                        setIsEditing(true)
                                                    }}
                                                >
                                                    수정
                                                </Button>
                                                {/* <Button size={"sm"} variant={"outline"} ml={2}
                                                onClick={() => {
                                                    setIsEditing(false)
                                                }}
                                            >
                                                취소
                                            </Button> */}
                                            </Box>
                                        )
                                        :
                                        (
                                            <Box display={"flex"} gap={2}>
                                                <Button
                                                    size={"sm"}
                                                    variant={"outline"}
                                                    onClick={saveModifiedRows}
                                                >
                                                    저장
                                                </Button>
                                                <Button
                                                    size={"sm"}
                                                    variant={"outline"}
                                                    onClick={() => {
                                                        setIsEditing(false)
                                                    }}
                                                >취소</Button>
                                            </Box>
                                        )
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        {table.getFooterGroups().map(footerGroup => (
                            <tr key={footerGroup.id}>
                                {footerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.footer,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </tfoot>
                </table>
            </Box>
            <div className="h-4" />
            <button onClick={() => rerender()} className="border p-2">
                Rerender
            </button>
        </Box>
    )
}

function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
}: { indeterminate?: boolean } & React.HTMLProps<HTMLInputElement>) {
    const ref = React.useRef<HTMLInputElement>(null!)
    const [checkedRowIds, setCheckedRowIds] = React.useState<string[]>([]); // 체크된 행의 ID를 저장할 state


    React.useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [ref, indeterminate])

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + ' cursor-pointer'}
            {...rest}
        />
    )
}

export default ReactTable;