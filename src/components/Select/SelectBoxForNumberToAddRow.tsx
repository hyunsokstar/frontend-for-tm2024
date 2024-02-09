import { Select } from '@chakra-ui/react';
import { useState } from 'react';

interface SelectBoxForNumberToAddRowProps {
    rowNumToAdd: number;
    setRowNumToAdd: React.Dispatch<React.SetStateAction<number>>;
}

const SelectBoxForNumberToAddRow: React.FC<SelectBoxForNumberToAddRowProps> = ({ rowNumToAdd, setRowNumToAdd }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = parseInt(event.target.value);
        setRowNumToAdd(selectedValue);
    };

    return (
        <Select value={rowNumToAdd} onChange={handleChange} size={"md"}>
            {[1, 2, 3, 4, 5].map((number) => (
                <option key={number} value={number}>
                    {number}
                </option>
            ))}
        </Select>
    );
};

export default SelectBoxForNumberToAddRow;
