import React from 'react';
import { Grid, GridItem, Box, Avatar, Text, HStack, VStack } from '@chakra-ui/react';

interface temMember {
    name: string,
    image: string
}

interface IProps {
    title: string,
    tags: string[]
    teamMembers: temMember[]
}

const DevBattleDetail = (
    { title, tags, teamMembers }: IProps
) => {
    return (
        <Box p={0} border={"0px solid green"} width={"100%"}>
            <VStack spacing={2} alignItems="flex-start">
                <Text fontSize="3xl" fontWeight="bold">
                    Battle Subject: {title}
                </Text>
                <HStack spacing={2} pb={2}>
                    <Text fontSize="md" fontWeight="medium" color="gray.500">
                        Tag:
                    </Text>
                    {tags.map((tag, index) => (
                        <Box key={index} bg="gray.200" px={2} py={1} rounded="md" fontSize="xs" color="gray.600">
                            {tag}
                        </Box>
                    ))}
                </HStack>
            </VStack>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
                <GridItem bg="blue.100" borderRight="1px solid gray.300">
                    <VStack spacing={2} p={2} h="100%" alignItems="center" justifyContent="center">
                        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                            Spring Boot + React 팀
                        </Text>
                        <HStack spacing={2}>
                            {teamMembers.map((member, index) => (
                                <Avatar key={index} name={member.name} src={member.image} size="xs" />
                            ))}
                        </HStack>
                    </VStack>
                    <Box p={4} bg="blue.50">
                        <Text>Body section for 스프링 부트 + React 팀</Text>
                    </Box>
                </GridItem>
                <GridItem bg="purple.100" borderRight="1px solid gray.300">
                    <VStack spacing={2} p={2} h="100%" alignItems="center" justifyContent="center">
                        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                            Nest js + Next js 팀
                        </Text>
                        <HStack spacing={2}>
                            {teamMembers.map((member, index) => (
                                <Avatar key={index} name={member.name} src={member.image} size="xs" />
                            ))}
                        </HStack>
                    </VStack>
                    <Box p={4} bg="purple.50">
                        <Text>Body section for Nest js + Next js 팀</Text>
                    </Box>
                </GridItem>

                <GridItem bg="orange.100" borderRight="1px solid gray.300">
                    <VStack spacing={2} p={2} h="100%" alignItems="center" justifyContent="center">
                        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                            FastAPI + Next js 팀
                        </Text>
                        <HStack spacing={2}>
                            {teamMembers.map((member, index) => (
                                <Avatar key={index} name={member.name} src={member.image} size="xs" />
                            ))}
                        </HStack>
                    </VStack>
                    <Box p={4} bg="purple.50">
                        <Text>Body section for Nest js + Next js 팀</Text>
                    </Box>
                </GridItem>

                <GridItem bg="green.100">
                    <VStack spacing={2} p={2} h="100%" alignItems="center"
                        justifyContent="center">
                        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                            GoLang + Supabase 팀
                        </Text>
                        <HStack spacing={2}>
                            {teamMembers.map((member, index) => (
                                <Avatar key={index} name={member.name} src={member.image} size="xs" />
                            ))}
                        </HStack>
                    </VStack>
                    <Box p={4} bg="purple.50">
                        <Text>GoLang + Supabase 팀</Text>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    );
};

export default DevBattleDetail;
