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
    Badge,
} from '@chakra-ui/react';
import DevBattleDetail from '@/components/Detail/DevBattleDetail';
import { DevBattleResponse, IChatRoom } from '@/types/typeForDevBattle';
import useApiForFindAllDevBattleList from '@/hooks/useApiForFindAllDevBattleList';
import ChattingForDevBattle from '@/components/ChatBoard/ChattingForDevBattle';
import TableForToDosForDevBattle from '@/components/Table/TableForToDosForDevBattle';
import DevBattleTabMenus from '@/components/Menus/DevBattleTabMenus';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDevBattleId } from '@/store/devBattleSlice';
import { RootState } from '@/store';
import useUser from '@/hooks/useUser';

const DevBattle = () => {
    const dispatch = useDispatch();
    const { data } = useApiForFindAllDevBattleList();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isTodosDrawerOpen, setIsTodosDrawerOpen] = useState(false);
    const [selectedChatRoom, setSelectedChatRoom] = useState<IChatRoom>();
    const [messageCount, setMessageCount] = useState<number>(0);
    const selectedDevBattleId = useSelector((state: RootState) => state.devBattle.selectedDevBattleId);
    const { isLoggedIn, loginUser, logout } = useUser();

    useEffect(() => {
        if (data && data.length > 0) {
            dispatch(setSelectedDevBattleId(data[0].id));
        }
    }, [data, dispatch]);

    useEffect(() => {
        if (selectedDevBattleId && data) {
            const selectedDevBattle = data.find((devBattle: DevBattleResponse) => devBattle.id === selectedDevBattleId);
            if (selectedDevBattle && selectedDevBattle.chatRooms.length > 0) {
                setSelectedChatRoom(selectedDevBattle.chatRooms[0]);
                setMessageCount(selectedDevBattle.chatRooms[0].messages.length);
            } else {
                setSelectedChatRoom(undefined); // 채팅방이 없을 경우 초기화
                setMessageCount(0); // 메시지 개수 초기화
            }
        }
    }, [selectedDevBattleId, data]);

    if (!data) return null;

    const devBattles = data as DevBattleResponse[];

    const handleTabClick = (index: number) => {
        dispatch(setSelectedDevBattleId(devBattles[index].id));
    };

    const selectedDevBattle = devBattles.find((devBattle) => devBattle.id === selectedDevBattleId);

    return (
        <Box display="flex" width="100%" border="0px solid blue">
            <Tabs variant="soft-rounded" colorScheme="green" width="100%">
                {selectedDevBattleId ? (
                    <DevBattleTabMenus
                        devBattles={devBattles}
                        onTabClick={handleTabClick}
                        selectedDevBattleId={selectedDevBattleId}
                    />
                ) : (
                    ''
                )}

                <TabPanels alignItems="center" p={2}>
                    {devBattles.map((devBattle, index) => (
                        <TabPanel w="100%" alignItems="center" key={index}>
                            <DevBattleDetail
                                devBattleId={devBattle.id}
                                teams={devBattle.teams}
                                selectedDevBattleSubject={selectedDevBattle?.subject ? selectedDevBattle?.subject : ''}
                                todos={selectedDevBattle?.todos ?? []}
                            />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>

            <Box>
                <Button onClick={() => setIsDrawerOpen(true)} size="sm" variant="outline" mb={2}>
                    Chatting{' '}
                    {selectedChatRoom && selectedChatRoom.messages.length > 0 ? (
                        <Badge ml={2} fontSize="0.8em" colorScheme="green">
                            {selectedChatRoom.messages.length}
                        </Badge>
                    ) : (
                        <Badge ml={2} fontSize="0.8em" colorScheme="green">
                            0
                        </Badge>
                    )}
                </Button>
                <Button onClick={() => setIsTodosDrawerOpen(true)} size="sm" variant="outline">
                    Todos For {selectedDevBattle?.subject ? selectedDevBattle?.subject : ''}
                </Button>
            </Box>

            <Drawer isOpen={isDrawerOpen} placement="right" onClose={() => setIsDrawerOpen(false)} size="xl">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                        {selectedChatRoom ? (
                            <ChattingForDevBattle chatRoom={selectedChatRoom} loginUser={loginUser} />
                        ) : (
                            <Box>No Chat Room Available</Box>
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            <Drawer isOpen={isTodosDrawerOpen} placement="right" onClose={() => setIsTodosDrawerOpen(false)} size="xl">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody w="1000px">
                        <Box>Todos For {selectedDevBattle?.subject ? selectedDevBattle?.subject : ''}</Box>
                        <Box>
                            {selectedDevBattleId ? (
                                <TableForToDosForDevBattle
                                    todos={selectedDevBattle?.todos ?? []}
                                    selectedDevBattleId={selectedDevBattleId}
                                    devBattleSubject={selectedDevBattle?.subject ? selectedDevBattle?.subject : ''}
                                />
                            ) : (
                                ''
                            )}
                        </Box>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export default DevBattle;
