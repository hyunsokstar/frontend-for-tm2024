import React, { useState } from 'react';
import { Avatar, Box, Divider, Image, Spacer, Text, IconButton } from '@chakra-ui/react';
import useUserPostings from '@/hooks/useUserPostings';
import { AiFillHeart, AiFillStar, AiFillGithub, AiFillFileText } from "react-icons/ai"; // 사용할 아이콘을 가져와야 합니다.
import { useRouter } from 'next/router';

type Props = {
    title: string;
    content: string;
    createdAt: string;
}

const IconWithCounter = ({ ariaLabel, icon: Icon, onClick, count }: any) => {
    return (
        <Box p={1} width={"100%"} display={"flex"} gap={2}>
            <IconButton aria-label={ariaLabel} icon={<Icon />} onClick={onClick} />
            <Box>{count}</Box>
        </Box>
    );
};

const CardForUserPostings = ({ title, content, createdAt }: Props) => {

    return (
        <Box
            border={"1px solid blue"}
            display={"flex"}
            mb={2}
        >
            <Box
                border={"1px solid red"}
                width={"30%"}
            >
                <Image
                    src="https://via.placeholder.com/150"
                    width={"100%"}
                    height={"100%"}
                />
            </Box>
            <Box
                width={"70%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-around"}
            // gap={2}
            >
                <Box px={2}>
                    <Text fontWeight="bold">Title:</Text>
                    <Text fontSize="xl">{title}</Text>

                    <Text fontWeight="bold" mt={3}>Content:</Text>
                    <Text>{content}</Text>

                    <Text fontWeight="bold" mt={3}>Created At:</Text>
                    <Text>{createdAt}</Text>
                </Box>
                <Box
                    mt={1}
                    px={2}
                    width={"100%"}
                    display={"flex"}
                    justifyContent={"space-between"}
                // border={"1px solid black"}
                >
                    <IconWithCounter ariaLabel="좋아요" icon={AiFillHeart} count={1} />
                    <IconWithCounter ariaLabel="즐겨찾기" icon={AiFillStar} count={1} />
                    <IconWithCounter ariaLabel="GitHub" icon={AiFillGithub} count={2} />
                    <IconWithCounter ariaLabel="노트" icon={AiFillFileText} count={1} />
                </Box>
            </Box>
        </Box>
    )
}

export default CardForUserPostings