import { IBriefingForSubChallengeRow } from '@/types/typeforChallenges';
import { Box, Avatar, Button } from '@chakra-ui/react';
import React from 'react';
import ModalButtonForShowImageForBriefingBoard from '../Modal/ModalButtonForShowImageForBriefingBoard';

type IProps = {
    briefingsForSubChallenge: IBriefingForSubChallengeRow[];
}

const ChatBoardForBriefingsForSubChallenge: React.FC<IProps> = ({ briefingsForSubChallenge }) => {

    return (
        <Box>
            <Box overflowY="scroll" height="50vh" display="flex" flexDirection="column" alignItems="flex-start">
                {briefingsForSubChallenge.length ? (
                    briefingsForSubChallenge.map((briefing: IBriefingForSubChallengeRow, index: number) => (
                        <Box
                            key={index}
                            m={1}
                            alignSelf={briefing.position === 'manager' ? 'flex-start' : 'flex-end'} // 매니저인 경우 왼쪽 정렬, 아닌 경우 오른쪽 정렬
                        >
                            <Box display="flex" gap={2}>
                                <Box>
                                    <Avatar />
                                </Box>
                                <Box p={2} bg={briefing.position === 'manager' ? 'gray.200' : 'blue.200'} borderRadius="md" mb={1}>
                                    {briefing.content}
                                </Box>
                            </Box>
                            <Box position="relative" display="inline-block">
                                {briefing.refImage && (
                                    <Box>
                                        <ModalButtonForShowImageForBriefingBoard imageUrl={briefing.refImage} />
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Box>No data</Box>
                )}
            </Box>
        </Box>
    );
}

export default ChatBoardForBriefingsForSubChallenge;
