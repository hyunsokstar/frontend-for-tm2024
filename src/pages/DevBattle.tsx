import React, { useState, useEffect } from 'react';
import {
    Tabs,
    TabPanels,
    TabPanel,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react';
import DevBattleDetail from '@/components/Detail/DevBattleDetail';
import { DevBattleResponse } from '@/types/typeForDevBattle';
import useApiForFindAllDevBattleList from '@/hooks/useApiForFindAllDevBattleList';
import ChattingForDevBattle from '@/components/ChatBoard/ChattingForDevBattle';
import TableForToDosForDevBattle from '@/components/Table/TableForToDosForDevBattle';
import DevBattleTabMenus from '@/components/Menus/DevBattleTabMenus';


const DevBattle = () => {
    const { data } = useApiForFindAllDevBattleList();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isTodosDrawerOpen, setIsTodosDrawerOpen] = useState(false);
    const [selectedDevBattleId, setSelectedDevBattleId] = useState<number>();

    useEffect(() => {
        if (data && data.length > 0) {
            setSelectedDevBattleId(data[0].id);
        }
    }, [data]);

    if (!data) return null;

    const devBattles = data as DevBattleResponse[];

    const handleTabClick = (index: number) => {
        setSelectedDevBattleId(devBattles[index].id);
    };

    const selectedDevBattle = devBattles.find((devBattle) => devBattle.id === selectedDevBattleId);

    return (
        <Box display="flex" width="100%" border="0px solid blue">
            <Tabs variant="soft-rounded" colorScheme="green" width="100%">
                {selectedDevBattleId ?
                    <DevBattleTabMenus
                        devBattles={devBattles}
                        onTabClick={handleTabClick}
                        selectedDevBattleId={selectedDevBattleId}
                    />
                    : ""}

                <TabPanels alignItems="center" p={2}>
                    {devBattles.map((devBattle, index) => (
                        <TabPanel w="100%" alignItems="center" key={index}>
                            <DevBattleDetail devBattleId={devBattle.id} teams={devBattle.teams} />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>

            <Box>
                <Button onClick={() => setIsDrawerOpen(true)} size="sm" variant="outline" mb={2}>
                    Chatting
                </Button>
                <Button onClick={() => setIsTodosDrawerOpen(true)} size="sm" variant="outline">
                    Todos For {selectedDevBattle?.subject ? selectedDevBattle?.subject : ""}
                </Button>
            </Box>

            <Drawer isOpen={isDrawerOpen} placement="right" onClose={() => setIsDrawerOpen(false)} size="md">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <ChattingForDevBattle />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            <Drawer
                isOpen={isTodosDrawerOpen}
                placement="right"
                onClose={() => setIsTodosDrawerOpen(false)}
                size="xl"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody w="1000px">
                        <Box>Todos For {selectedDevBattle?.subject ? selectedDevBattle?.subject : ""}</Box>
                        <Box>
                            {selectedDevBattleId ?
                                <TableForToDosForDevBattle
                                    todos={selectedDevBattle?.todos ?? []}
                                    selectedDevBattleId={selectedDevBattleId}
                                    devBattleSubject={selectedDevBattle?.subject ? selectedDevBattle?.subject : ""}
                                />
                                : ""}
                        </Box>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export default DevBattle;
