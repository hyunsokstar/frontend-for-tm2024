import React from 'react';
import { Select } from '@chakra-ui/react';

type Props = {
    onChangeStatus: (status: string) => void;
};

const SelectBoxForDefaultTodoStatus = ({ onChangeStatus }: Props) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChangeStatus(event.target.value);
    };

    return (
        <Select defaultValue="" onChange={handleChange}>
            <option value="">선택</option>
            <option value="idea">Idea</option>
            <option value="ready">Ready</option>
            <option value="progress">Progress</option>
            <option value="testing">Testing</option>
            <option value="complete">Complete</option>
        </Select>
    );
};

export default SelectBoxForDefaultTodoStatus;
