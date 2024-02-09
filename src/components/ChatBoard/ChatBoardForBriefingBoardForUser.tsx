import { useState } from 'react';
import { IBriefing } from '@/types/typeforTodos';
import { Box, Flex, Input, Button, useToast, Avatar } from '@chakra-ui/react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import useApiForCreateChatBoardRowForUser from '@/hooks/useApiForCreateChatBoardRowForUser';

interface IProps {
    todoId: string;
    todoWriterEmail: string;
    briefings: IBriefing[];
    pageNum: string;
}

const ChatBoardForBriefingBoardForUser = ({ pageNum, todoId, todoWriterEmail, briefings }: IProps) => {
    const [inputValue, setInputValue] = useState('');
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const loginUser = useSelector((state: RootState) => state.user.loginUser);
    const toast = useToast(); // Chakra-UI의 useToast 훅 사용
    const CreateChatBoardMutation = useApiForCreateChatBoardRowForUser(pageNum, todoId);
    console.log("briefings : ", briefings);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSendMessage = () => {
        if (isLoggedIn) {
            const position = todoWriterEmail === loginUser.email ? "manager" : "commenter"
            console.log("position : ", position);
            console.log('전송된 메시지:', inputValue);
            console.log(loginUser.id);
            console.log(todoId);
            CreateChatBoardMutation.mutate({
                todoId,
                userId: loginUser.id,
                content: inputValue,
                position
            })
        } else {
            // 로그인 해주세요 toast message with chakra-ui
            toast({
                title: '로그인이 필요합니다.',
                status: 'warning',
                duration: 3000, // 토스트 메시지가 보여지는 시간(ms)
                isClosable: true, // 사용자가 닫을 수 있는지 여부
            });
        }
        setInputValue('');
    };

    return (
        <Box>
            <Box overflowY={"scroll"} height={"50vh"}>
                {briefings.length ? (
                    briefings.map((comment: any, index: number) => (
                        <Flex key={index} justifyContent={comment.position === 'manager' ? 'flex-start' : 'flex-end'} gap={2} mb={1}>
                            <Box>
                                <Avatar src={comment.writer.profileImage} />
                            </Box>
                            <Box p={2} bg={comment.position === 'manager' ? 'gray.200' : 'blue.200'} borderRadius="md" mb={1}>
                                {comment.content}
                            </Box>
                        </Flex>
                    ))
                ) : (
                    <Box>No data</Box>
                )}

            </Box>
            {/* 채팅 입력 부분 */}
            <Flex mt={4}>
                <Input
                    flex="1"
                    mr={2}
                    placeholder="메시지 입력"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <Button onClick={handleSendMessage}>전송</Button>
            </Flex>
        </Box>
    );
};

export default ChatBoardForBriefingBoardForUser;
