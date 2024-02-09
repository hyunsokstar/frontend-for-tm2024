import React, { useState } from 'react';
import { Select } from '@chakra-ui/react';

const SelectBox = () => {
    const [selectedValue, setSelectedValue] = useState<string>('man');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
        // onChange(event.target.value);
    };

    return (
        <Select value={selectedValue} onChange={handleSelectChange}>
            <option value="man">Man</option>
            <option value="woman">Woman</option>
        </Select>
    );
};

export default SelectBox;
