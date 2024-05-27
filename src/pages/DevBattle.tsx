import React from 'react';
import { VStack, Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';
import DevBattleDetail from '@/components/Detail/DevBattleDetail';
import { DevBattleResponse } from '@/types/typeForDevBattle';
import { apiForFindAllDevBattleList } from '@/api/apiForDevBattle';
import useApiForFindAllDevBattleList from '@/hooks/useApiForFindAllDevBattleList';

const teamMembers = [
    {
        name: 'Alice',
        image: 'https://bit.ly/broken-link',
    },
    {
        name: 'Bob',
        image: 'https://bit.ly/broken-link',
    },
    {
        name: 'Charlie',
        image: 'https://bit.ly/broken-link',
    },
    {
        name: 'Dave',
        image: 'https://bit.ly/broken-link',
    },
];

const DevBattle = () => {
    const { data } = useApiForFindAllDevBattleList();

    // Ensure data exists before processing
    if (!data) return null; // Or display a loading indicator

    const devBattles = data as DevBattleResponse[]; // Cast data to DevBattleResponse[]

    return (
        <Box display={"flex"}>
            <VStack spacing={4} p={4}>
                <Tabs variant="soft-rounded" colorScheme="green">
                    <TabList>
                        {devBattles.map((devBattle) => (
                            <Tab key={devBattle.id}>{devBattle.subject}</Tab>
                        ))}
                    </TabList>
                    <TabPanels w="100%" alignItems="center">
                        {devBattles.map((devBattle, index) => (
                            <TabPanel w="100%" alignItems="center" key={index}>
                                <DevBattleDetail
                                    title={devBattle.subject}
                                    tags={devBattle.tags?.map((tag) => tag.name) || []} // Extract tag names
                                    teamMembers={teamMembers}
                                />
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </VStack>
        </Box>
    );
};

export default DevBattle;
