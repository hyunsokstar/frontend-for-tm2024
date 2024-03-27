import { IBriefingForSubChallengeRow, CreateBriefingForSubChallengeDto } from '@/types/typeforChallenges';
import { Box, Avatar, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { useState } from 'react';
import ModalButtonForShowImageForBriefingBoard from '../Modal/ModalButtonForShowImageForBriefingBoard';
import useCreateBriefingForSubChallengeMutation from '@/hooks/useApiForCreateBriefingForSubChallenge';

type IProps = {
    pageNum: number
    position: "manager" | "commenter"
    subChallengeId: number;
    briefingsForSubChallenge: IBriefingForSubChallengeRow[];
}

const ChatBoardForBriefingsForSubChallenge: React.FC<IProps> = ({ pageNum, position, subChallengeId, briefingsForSubChallenge }) => {
    const [inputValue, setInputValue] = useState('');
    const createBriefingMutation = useCreateBriefingForSubChallengeMutation(pageNum);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        if (inputValue.trim() !== '') {
            const newBriefing: CreateBriefingForSubChallengeDto = {
                content: inputValue.trim(),
                position: position
            };
            createBriefingMutation.mutate({
                subChallengeId,
                createBriefingForSubChallengeDto: newBriefing
            });
            setInputValue(''); // 입력 필드 초기화
        }
    };

    return (
        <Box>
            <Box overflowY="scroll" height="50vh" display="flex" flexDirection="column" alignItems="flex-start">
                {briefingsForSubChallenge.length ? (
                    briefingsForSubChallenge.map((briefing: IBriefingForSubChallengeRow, index: number) => (
                        <Box
                            key={index}
                            m={1}
                            alignSelf={briefing.position === 'manager' ? 'flex-start' : 'flex-end'}
                        >
                            <Box display="flex" gap={2}>
                                <Box>
                                    <Avatar src={briefing?.writer?.profileImage ? briefing?.writer?.profileImage : ""} />
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
            <Box>
                <InputGroup mt={2}>
                    <Input value={inputValue} onChange={handleInputChange} />
                    <InputRightElement>
                        <Box>
                            <Button
                                mr={2}
                                onClick={handleSubmit}
                                size={"xs"}
                                variant={"outline"}
                            >
                                입력
                            </Button>
                        </Box>
                    </InputRightElement>
                </InputGroup>
            </Box>
        </Box>
    );
}

export default ChatBoardForBriefingsForSubChallenge;
