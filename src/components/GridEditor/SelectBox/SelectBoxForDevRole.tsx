import React, { useState } from 'react';
import { Select } from '@chakra-ui/react';
import gridStyles from './styles.module.scss';
import { useRowSelection } from 'react-data-grid';

export enum RolesEnum {
    LEADER = "leader",
    CTO = "cto",
    FRONTEND = "frontend",
    BACKEND = "backend",
    FULLSTACK = "fullstack",
    TESTER = "tester",
}

interface SelectBoxForGenderProps<TRow, TSummaryRow> {
    row: TRow;
    column: { key: keyof TRow };
    onRowChange: (updatedRow: TRow) => void;
    onClose: (commit: boolean, keepEditing: boolean) => void;
}

const SelectBoxForDevRole = <TRow, TSummaryRow>({
    row,
    column,
    onRowChange,
    onClose
}: SelectBoxForGenderProps<TRow, TSummaryRow>) => {
    const [isRowSelected, onRowSelectionChange] = useRowSelection();
    const [previousValue, setPreviousValue] = useState(row[column.key as keyof TRow] as unknown as string);

    const handleSelectChange = (value: RolesEnum) => {
        onRowChange({ ...row, [column.key]: value });
    };

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            console.log('엔터 눌렀습니다');
            if (row[column.key as keyof TRow] !== previousValue) {
                setPreviousValue(row[column.key as keyof TRow] as string);
                onRowSelectionChange({ type: 'ROW', row: row, checked: true, isShiftClick: false });
            }
            onClose(true, false);
        }
    };

    return (
        <Select
            value={row[column.key] as RolesEnum}
            onChange={(event) => handleSelectChange(event.target.value as RolesEnum)}
            className={gridStyles.inputStyle}
            isReadOnly={false} // 여기에 isReadOnly를 추가하여 키보드 입력을 활성화합니다.
            onBlur={(e) => {
                console.log("이전값 : ", typeof row[column.key as keyof TRow], row[column.key as keyof TRow]);
                console.log("e : ", typeof parseInt(e.target.value), parseInt(e.target.value));

                const currentValue = e.target.value || "";

                if (previousValue !== currentValue) {
                    onRowSelectionChange({ type: "ROW", row: row, checked: true, isShiftClick: false });
                }
                onClose(true, false)

            }}
            onKeyDown={handleKeyPress} // 엔터 키 입력 감지

        >
            {Object.values(RolesEnum).map((role) => (
                <option key={role} value={role}>
                    {role}
                </option>
            ))}
        </Select>
    );
};

export default SelectBoxForDevRole;
