import React from 'react';
import { VStack, Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';
import DevBattleDetail from '@/components/Detail/DevBattleDetail';
import { DevBattleResponse } from '@/types/typeForDevBattle';
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
        <Box display={"flex"} width={"100%"} border={"0px solid blue"}>
            <Tabs variant="soft-rounded" colorScheme="green" width={"100%"}>
                <TabList p={2}>
                    {devBattles.map((devBattle) => (
                        <Tab key={devBattle.id}>{devBattle.subject}</Tab>
                    ))}
                </TabList>
                <TabPanels alignItems="center" p={2}>
                    {devBattles.map((devBattle, index) => (
                        <TabPanel w="100%" alignItems="center" key={index}>
                            <DevBattleDetail
                                tags={devBattle.tags?.map((tag) => tag.name) || []} // Extract tag names
                                teamMembers={teamMembers}
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
