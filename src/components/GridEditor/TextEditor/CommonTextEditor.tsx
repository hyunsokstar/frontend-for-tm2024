// TextEditor.tsx 파일
import React, { useState } from 'react';
import gridStyles from './styles.module.scss';
import { useRowSelection } from 'react-data-grid';
import { Input } from '@chakra-ui/react';

interface TextEditorProps {
    row: any;
    column: { key: keyof any };
    onRowChange: (updatedRow: any) => void;
    onClose: (commit: boolean, keepEditing: boolean) => void;
}

const CommonTextEditor = <TRow, TSummaryRow>({
    row,
    column,
    onRowChange,
    onClose,
}: TextEditorProps) => {
    const [isRowSelected, onRowSelectionChange] = useRowSelection();
    const [initialValue, setInitialValue] = useState(row[column.key] as string);

    const handleKeyPress = (e: any) => {

        if (e.key === 'Enter') {
            console.log('엔터 눌렀습니다');
            const currentValue = e.target.value || "";

            if (initialValue !== currentValue) {
                onRowSelectionChange({ type: "ROW", row: row, checked: true, isShiftClick: false });
            }
            onClose(true, false);
        }
    };

    return (
        <Input
            value={row[column.key]}
            onChange={(event) => onRowChange({ ...row, [column.key]: event.target.value })}
            onKeyDown={handleKeyPress}
            onBlur={(e) => {
                const currentValue = e.target.value || "";
                if (initialValue !== currentValue) {
                    onRowSelectionChange({ type: "ROW", row: row, checked: true, isShiftClick: true });
                }
                onClose(true, false)
            }}
            height={"94%"}
        // className={gridStyles.inputStyle} // styles 객체에서 해당 클래스를 가져와서 적용
        />
    );
};

export default CommonTextEditor;