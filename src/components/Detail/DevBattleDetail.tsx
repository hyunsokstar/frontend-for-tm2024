import React from 'react';
import {
    Grid,
    GridItem,
    Box,
    Text,
    VStack,
    useBreakpointValue,
    Spacer,
    Button,
    IconButton,
    Link,
} from '@chakra-ui/react';
import ChattingForDevBattle from '../ChatBoard/ChattingForDevBattle';
import { TeamForDevBattleResponse } from '@/types/typeForDevBattle';
import ModalButtonForAddTeamForDevBattle from '../Modal/ModalButtonForAddTeamForDevBattle';
import DeleteButtonForTeamForDevBattle from '../Button/DeleteButtonForTeamForDevBattle';
import MemberAvatarsWithRegisterButton from '../Info/MembersInfoWithRegisterButton';
import DevProgressListWithCreateButton from '../List/DevProgressListWithCreateButton';
import ModalButtonForDevSpecForTeam from '../Modal/ModalButtonForDevSpecForTeam';
import ModalButtonForAddDevProgressForTeam from '../Modal/ModalButtonForAddDevProgressForTeam';
import { SiMicrosoftonenote } from "react-icons/si";

interface Props {
    teams: TeamForDevBattleResponse[];
    devBattleId: number;
}

const DevBattleDetail = ({ devBattleId, teams }: Props) => {
    const gridTemplateColumns = useBreakpointValue({
        base: '1fr',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(2, 1fr)',
    }, '1fr');

    const boxColors = [
        { bg: '#ffebee', highlight: '#ffcdd2', description: '#fbe9e7', progress: '#ef9a9a' },
        { bg: '#e6f7ff', highlight: '#b3e0ff', description: '#d9f3ff', progress: '#b3d9ff' },
        { bg: '#e6fff5', highlight: '#b2ffe0', description: '#d9fff3', progress: '#b3ffec' },
        { bg: '#fff5e6', highlight: '#ffe0b2', description: '#fff3d9', progress: '#ffecb3' },
    ];

    return (
        <Box p={0} border={'0px solid green'} width={'100%'}>
            <Grid templateColumns={gridTemplateColumns} mb={1} mr={1}>
                <GridItem colSpan={3} display="flex" justifyContent="flex-end" alignItems="flex-start">
                    <ModalButtonForAddTeamForDevBattle devBattleId={devBattleId} />
                </GridItem>
            </Grid>

            <Grid templateColumns={gridTemplateColumns} gap={4}>
                {teams.length > 0 ? (
                    <>
                        {teams.map((team, index) => (
                            <Box key={team.id} border={"1px solid #ccc"}>
                                <Box bg={boxColors[index % boxColors.length].bg}>
                                    <Box display={"flex"} justifyContent={"space-between"} p={1}>
                                        <Box>
                                            <Text fontSize={'xl'} fontWeight={'bold'}>
                                                {team.name}
                                            </Text>
                                        </Box>
                                        <Spacer />
                                        {team.techNoteListUrl && (
                                            <IconButton
                                                as={Link}
                                                border={"1px solid #ccc"}
                                                href={team.techNoteListUrl}
                                                isExternal
                                                size="xs"
                                                variant="outline"
                                                aria-label="Note Link"
                                                icon={<SiMicrosoftonenote />}
                                                mr={1}
                                            />
                                        )}
                                        <DeleteButtonForTeamForDevBattle teamId={team.id} />
                                    </Box>
                                    <Box mb={0} p={1} bg={boxColors[index % boxColors.length].highlight}>
                                        <MemberAvatarsWithRegisterButton teamId={team.id} members={team.members} />
                                    </Box>
                                    <Box p={2} bg={boxColors[index % boxColors.length].description}>
                                        <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "5fr 1fr" }}>
                                            <GridItem>
                                                <Text fontSize={12}>
                                                    {team.description}
                                                </Text>
                                            </GridItem>
                                            <GridItem>
                                                <Box display={"flex"} justifyContent={"flex-end"}>
                                                    <ModalButtonForDevSpecForTeam teamId={team.id} devSpec={team.devSpecs[0]} />
                                                </Box>
                                            </GridItem>
                                        </Grid>
                                    </Box>
                                </Box>
                                <Box bgColor={boxColors[index % boxColors.length].progress} p={1} display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={1}>
                                    <Text>Task Progress {team.id}</Text>
                                    <ModalButtonForAddDevProgressForTeam teamId={team.id} />
                                </Box>
                                <Box px={1}>
                                    <DevProgressListWithCreateButton teamId={team.id} devProgressForTeams={team.devProgressForTeams} />
                                </Box>
                            </Box>
                        ))}
                    </>
                ) : (
                    <GridItem colSpan={gridTemplateColumns ? gridTemplateColumns.split(' ').length : 1}>
                        <VStack spacing={4} alignItems="center" justifyContent="center" minHeight="300px">
                            <Text fontSize="2xl" fontWeight="bold" color="gray.500">
                                There is No Dev Teams For Dev Battles
                            </Text>
                        </VStack>
                    </GridItem>
                )}
            </Grid>
        </Box>
    );
};

export default DevBattleDetail;