import React, { useState } from 'react';
import { Select } from '@chakra-ui/react';
import gridStyles from './styles.module.scss';
import { useRowSelection } from 'react-data-grid';

type Gender = 'man' | 'woman'; // 성별에 관련된 타입 정의

interface SelectBoxForGenderProps<TRow, TSummaryRow> {
    row: TRow;
    column: { key: keyof TRow };
    onRowChange: (updatedRow: TRow) => void;
    onClose: (commit: boolean, keepEditing: boolean) => void;
}

const SelectBoxForGender = <TRow, TSummaryRow>({
    row,
    column,
    onRowChange,
    onClose,
}: SelectBoxForGenderProps<TRow, TSummaryRow>) => {
    const [isRowSelected, onRowSelectionChange] = useRowSelection();
    const [initialValue, setInitialValue] = useState(row[column.key as keyof TRow] as unknown as string);

    const handleSelectChange = (value: Gender) => {
        onRowChange({ ...row, [column.key]: value });
    };

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            console.log('엔터 눌렀습니다');

            const currentValue = event.target.value || "";

            if (initialValue !== currentValue) {
                onRowSelectionChange({ type: "ROW", row: row, checked: true, isShiftClick: false });
            }
            onClose(true, false);
        }
    };

    const onBlurHandler = (e: React.FocusEvent<HTMLSelectElement>) => {
        console.log("이전값 : ", typeof row[column.key as keyof TRow], row[column.key as keyof TRow]);
        console.log("e : ", typeof parseInt(e.target.value), parseInt(e.target.value));

        const currentValue = e.target.value || "";

        if (initialValue !== currentValue) {
            onRowSelectionChange({ type: "ROW", row: row, checked: true, isShiftClick: false });
        }
        onClose(true, false)
    };

    return (
        <Select
            value={row[column.key] as Gender}
            onChange={(event) => handleSelectChange(event.target.value as Gender)}
            className={gridStyles.inputStyle}
            onBlur={onBlurHandler} // 변경된 onBlur 함수
            onKeyDown={handleKeyPress}
        >
            <option value="man">man</option>
            <option value="woman">woman</option>
        </Select>
    );
};

export default SelectBoxForGender;
