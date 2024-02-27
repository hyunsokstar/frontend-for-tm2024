import { Box, Switch, SwitchProps } from '@chakra-ui/react';
import React, { ChangeEvent, useState } from 'react';

interface SwitchForUpdateIsCompletedForTechNoteProps extends Omit<SwitchProps, 'onChange'> {
    techNoteId: number;
    userId: number;
    isCompleted: boolean;
}

const SwitchForUpdateIsCompletedForTechNote: React.FC<SwitchForUpdateIsCompletedForTechNoteProps> = ({
    techNoteId,
    userId,
    isCompleted,
    ...rest
}) => {
    // 상태를 관리할 useState 훅 사용
    const [isChecked, setIsChecked] = useState<boolean>(isCompleted);

    const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setIsChecked(checked); // 스위치 상태 업데이트
        // 여기에서 스위치 상태를 처리하고 변경할 수 있습니다.
        // 예: API 호출, 상태 업데이트 등
    };

    return (
        <Box>
            <Switch
                size="lg"
                colorScheme="teal"
                isChecked={isChecked} // 상태에 따라 스위치 체크 여부 변경
                onChange={handleSwitchChange}
                {...rest}
            />
        </Box>
    );
};

export default SwitchForUpdateIsCompletedForTechNote;
