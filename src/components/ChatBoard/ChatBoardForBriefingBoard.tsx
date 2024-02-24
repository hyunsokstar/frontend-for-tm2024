import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Flex, Input, Button, useToast, Avatar, Spinner, Tooltip, Img } from '@chakra-ui/react';
import { RootState } from '@/store';
import useApiForCreateChatBoardRow from '@/hooks/useApiForCreateChatBoardRow';
import { IBriefing } from '@/types/typeforTodos';
import { useMutation } from '@tanstack/react-query';
import { apiForGetUrlForImageUpload, apiForUploadToCloudFlare } from '@/api/apiForCloudFlare';
import Image from 'next/image';
import ModalButtonForShowImageForBriefingBoard from '../Modal/ModalButtonForShowImageForBriefingBoard';
import useApiForSelectManagerForUnsignedTask from '@/hooks/useApiForSelectManagerForUnsignedTask';

interface IProps {
    todoId: string;
    todoWriterEmail: string;
    briefings: IBriefing[];
    pageNum?: string;
    pageInfo?: string;
    isMainOrSub: "main" | "sub";
}

const ChatBoardForBriefingBoard: React.FC<IProps> = ({ pageNum = "1", todoId, todoWriterEmail, briefings, pageInfo, isMainOrSub }) => {
    const [inputValue, setInputValue] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // 파일 선택 상태 추가
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const loginUser = useSelector((state: RootState) => state.user.loginUser);
    const toast = useToast();
    const userId = undefined

    const todoStatusOption = "entry"

    const mutationForSelectManagerForUnsginedTask = useApiForSelectManagerForUnsignedTask({ pageNum, userId, todoStatusOption })
    const createChatBoardRowMutation = useApiForCreateChatBoardRow(pageNum, userId, todoStatusOption);


    const [urlToImageUpload, setUrlToImageUpload] = useState<string>("")
    const [isLoadingForImageUpload, setIsLoadingForImageUpload] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const mutationForGetImageUploadUrl = useMutation({
        mutationFn: apiForGetUrlForImageUpload,
        onSuccess: (result: any) => {
            // 성공 시 처리할 내용
            // console.log("result : ", result);
            setUrlToImageUpload(result.uploadURL);
        },
        onError: (error: Error) => {
            // 에러 발생 시 처리할 내용
        },
    });

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);

            mutationForGetImageUploadUrl.mutate();


        }
    };


    const mutationForImageUploadToCloudFlare = useMutation({
        mutationFn: apiForUploadToCloudFlare,
        onSuccess: async ({ result }: any) => {
            console.log("result for mutation : ", result);
            console.log("result.variants[0] : ", result.variants[0]);

            const position = todoWriterEmail === loginUser.email ? "manager" : "commenter";

            console.log("input value check ??? : " + inputValue);
            console.log("chatboard row create");


            createChatBoardRowMutation.mutate({
                todoId,
                userId: loginUser.id,
                content: inputValue,
                position,
                isMainOrSub,
                refImage: result.variants[0]
            });

            // await queryClient.refetchQueries({
            //     queryKey: ['apiForGetAllUsers', pageNum],
            // });
            // setInputValue('');
            // setSelectedFile(null); // 전송 후 파일 선택 상태 초기화
            setIsLoadingForImageUpload(false)
        },
        onError: (error: Error) => {
            // 에러 발생 시 처리할 내용
            console.log("error : ", error);
        },
    });

    const handleSendMessage = async () => {
        if (isLoggedIn) {
            setIsLoadingForImageUpload(true)
            const position = todoWriterEmail === loginUser.email ? "manager" : "commenter";
            // console.log("position: ", position);
            // console.log('전송된 메시지:', inputValue);
            // console.log('선택한 파일 정보:', selectedFile); // 선택한 파일 정보 출력
            // console.log('loginUser.id:', loginUser.id);
            // console.log('urlToImageUpload:', urlToImageUpload);
            console.log("chatboard row create");

            console.log("임의의 이미지 url 을 메세지 저장할때 같이 보내서 저장");

            if (selectedFile) {
                await mutationForImageUploadToCloudFlare.mutate({ file: selectedFile, uploadURL: urlToImageUpload })

            } else {
                createChatBoardRowMutation.mutate({
                    todoId,
                    userId: loginUser.id,
                    content: inputValue,
                    position,
                    isMainOrSub,
                    // refImage: result.variants[0]
                });
                setIsLoadingForImageUpload(false)
            }

        } else {
            toast({
                title: '로그인이 필요합니다.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const selectUserForTask = (comment: any) => {
        console.log("selectUserForTask 버튼 클릭", comment);
        console.log("todoId : ", todoId);
        // 이 사람으로 담당자 배정
        // todo, commentWriter 
        // apiForSelectManagerForUnsignedTask (todoId, comment.writer)
        mutationForSelectManagerForUnsginedTask.mutate({
            todoId: todoId,
            writerId: comment.writer.id
        })
    }

    return (
        <Box>
            <Box overflowY="scroll" height="50vh" display="flex" flexDirection="column" alignItems="flex-start">
                {briefings.length ? (
                    briefings.map((comment: any, index: number) => (
                        <Box
                            key={index}
                            m={1}
                            alignSelf={comment.position === 'manager' ? 'flex-start' : 'flex-end'} // 매니저인 경우 왼쪽 정렬, 아닌 경우 오른쪽 정렬
                        >
                            <Box display="flex" gap={2}>
                                <Box>
                                    <Avatar src={comment.writer.profileImage} />
                                </Box>
                                <Box p={2} bg={comment.position === 'manager' ? 'gray.200' : 'blue.200'} borderRadius="md" mb={1}>

                                    {comment.content.includes('@지원요청') ? (
                                        <Box>
                                            {comment.content}
                                            {todoWriterEmail === undefined && (
                                                <Button onClick={() => selectUserForTask(comment)}>선택</Button>
                                            )}
                                        </Box>
                                    ) :
                                        <Box>
                                            {comment.content}
                                        </Box>
                                    }

                                </Box>
                            </Box>
                            <Box position="relative" display="inline-block">
                                {comment.refImage && (
                                    <Box>
                                        <ModalButtonForShowImageForBriefingBoard imageUrl={comment.refImage} />
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
                <input type="file" onChange={handleFileInputChange} />
            </Box>
            <Flex mt={4}>
                <Input
                    flex="1"
                    mr={2}
                    placeholder="메시지 입력"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <Button onClick={handleSendMessage}>
                    전송
                    {isLoadingForImageUpload ? (
                        <Spinner size="sm" color="green.500" />
                    ) : (
                        ""
                    )}
                </Button>
            </Flex>
        </Box>
    );
};

export default ChatBoardForBriefingBoard;
