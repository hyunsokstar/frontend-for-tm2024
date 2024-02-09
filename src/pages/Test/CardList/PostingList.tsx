import {
    Box,
    Heading,
    Text,
    Divider,
    Avatar, Flex,
    Image,
    Grid,
    HStack,
    Icon,
    IconButton
} from '@chakra-ui/react';
import { AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { FaGithub, FaStickyNote } from 'react-icons/fa';
import { format } from 'date-fns';

interface Posting {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    user: {
        nickname: string;
    }
}

const samplePostings: Posting[] = [
    {
        "id": 9,
        "title": "test title3",
        "content": "test content3",
        "createdAt": "2023-12-17T13:15:38.700Z",
        "user": {
            "nickname": "tere1"
        }
    },
    {
        "id": 10,
        "title": "더미 타이틀1",
        "content": "이것은 더미 콘텐츠 1입니다.",
        "createdAt": "2023-12-16T05:23:13.285Z",
        "user": {
            "nickname": "dummyuser1"
        }
    },
    {
        "id": 11,
        "title": "더미 포스팅 2",
        "content": "여기에는 더미 콘텐츠 2가 들어갑니다. 약간의 텍스트를 채워 넣습니다. 또 약간의 텍스트를 채워 넣습니다.",
        "createdAt": "2023-12-17T15:47:52.813Z",
        "user": {
            "nickname": "dummyuser2"
        }
    },
    {
        "id": 12,
        "title": "리액트에 대한 질문",
        "content": "리액트 hook의 효과적인 사용팁이 있나요?",
        "createdAt": "2023-12-18T09:15:37.944Z",
        "user": {
            "nickname": "reactlover123"
        }
    },
    {
        "id": 13,
        "title": "리액트에 대한 질문",
        "content": "리액트 hook의 효과적인 사용팁이 있나요?",
        "createdAt": "2023-12-18T09:15:37.944Z",
        "user": {
            "nickname": "reactlover123"
        }
    },

    {
        "id": 14,
        "title": "리액트에 대한 질문",
        "content": "리액트 hook의 효과적인 사용팁이 있나요?",
        "createdAt": "2023-12-18T09:15:37.944Z",
        "user": {
            "nickname": "reactlover123"
        }
    },

    {
        "id": 15,
        "title": "리액트에 대한 질문",
        "content": "리액트 hook의 효과적인 사용팁이 있나요?",
        "createdAt": "2023-12-18T09:15:37.944Z",
        "user": {
            "nickname": "reactlover123"
        }
    },

    {
        "id": 16,
        "title": "리액트에 대한 질문",
        "content": "리액트 사용팁이 있나요?",
        "createdAt": "2023-12-18T09:15:37.944Z",
        "user": {
            "nickname": "reactlover123"
        }
    },
    {
        "id": 16,
        "title": "리액트에 대한 질문",
        "content": "리액트 hook의 효과적인 사용팁이 있나요 사용팁이 있나요?",
        "createdAt": "2023-12-18T09:15:37.944Z",
        "user": {
            "nickname": "reactlover123"
        }
    },

    {
        "id": 17,
        "title": "리액트에 대한 질문",
        "content": "리액트 hook의 효과적인?",
        "createdAt": "2023-12-18T09:15:37.944Z",
        "user": {
            "nickname": "reactlover123"
        }
    }

];

const PostingList = () => {
    return (
        <Flex width="80%" mx="auto" gap={2}>
            <Grid
                width={"75%"}
                templateColumns="repeat(1, 1fr)" // 2열 그리드 설정
                gap={2}
                mt={5}
                maxHeight={"70vh"}
                border={"2px solid black"}
                overflowY={"scroll"}
            >
                {samplePostings.map((posting) => (
                    <Box
                        key={posting.id}
                        display={"flex"}
                        // gap={2}
                        width={"100%"}
                        borderRadius={5}
                        boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
                        height={"100%"}
                    // mr={2}
                    // border={"1px solid black"}
                    >
                        <Box width={"30%"} border="1px solid black" p={1}>
                            <Image
                                src="https://via.placeholder.com/150"
                                alt="Sample Image"
                                // overflow={"hidden"}
                                width={"100%"}
                                objectFit={"fill"}
                                height={"100%"}
                                borderRadius={5}
                            />
                        </Box>
                        <Box width={"70%"} border={"0px solid orange"}>
                            <Box
                                display={"flex"}
                                justifyContent={"space-between"}
                                flexDirection={"row"}
                                // border={"2px solid pink"}
                                p={2}
                                height={"72%"}
                            >
                                <Box
                                    my={2}
                                    display={"flex"}
                                    // justifyContent={"space-between"}
                                    flexDirection={"column"}
                                >
                                    <Text fontSize={"3xl"}>
                                        {posting.title}
                                    </Text>
                                    <Text fontSize={"1xl"} mb={2} pr={2}>
                                        {posting.content}
                                    </Text>
                                </Box>

                                <Text fontSize="sm" color="gray.500">
                                    {format(new Date(posting.createdAt), 'yyyy.MM.dd hh:mm a')}
                                </Text>
                            </Box>



                            <Box
                                display={"flex"}
                                justifyContent={"flex-end"}
                                alignItems="center"
                                border={"0px solid green"}
                                height={"28%"}
                                p={1}
                                gap={2}
                            >

                                <IconButton
                                    aria-label="GitHub 아이콘"
                                    icon={<FaGithub />}
                                    onClick={() => {
                                        // GitHub 아이콘 클릭 시 동작 추가
                                    }}
                                    variant={"outline"}
                                />
                                <IconButton
                                    aria-label="노트 아이콘"
                                    icon={<FaStickyNote />}
                                    onClick={() => {
                                        // 노트 아이콘 클릭 시 동작 추가
                                    }}
                                    variant={"outline"}
                                />

                                <IconButton
                                    aria-label="Like"
                                    icon={<Icon as={AiOutlineHeart} />}
                                    variant="outline"
                                />
                                <IconButton
                                    aria-label="Bookmark"
                                    icon={<Icon as={AiOutlineStar} />}
                                    variant="outline"
                                />
                            </Box>

                        </Box>
                    </Box>
                ))}

            </Grid>

            {/* 우측 영역 */}
            <Box width="30%">

                <Box
                    width="100%"
                    height={"70vh"}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    pl={4} // 패딩 추가
                    border={"1px solid black"}
                    mt={5}
                >
                    <Box>
                        <Image
                            mt={2}
                            boxSize="200px"
                            objectFit="cover"
                            src="https://wimg.mk.co.kr/news/cms/202306/12/news-p.v1.20230609.5101dc06d57b46f3bc552e95933d31c4_P1.jpg"
                            alt="Sample Image"
                        />
                    </Box>

                    <Box marginTop="20px">
                        <Text>Email: user@example.com</Text>
                        <Text>Nickname: User123</Text>
                        <Text>Gender: Male</Text>
                        <Text>Role: Admin</Text>
                    </Box>
                </Box>

            </Box>
        </Flex>
    );
};

export default PostingList;
