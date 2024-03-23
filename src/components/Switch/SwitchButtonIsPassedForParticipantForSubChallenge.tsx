import React, { useState } from 'react';
import { Switch, useColorModeValue } from '@chakra-ui/react';
import useApiForUpdateIsPassedForParticipantForSubChallenge from '@/hooks/useApiForUpdateIsPassedForParticipantForSubChallenge';

interface Props {
    participantId: number;
    subChallengeId: number;
    defaultIsPassed: boolean;
}

const SwitchButtonIsPassedForParticipantForSubChallenge = ({ participantId, subChallengeId, defaultIsPassed }: Props) => {
    const [isPassed, setIsPassed] = useState(defaultIsPassed);
    const mutationForUpdateIsPassed = useApiForUpdateIsPassedForParticipantForSubChallenge({ subChallengeId, participantId });

    const handleChange = () => {
        setIsPassed(!isPassed);
        mutationForUpdateIsPassed.mutate(!isPassed); // isPassed 값을 업데이트하기 위해 useMutation 훅에서 반환된 mutate 함수를 호출합니다.
    };

    const bgColor = useColorModeValue('gray.300', 'gray.700');

    return (
        <Switch
            isChecked={isPassed}
            onChange={handleChange}
            colorScheme='green'
            size='md'
            bg={bgColor}
        />
    );
};

export default SwitchButtonIsPassedForParticipantForSubChallenge;
