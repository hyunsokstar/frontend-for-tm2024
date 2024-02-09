import React, { useState, useEffect, useContext, createContext, useMemo } from 'react';
import { Box, Input } from '@chakra-ui/react';
import DataGrid, { RenderHeaderCellProps } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import useApiForGetAllUsersData from '@/hooks/useApiForGetAllUsersData';
import { Row } from '@/types/typeForUserBoard';
import styles from './styles.module.scss';
import { css } from '@emotion/react';


interface Filter extends Omit<Row, 'id' | 'complete'> {
    complete: number | undefined;
    enabled: boolean;
}

const FilterContext = createContext<IUserFilter | undefined>(undefined);
interface IUserFilter extends Omit<Row, 'id' | 'complete'> {
    id: number;
    email: string;
    nickname: string;
    role: string;
    gender: string;
    phoneNumber: string;
    frontEndLevel: number;
    backEndLevel: number;
    enabled: boolean;
}

function inputStopPropagation(event: React.KeyboardEvent<HTMLInputElement>) {
    if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.stopPropagation();
    }
}

const filterColumnClassName = 'filter-cell';

const filterClassname = css`
  background-color: "red";
`;

// const filterClassname = css`
//   inline-size: 100%;
//   padding: 4px;
//   font-size: 14px;
// `;

interface SummaryRow {
    id: string;
    totalCount: number;
    yesCount: number;
}

const HeaderFilter = () => {
    const [pageNum, setPageNum] = useState(1);
    const { isPending, error, userRows } = useApiForGetAllUsersData(pageNum);
    const [filters, setFilters] = useState(
        (): IUserFilter => ({
            id: 0,
            email: '',
            nickname: '',
            role: '',
            gender: '',
            phoneNumber: '',
            frontEndLevel: 1,
            backEndLevel: 1,
            enabled: true
        })
    );

    const columns = [
        { key: 'id', name: 'ID' },
        { key: 'email', name: 'Email' },
        {
            key: 'nickname',
            name: 'Nick Name',
            renderHeaderCell: (p: any) => {
                console.log("p :", p);
                return (
                    <FilterRenderer<Row> {...p} tabIndex={3}>
                        {({ filters, ...rest }) => {
                            console.log("filters : ", filters);
                            console.log("filters, ...rest : ", { filters, ...rest });

                            return (
                                <>
                                    {/* ## pr1 원래 여기서 p.column.name 을 출력하면 안됨 */}
                                    <Box style={{ "height": "20px" }}>
                                        {p.column.name}
                                    </Box>
                                    <input
                                        {...rest}
                                        autoFocus
                                        style={{ height: "20px" }}
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                nickname: e.target.value
                                            })
                                        }
                                        onKeyDown={inputStopPropagation}
                                    />
                                </>
                            )
                        }}
                    </FilterRenderer>
                )
            }
        },

        { key: 'role', name: 'Role' },
        { key: 'gender', name: 'Gender' },
        { key: 'backEndLevel', name: 'Backend Level' },
        { key: 'frontEndLevel', name: 'Frontend Level' }
    ];

    console.log("userRows from api : ", userRows);

    const filteredRows = useMemo(() => {
        return userRows.filter((r) => {
            return (
                (filters.nickname !== undefined ? r.nickname.includes(filters.nickname) : true)
            );
        });
    }, [userRows, filters]);

    // const summaryRows = useMemo((): readonly SummaryRow[] => {
    //     return [
    //         {
    //             id: 'total_0',
    //             totalCount: userRows.length,
    //             yesCount: userRows.filter((r) => r).length
    //         }
    //     ];
    // }, [userRows]);

    return (
        <Box width={"80%"} mt={3} mx={"auto"}>
            <FilterContext.Provider value={filters}>
                {filteredRows.length} 개
                <DataGrid
                    columns={columns}
                    rows={filteredRows}
                    headerRowHeight={filters.enabled ? 80 : undefined}
                // topSummaryRows={summaryRows}
                />
            </FilterContext.Provider>
        </Box>
    );
};

function FilterRenderer<R>({
    tabIndex,
    column,
    children
}: RenderHeaderCellProps<R> & {
    children: (args: { tabIndex: number; filters: IUserFilter })
        => React.ReactElement;
}) {
    const filters = useContext(FilterContext)!;
    console.log("children : ", children);
    console.log("tabIndex : ", tabIndex);


    return (
        <>
            {/* ## pr2 원래 여기서 출력해야 함 근데 여기서 출력하면 nickname 만 보임 */}
            {/* <div>{column.name}</div> <hr /> */}
            <div>{children({ tabIndex, filters })}</div>
        </>
    );

}

export default HeaderFilter;