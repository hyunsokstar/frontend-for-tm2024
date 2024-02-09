import { useState } from 'react';
import { Box, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function BasicDateTimePicker({ defaultDeadLine, setDefaultDeadline }: { defaultDeadLine: Date, setDefaultDeadline: React.Dispatch<React.SetStateAction<string>> }) {
    const [value, onChange] = useState<Value>(new Date());

    return (
        <Box width={"100%"}>
            <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
                value={String(defaultDeadLine)}
                onChange={(e) => setDefaultDeadline(e.target.value)}
            />
        </Box>
    );
}

export default BasicDateTimePicker;
