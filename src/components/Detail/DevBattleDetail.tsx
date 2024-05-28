import React from 'react';
import {
    Grid,
    GridItem,
    Box,
    Avatar,
    Text,
    VStack,
    HStack,
    Input,
    useBreakpointValue,
    IconButton,
    Link,
    Flex,
} from '@chakra-ui/react';
import { MdLink } from 'react-icons/md';
import { FaCircle, FaFigma, FaYoutube, FaFileAlt } from 'react-icons/fa';


interface Team {
    devProgressForTeams: any;
    id: number;
    name: string;
    description: string;
}

interface TeamMember {
    name: string;
    image: string;
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
    teamMembers: TeamMember[];
    tags: string[];
    devProgressForTeams: DevProgressForTeamResponse[];
}

const DevBattleDetail = ({
    teams,
    teamMembers,
}: Props) => {
    const gridTemplateColumns = useBreakpointValue({
        base: '1fr',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
    });

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
            <Grid templateColumns={gridTemplateColumns} gap={4}>
                {teams.length > 0 && (
                    <>
                        {teams.map((team) => (
                            <GridItem key={team.id} border={"1px solid pink"}>
                                <VStack spacing={2} p={2} alignItems={'center'} bgColor={"lightblue"}>
                                    <Text fontSize={'xl'} fontWeight={'bold'} textAlign={'center'}>
                                        {team.name}
                                    </Text>
                                    <HStack spacing={2}>
                                        {teamMembers.slice(0, 3).map((member, index) => (
                                            <Avatar key={index} name={member.name} src={member.image} size={'xs'} />
                                        ))}
                                    </HStack>
                                </VStack>
                                <Box p={2} bg={"lightyellow"}>
                                    <Text>{team.description}</Text>
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
                            </GridItem>
                        ))}
                    </>
                )}
                {/* 채팅 영역 */}
                <GridItem
                    gridColumn={{ base: '1/-1', md: '4/5', lg: '4/5' }}
                    bg={'gray.200'}
                    p={4}
                >
                    <Box bg="white" borderRadius="md" boxShadow="md" p={4}>
                        <Box borderBottom="1px solid" borderColor="gray.200" pb={2} mb={2}>
                            <Text fontSize="lg" fontWeight="bold">
                                Chat
                            </Text>
                        </Box>
                        <Box overflowY="auto" maxH="300px">
                            {/* 채팅 메시지들을 여기에 렌더링 */}
                            <Box mb={2}>
                                <HStack spacing={2} align="start">
                                    <Avatar name="개발자 1" size="sm" />
                                    <Box bg="gray.100" p={2} borderRadius="md">
                                        <Text>
                                            여러분, 이번 프로젝트를 위해 다양한 기술 스택을 사용하는 3개의 팀을 구성하면
                                            어떨까요?
                                        </Text>
                                    </Box>
                                </HStack>
                            </Box>
                            <Box mb={2}>
                                <HStack spacing={2} align="start" justify="end">
                                    <Box bg="blue.100" p={2} borderRadius="md">
                                        <Text>좋은 생각이에요! 각자 관심 있는 팀에 합류해서 프로젝트를 시작해봐요.</Text>
                                    </Box>
                                    <Avatar name="개발자 3" size="sm" />
                                </HStack>
                            </Box>
                        </Box>
                        <Box mt={4}>
                            <Input placeholder="Type a message..." />
                        </Box>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    );
};

export default DevBattleDetail;