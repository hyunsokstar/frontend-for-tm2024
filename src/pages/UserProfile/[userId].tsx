import React, { useEffect, useState } from 'react';
import { Avatar, Box, Divider, Image, Spacer, Text, IconButton, VStack, Button } from '@chakra-ui/react';
import useUserPostings from '@/hooks/useUserPostings';
// import { AiFillHeart, AiFillStar, AiFillGithub, AiFillFileText } from "react-icons/ai"; // 사용할 아이콘을 가져와야 합니다.
import { useRouter } from 'next/router';
// import CardForUserPostings from '@/components/Card/CardForUserPostings';
import ModalButtonForCreatePosting from '@/components/Modal/ModalButtonForCreatePosting';
import useUser from '@/hooks/useUser';
import UserProfileInfo from '@/components/UserProfileInfo';
import TabMenuBoxForProfilePage from '@/components/TabMenuBoxForProfilePage';


interface IProps { }

const UserProfile = (props: IProps) => {
    const router = useRouter();
    const { userId } = router.query;
    const [pageNum, setPageNum] = useState(1);
    const selectedUserId = userId as string; // nullish coalescing operator를 사용하여 더 간단하게 처리 가능
    // console.log("selectedUserId : ", selectedUserId);

    const { isLoading, error, dataForUserPosting } = useUserPostings(selectedUserId, pageNum);
    const { isLoggedIn, loginUser, logout } = useUser();

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }

    return (
        <>
            <Box display={"flex"} width={"100%"} margin={"auto"} my={2}>
                <Box
                    width={"100%"}
                    // border={"1px solid green"}
                    display={"flex"}
                    justifyContent={"flex-end"}
                    px={0}
                >
                    <ModalButtonForCreatePosting button_text={'Posting'} userId={parseInt(selectedUserId)} />
                </Box>
            </Box>
            <Box width="100%" margin="auto" mt={2} display="flex" gap={2}>
                {/* 1 영역 left 영역 */}
                <Box
                    width={"80%"}
                    border={"1px dotted black"}
                    height={"70vh"}
                    overflowY={"scroll"}
                    p={2}
                    gap={2}
                >
                    <TabMenuBoxForProfilePage selectedUserId={selectedUserId} />

                </Box>

                {
                    dataForUserPosting && dataForUserPosting.data
                        && dataForUserPosting.data.user ?
                        <UserProfileInfo userInfo={dataForUserPosting.data.user} />
                        : ""
                }

            </Box>

        </>

    );
};

export default UserProfile;
