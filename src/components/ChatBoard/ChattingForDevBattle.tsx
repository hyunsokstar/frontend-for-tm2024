import React from 'react';
import { GridItem, Box, Text, HStack, Avatar, Input, Flex } from '@chakra-ui/react';

const ChattingForDevBattle = () => {
    return (
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
                    <Flex>
                        <Input placeholder="Type a message..." />
                        <Box ml="auto">
                            {/* 메시지 전송 버튼을 여기에 추가 */}
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </GridItem>
    );
};

export default ChattingForDevBattle;
