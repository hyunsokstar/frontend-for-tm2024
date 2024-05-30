import React from 'react';
import {
    Grid,
    GridItem,
    Box,
    Avatar,
    Text,
    HStack,
    VStack,
    useBreakpointValue,
    IconButton,
    Link,
    Button,
    Spacer,
} from '@chakra-ui/react';
import { FaCircle, FaFigma, FaYoutube, FaFileAlt, FaMinus } from 'react-icons/fa';
import ChattingForDevBattle from '../ChatBoard/ChattingForDevBattle';
import { MemberForDevTeamResponse } from '@/types/typeForDevBattle';
import ModalButtonForAddTeamForDevBattle from '../Modal/ModalButtonForAddTeamForDevBattle';
import DeleteButtonForTeamForDevBattle from '../Button/DeleteButtonForTeamForDevBattle';
import MemberAvatarsWithRegisterButton from '../Info/MembersInfoWithRegisterButton';

interface Team {
    devProgressForTeams: any;
    id: number;
    name: string;
    description: string;
    members: MemberForDevTeamResponse[]
}

interface DevProgressForTeamResponse {
    id: string;
    task: string;
    figmaUrl: string;
    youtubeUrl: string;
    noteUrl: string;
    status: string;
    createdAt: Date;
}

interface Props {
    teams: Team[];
    devBattleId: number;
}

const DevBattleDetail = ({ devBattleId, teams }: Props) => {
    const gridTemplateColumns = useBreakpointValue({
        base: '1fr',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
    }, '1fr');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ready':
                return 'green';
            case 'in_progress':
                return 'blue';
            case 'test':
                return 'orange';
            case 'complete':
                return 'gray';
            default:
                return 'gray';
        }
    };

    return (
        <Box p={0} border={'0px solid green'} width={'100%'}>
            <Grid templateColumns={gridTemplateColumns} mb={1} mr={1}>
                <GridItem colSpan={3} display="flex" justifyContent="flex-end" alignItems="flex-start">
                    <ModalButtonForAddTeamForDevBattle devBattleId={devBattleId} />
                </GridItem>
            </Grid>

            <Grid templateColumns={gridTemplateColumns} gap={4}>
                {teams.length > 0 ? (
                    // 팀 데이터가 있는 경우
                    <>
                        {teams.map((team) => (
                            <Box key={team.id} border={"1px solid pink"}>
                                <Box bg={"blue.50"}>
                                    <Box display={"flex"} justifyContent={"space-between"} p={1}>
                                        <Box>
                                            <Text fontSize={'xl'} fontWeight={'bold'}>
                                                {team.name}
                                            </Text>
                                        </Box>
                                        <Spacer />
                                        <DeleteButtonForTeamForDevBattle teamId={team.id} />
                                    </Box>
                                    <Box mb={1} p={1}>
                                        <MemberAvatarsWithRegisterButton teamId={team.id} members={team.members} />
                                    </Box>
                                    <Box p={2} bg={"lightyellow"}>
                                        <Text>{team.description}</Text>
                                    </Box>
                                </Box>
                                <Box mt={2}>
                                    <Box p={1} rounded="md">
                                        {team.devProgressForTeams.map((progress: DevProgressForTeamResponse) => (
                                            <Box display={"flex"} justifyContent={"space-between"} key={progress.id} mb={2}>
                                                <Text>{progress.task}</Text>

                                                <Box display={"flex"} gap={1} mb={1}>
                                                    <IconButton
                                                        size="xs"
                                                        variant="outline"
                                                        colorScheme={getStatusColor(progress.status)}
                                                        aria-label={`Status ${progress.status}`}
                                                        icon={<FaCircle />}
                                                    />
                                                    {progress.figmaUrl && (
                                                        <IconButton
                                                            as={Link}
                                                            href={progress.figmaUrl}
                                                            isExternal
                                                            size="xs"
                                                            variant="outline"
                                                            aria-label="Figma Link"
                                                            icon={<FaFigma />}
                                                        />
                                                    )}
                                                    {progress.noteUrl && (
                                                        <IconButton
                                                            as={Link}
                                                            href={progress.noteUrl}
                                                            isExternal
                                                            size="xs"
                                                            variant="outline"
                                                            aria-label="Note Link"
                                                            icon={<FaFileAlt />}
                                                        />
                                                    )}
                                                    {progress.youtubeUrl && (
                                                        <IconButton
                                                            as={Link}
                                                            href={progress.youtubeUrl}
                                                            isExternal
                                                            size="xs"
                                                            variant="outline"
                                                            aria-label="Youtube Link"
                                                            icon={<FaYoutube />}
                                                        />
                                                    )}
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </>
                ) : (
                    // 팀 데이터가 없는 경우
                    <GridItem colSpan={gridTemplateColumns ? gridTemplateColumns.split(' ').length : 1}>
                        <VStack spacing={4} alignItems="center" justifyContent="center" minHeight="300px">
                            <Text fontSize="2xl" fontWeight="bold" color="gray.500">
                                There is No Dev Teams For Dev Battles
                            </Text>
                        </VStack>
                    </GridItem>
                )}
                {/* 채팅 영역 */}
                <ChattingForDevBattle />
            </Grid>
        </Box>
    );
};

export default DevBattleDetail;