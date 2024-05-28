import React from 'react';
import { Grid, GridItem, Box, Avatar, Text, VStack, HStack, Input } from '@chakra-ui/react';

interface Team {
    id: number;
    name: string;
    description: string;
}

interface TeamMember {
    name: string;
    image: string;
}

interface Props {
    teams: Team[];
    teamMembers: TeamMember[];
    tags: string[]; // Add tags prop
}

const getBgColor = (name: string) => {
    if (name === 'Spring Boot + React') {
        return 'blue.100';
    }
    if (name === 'Nest.js + Next.js') {
        return 'purple.100';
    }
    if (name === 'FastAPI + Next.js') {
        return 'orange.100';
    }
    if (name === 'Go + Supabase') {
        return 'green.100';
    }
    return 'gray.100';
};

const getPurpleBgColor = (name: string) => {
    if (name === 'Spring Boot + React') {
        return 'blue.50';
    }
    if (name === 'Nest.js + Next.js') {
        return 'purple.50';
    }
    if (name === 'FastAPI + Next.js') {
        return 'orange.50';
    }
    if (name === 'Go + Supabase') {
        return 'green.50';
    }
    return 'gray.50';
};

const DevBattleDetail = ({ teams, teamMembers, tags }: Props) => {
    return (
        <Box p={0} border={'0px solid green'} width={'100%'}>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr) 1fr' }} gap={4}>
                {teams.length > 0 && (
                    <>
                        {teams.map((team) => (
                            <GridItem
                                key={team.id}
                                bg={getBgColor(team.name)}
                            >
                                <VStack spacing={2} p={2} h={'100%'} alignItems={'center'} justifyContent={'center'}>
                                    <Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>
                                        {team.name}
                                    </Text>
                                    <HStack spacing={2}>
                                        {teamMembers.map((member, index) => (
                                            <Avatar key={index} name={member.name} src={member.image} size={'xs'} />
                                        ))}
                                    </HStack>
                                </VStack>
                                <Box p={4} bg={getPurpleBgColor(team.name)}>
                                    <Text>{team.description}</Text>
                                </Box>
                            </GridItem>
                        ))}
                    </>
                )}
                {/* 채팅 영역 */}
                <GridItem bg={'gray.200'} p={4}>
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
                                        <Text>여러분, 이번 프로젝트를 위해 다양한 기술 스택을 사용하는 3개의 팀을 구성하면 어떨까요?</Text>
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