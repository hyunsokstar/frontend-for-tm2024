// DevBattleTabMenus.tsx

import React from 'react';
import { Flex, Spacer, TabList, Tab, useColorModeValue } from '@chakra-ui/react';
import { DevBattleResponse } from '@/types/typeForDevBattle';
import ModalButtonForUpdateDevbattleSubjects from '../Modal/ModalButtonForUpdateDevbattleSubjects';

interface DevBattleTabMenuProps {
    devBattles: DevBattleResponse[];
    onTabClick: (index: number) => void;
    selectedDevBattleId: number | null;
}

const DevBattleTabMenus: React.FC<DevBattleTabMenuProps> = ({
    devBattles,
    onTabClick,
    selectedDevBattleId,
}) => {
    const tabColor = useColorModeValue('gray.700', 'white');

    return (
        <Flex alignItems={"center"}>
            <TabList p={2}>
                {devBattles.map((devBattle, index) => (
                    <Tab
                        key={devBattle.id}
                        onClick={() => onTabClick(index)}
                        _selected={{ bg: 'teal.500', color: 'white' }}
                        color={tabColor}>
                        {devBattle.subject}
                    </Tab>
                ))}
            </TabList>
            <Spacer />
            <ModalButtonForUpdateDevbattleSubjects devBattles={devBattles} />
        </Flex>
    );
};

export default DevBattleTabMenus;