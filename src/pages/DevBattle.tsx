import React from 'react'
import { Grid, GridItem, Box, Divider, Avatar, Text, HStack, VStack } from '@chakra-ui/react'

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
]

const DevBattle = () => {
    return (
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
            <GridItem bg='blue.100' borderRight='1px solid gray.300'>
                <VStack spacing={2} p={2} h='100%' alignItems='center' justifyContent='center'>
                    <Text fontSize='2xl' fontWeight='bold' textAlign='center'>
                        스프링 부트 + React 팀
                    </Text>
                    <HStack spacing={2}>
                        {teamMembers.map((member, index) => (
                            <Avatar key={index} name={member.name} src={member.image} size='xs' />
                        ))}
                    </HStack>
                </VStack>
                <Box p={4} bg='blue.50'>
                    <Text>Body section for 스프링 부트 + React 팀</Text>
                </Box>
            </GridItem>
            <GridItem bg='purple.100' borderRight='1px solid gray.300'>
                <VStack spacing={2} p={2} h='100%' alignItems='center' justifyContent='center'>
                    <Text fontSize='2xl' fontWeight='bold' textAlign='center'>
                        Nest js + Next js 팀
                    </Text>
                    <HStack spacing={2}>
                        {teamMembers.map((member, index) => (
                            <Avatar key={index} name={member.name} src={member.image} size='xs' />
                        ))}
                    </HStack>
                </VStack>
                <Box p={4} bg='purple.50'>
                    <Text>Body section for Nest js + Next js 팀</Text>
                </Box>
            </GridItem>
            <GridItem bg='green.100'>
                <VStack spacing={2} p={2} h='100%' alignItems='center' justifyContent='center'>
                    <Text fontSize='2xl' fontWeight='bold' textAlign='center'>
                        Chatting
                    </Text>
                    <HStack spacing={2}>
                        {teamMembers.map((member, index) => (
                            <Avatar key={index} name={member.name} src={member.image} size='xs' />
                        ))}
                    </HStack>
                </VStack>
                <Box p={4} bg='green.50'>
                    <Text>Body section for Chatting</Text>
                </Box>
            </GridItem>
        </Grid>
    )
}

export default DevBattle
