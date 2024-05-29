import React from 'react';
import { Flex, Spacer, TabList, Tab } from '@chakra-ui/react';
import { DevBattleResponse } from '@/types/typeForDevBattle';
import ModalButtonForUpdateDevbattleSubjects from '../Modal/ModalButtonForUpdateDevbattleSubjects';

interface DevBattleTabMenuProps {
    devBattles: DevBattleResponse[];
    onTabClick: (index: number) => void;
}

const DevBattleTabMenus: React.FC<DevBattleTabMenuProps> = ({
    devBattles,
    onTabClick,
}) => {
    return (
        <Flex>
            <TabList p={2}>
                {devBattles.map((devBattle, index) => (
                    <Tab key={devBattle.id} onClick={() => onTabClick(index)}>
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
