// 그리드 내부에 헤더 필터 컴퍼넌트 설정 하기
import React, { createContext, useContext, useMemo, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import { Box } from '@chakra-ui/react';
import DataGrid, { RenderHeaderCellProps } from 'react-data-grid';
import styles from './HeaderFilters.module.scss'; // 모듈 import


interface Row {
    id: number;
    task: string;
    status: string;
    gender: string;
}

interface Filter extends Omit<Row, 'id'> {
    complete: number | undefined;
    enabled: boolean;
}

// step3-1
const FilterContext = createContext<Filter | undefined>(undefined);


const genders = ['man', 'girl'];
const statuses = ['ready', 'progress', 'testing', 'complete'];

function inputStopPropagation(event: React.KeyboardEvent<HTMLInputElement>) {
    if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.stopPropagation();
    }
}

const initialRows: { id: number; task: string; status: string; gender: string; }[] = []
for (let i = 0; i < 20; i++) {
    const newPatternRow = {
        id: i,
        task: `Task ${i}`,
        status: statuses[i % statuses.length],
        gender: genders[i % genders.length],
    };
    initialRows.push(newPatternRow);
}

const HeaderFilters = () => {
    const [rows, setRows] = useState<any>(initialRows);

    // step1 아래의 filters 에 따라 rows 가 필터링 되게 할것임
    const [filters, setFilters] = useState(
        (): Filter => ({
            // id: '',
            task: '',
            status: '',
            gender: '',
            complete: undefined,
            enabled: true
        })
    );

    // step2 filters 에 따라 rows 를 필터링한 row 정보를 filteredRows 에 담음
    const filteredRows = useMemo(() => {
        return rows.filter((r: any) => {
            return (
                (filters.task ? r.task.includes(filters.task) : true)  // filters.task 에 담긴 문자열을 포함하는 row만 return (inpute 이므로 이런식으로 조건 설정)
                // (filters.gender !== 'All' ? r.priority === filters.gender : true) &&
                // (filters.status !== 'All' ? r.issueType === filters.issueType : true) &&
                // (filters.complete !== undefined ? r.complete >= filters.complete : true)
            );
        });
    }, [rows, filters]);

    const columns = [
        {
            key: 'id',
            name: 'ID',
            width: 70,
        },
        {
            key: 'task',
            name: 'Task',
            width: 600,
            // step5 필터 컴퍼넌트를 다음과 같이 설정
            renderHeaderCell: (p: any) => {
                console.log("p : ", p);
                return (
                    <FilterRenderer<Row> {...p}>
                        {({ filters, ...rest }) => (
                            <input
                                {...rest}
                                className={styles.filterClassname}
                                value={filters.task}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        task: e.target.value
                                    })
                                }
                                onKeyDown={inputStopPropagation}
                            />
                        )}
                    </FilterRenderer >
                )
            }
        }, // Task 열의 너비를 200으로 설정
        {
            key: 'status',
            name: 'Status',
            width: 150,

        }, // Status 열의 너비를 150으로 설정
        {
            key: 'gender',
            name: 'Gender',
            width: 150,
        },
    ];

    // function clearFilters() {
    //     setFilters({
    //         task: '',
    //         priority: 'All',
    //         issueType: 'All',
    //         developer: '',
    //         complete: undefined,
    //         enabled: true
    //     });
    // }

    // function toggleFilters() {
    //     setFilters((filters) => ({
    //         ...filters,
    //         enabled: !filters.enabled
    //     }));
    // }

    return (
        <Box width="80%" m="auto" mt={5} px={5}>
            {/* step3-2 filters 를 컴퍼넌트 내부 어디에서든 사용할수 있게 아래와 같이 FilterContext 설정 */}
            <FilterContext.Provider value={filters}>
                <DataGrid
                    className={filters.enabled ? styles.filterClassname : undefined}
                    columns={columns}
                    rows={filteredRows}
                    headerRowHeight={filters.enabled ? 80 : undefined}
                />
            </FilterContext.Provider>
        </Box>
    );
};

// step4 FilterRenderer 컴퍼넌트 만들기
// 1. 내부 children 은 여러가지 컴퍼넌트 형식일수 있어야 하기 때문에 FilterRenderer 를 만들어서 씀 <=> 필터용 컴퍼넌트
// 2. tabIndex,column 는 renderHeaderCell 의 p 로부터 chilldren 은 컴퍼넌트 리턴하는 이름 없는 실행 함수
// 3. 하단에 children 출력 하되 tabIndex, filters(by context provider) 전달
// 4. p로부터 전달 받은 데이터는 출력용으로만 씀
// 5. tabIndex 를 왜 전달하는지는 잘 모르겠음
function FilterRenderer<R>({
    tabIndex,
    column,
    children
}: RenderHeaderCellProps<R> & {
    children: (args: { tabIndex: number; filters: Filter }) => React.ReactElement;
}) {
    const filters = useContext(FilterContext)!;
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            lineHeight={"100%"}
            my={1}
            py={2}
        >
            <Box fontSize={"15px"}>{column.name} </Box> <br />
            {filters.enabled && <Box width={"100%"}>{children({ tabIndex, filters })}</Box>}
        </Box>
    );
}

export default HeaderFilters;
