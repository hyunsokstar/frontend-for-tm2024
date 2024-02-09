// TextEditor.tsx 파일
import React, { useState } from 'react';
import gridStyles from './styles.module.scss';
import { RenderEditCellProps, useRowSelection } from 'react-data-grid';

interface TextEditorProps<TRow, TSummaryRow> {
    row: TRow;
    column: { key: string };
    onRowChange: (updatedRow: TRow) => void;
    onClose: (commit: boolean, keepEditing: boolean) => void;
}

const TextEditorForPhoneNumber = <TRow, TSummaryRow>({
    row,
    column,
    onRowChange,
    onClose,
}: RenderEditCellProps<TRow, TSummaryRow>) => {
    const [initialValue, setInitialValue] = useState(row[column.key as keyof TRow] as string);
    const [isRowSelected, onRowSelectionChange] = useRowSelection();

    // QnA1 에디터 설정 관련 2가지 체크 포인트
    //    a. 형식적인 이해(타입 설정) 
    //    b. 에디터 onChange 를 통해 값 수정 및 체크 박스 체크 및 row selection 설정  
    // QnA2: 현재 셀의 값을 얻어 오는 방법 
    //    a. row[column.key as keyof TRow] as string <=> 입력한 값
    //    b. 타입 설정 설명 : column.key 는 TRow 중의 하나이며 string 이다
    // QnA3: 입력한 값이 이전값과 다를 경우 체크 박스에 체크 되게 하는 방법
    //    a.  initialValue(cell의 원래 value) 를 상태로 설정 한뒤 입력 한뒤 
    //    b.  엔터 이벤트 등과 연동하여 값이 바뀌면 체크 백스가 체크되도록 하기
    //    c. const [isRowSelected, onRowSelectionChange] = useRowSelection(); 사용
    //    d. onRowSelectionChange({ type: 'ROW', row: row, checked: true, isShiftClick: false }); 사용
    // 주의할점: 에디터의 형식이 셀 포맷과 어울리고 잘 맞아야 함

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            console.log('엔터 눌렀습니다');
            // row[column.key as keyof TRow] as string <=> 입력한 값
            // 타입 설정 설명 : column.key 는 TRow 중의 하나이며 string 이다
            console.log(row[column.key as keyof TRow] as string);
            if (row[column.key as keyof TRow] !== initialValue) {
                setInitialValue(row[column.key as keyof TRow] as string);
                onRowSelectionChange({ type: 'ROW', row: row, checked: true, isShiftClick: false });
            }
            onClose(true, false);
        }
    };

    const onBlurHandler = () => {
        if (row[column.key as keyof TRow] !== initialValue) {
            setInitialValue(row[column.key as keyof TRow] as string);
            onRowSelectionChange({ type: 'ROW', row: row, checked: true, isShiftClick: false });
        }
        onClose(true, false);
    };

    return (
        <input
            autoFocus
            value={row[column.key as keyof TRow] as unknown as string}
            onChange={(event) => onRowChange({ ...row, [column.key]: event.target.value })}
            onBlur={onBlurHandler}
            onKeyDown={handleKeyPress}
            className={gridStyles.inputStyle}
        />
    );
};

export default TextEditorForPhoneNumber;
