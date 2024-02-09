// import { Box } from '@chakra-ui/react';
// import { useState } from 'react';
// import DateTimePicker from 'react-datetime-picker';

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

// function CommonDateTimePicker() {
//     const [value, onChange] = useState<Value>(new Date());

//     return (
//         <Box width={"80%"} m={"auto"}>
//             <DateTimePicker onChange={onChange} value={value} />
//         </Box>
//     );
// }

// export default CommonDateTimePicker;
import { Box, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { useRowSelection } from 'react-data-grid';
import { format } from 'date-fns';
import ModalButtonForDateTimePicker from '@/components/Modal/ModalBuutonForDateTimePicker';


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface EditorProps {
    row: any;
    column: { key: keyof any };
    onRowChange: (updatedRow: any) => void;
    onClose: any;
}


function CommonDateTimePicker({
    row,
    column,
    onRowChange,
    onClose,
}: EditorProps) {

    const [initialValue, setInitialValue] = useState(new Date());
    const [isRowSelected, onRowSelectionChange] = useRowSelection();

    const onChangeHandler = (e: any) => {
        console.log("e : ", e);
        onRowChange({ ...row, [column.key]: e.target.value })
    }

    const onBlurHandler = (e: any) => {
        console.log("e : ", e);

        const currentValue = e

        if (initialValue !== currentValue) {
            onRowSelectionChange({ type: "ROW", row: row, checked: true, isShiftClick: false });
        }
        onClose(true, false)
    }

    return (
        <Box zIndex={100}>
            {/* <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    placeholder='Enter password'
                    value={formatDateTime(row[column.key])}
                />
                <InputRightElement width='3rem' py={"auto"}>
                    <ModalButtonForDateTimePicker
                        modalText={'date'}
                        row={row}
                        onRowChange={onRowChange}
                        column={column}
                        onClose={onclose}
                    />
                </InputRightElement> */}
            {/* </InputGroup> */}
            <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
                value={row[column.key]}
                onBlur={onBlurHandler}
                onChange={onChangeHandler}
            />
        </Box>
    );
}

export default CommonDateTimePicker;