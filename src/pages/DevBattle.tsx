import React from 'react';
import { VStack, Tabs, TabList, TabPanels, Tab, TabPanel, Box, Button } from '@chakra-ui/react';
import DevBattleDetail from '@/components/Detail/DevBattleDetail';
import { DevBattleResponse } from '@/types/typeForDevBattle';
import useApiForFindAllDevBattleList from '@/hooks/useApiForFindAllDevBattleList';
import DevBattleTabMenus from '@/components/Menus/DevBattleTabMenus';


const DevBattle = () => {
    const { data } = useApiForFindAllDevBattleList();

    if (!data) return null;

    const devBattles = data as DevBattleResponse[];
    const handleTabClick = (index: number) => {
    };

    return (
        <Box display={"flex"} width={"100%"} border={"0px solid blue"}>
            <Tabs variant="soft-rounded" colorScheme="green" width={"100%"}>
                <DevBattleTabMenus devBattles={devBattles} onTabClick={handleTabClick} />

                <TabPanels alignItems="center" p={2}>
                    {devBattles.map((devBattle, index) => (
                        <TabPanel w="100%" alignItems="center" key={index}>
                            <DevBattleDetail
                                devBattleId={devBattle.id}
                                teams={devBattle.teams} // Add teams prop
                            />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default DevBattle;
