import React, { useState } from 'react';
import { VStack, Tabs, TabList, TabPanels, Tab, TabPanel, Box, Button, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react';
import DevBattleDetail from '@/components/Detail/DevBattleDetail';
import { DevBattleResponse } from '@/types/typeForDevBattle';
import useApiForFindAllDevBattleList from '@/hooks/useApiForFindAllDevBattleList';
import DevBattleTabMenus from '@/components/Menus/DevBattleTabMenus';
import ChattingForDevBattle from '@/components/ChatBoard/ChattingForDevBattle';

const DevBattle = () => {
    const { data } = useApiForFindAllDevBattleList();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    if (!data) return null;

    const devBattles = data as DevBattleResponse[];
    const handleTabClick = (index: number) => { };

    return (
        <Box display="flex" width="100%" border="0px solid blue">
            <Tabs variant="soft-rounded" colorScheme="green" width="100%">
                <DevBattleTabMenus devBattles={devBattles} onTabClick={handleTabClick} />

                <TabPanels alignItems="center" p={2}>
                    {devBattles.map((devBattle, index) => (
                        <TabPanel w="100%" alignItems="center" key={index}>
                            <DevBattleDetail devBattleId={devBattle.id} teams={devBattle.teams} />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>

            <Box>
                <Button onClick={() => setIsDrawerOpen(true)} size={"sm"} variant={"outline"}>Chatting</Button>
            </Box>

            <Drawer isOpen={isDrawerOpen} placement="right" onClose={() => setIsDrawerOpen(false)} size={"md"}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <ChattingForDevBattle />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export default DevBattle;
