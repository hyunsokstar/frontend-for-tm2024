import React, { useState } from 'react'
import { Select } from '@chakra-ui/react';
import { useRowSelection } from 'react-data-grid';
import useApiForGetAllUserEmailsData from '@/hooks/useApiForGetAllUserEmailsData';

interface SelectBoxProps {
    row: any;
    column: { key: keyof any };
    onRowChange: (updatedRow: any) => void;
    onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void;
}

// 2244 에디터 컴퍼넌트 만들기
const SelectBoxForUserEmail = ({
    row,
    column,
    onRowChange,
    onClose,
}: SelectBoxProps) => {

    const [isRowSelected, onRowSelectionChange] = useRowSelection();
    const [initialValue, setInitialValue] = useState(row[column.key] as string);

    const { isPending, error, userEmails } = useApiForGetAllUserEmailsData();


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
        console.log("이전값 : ", typeof row[column.key], row[column.key]);
        console.log("e : ", typeof parseInt(e.target.value), parseInt(e.target.value));

        const currentValue = e.target.value || "";

        if (initialValue !== currentValue) {
            onRowSelectionChange({ type: "ROW", row: row, checked: true, isShiftClick: false });
        }
        onClose(true, false)
    };

    return (
        <Select
            autoFocus
            value={row[column.key]}
            onChange={(e) => onRowChange({ ...row, [column.key]: e.target.value })}
            onBlur={onBlurHandler} // 변경된 onBlur 함수
            onKeyDown={handleKeyPress}
        >
            {/* <option>12</option> */}
            {userEmails.map((el) => (
                <option key={el}>{el}</option>
            ))}
        </Select>
    )
}

export default SelectBoxForUserEmail