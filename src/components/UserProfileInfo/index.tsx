import React, { useState } from 'react'
import { Box, Image, Button, Text, useToast, Spinner, Input, IconButton, Flex } from '@chakra-ui/react'
import { apiForGetUrlForImageUpload, apiForUploadToCloudFlare } from '@/api/apiForCloudFlare';
import { UseMutationOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiForUpdateProfileImage } from '@/api/apiForUserBoard';
import { SlUserFollowing, SlUserUnfollow } from 'react-icons/sl';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import useApiForGetUncompletedTodoListForUserId from '@/hooks/useApiForGetUncompletedTodoListForUserId';

type Props = { userInfo: any }


const UserProfileInfo = ({ userInfo }: Props) => {

    const [profileImageUrl, setProfileImageUrl] = useState(userInfo.profileImage)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [urlToImageUpload, setUrlToImageUpload] = useState<string>("")
    const [isLoadingForImageUpload, setIsLoadingForImageUpload] = useState(false);
    const queryClient = useQueryClient();
    const toast = useToast();
    const userId = userInfo.id
    const pageNum = 1;

    // const { isLoading, error, data: uncompletedTodoListForUser } = useApiForGetUncompletedTodoListForUserId(pageNum, userId);
    // console.log("uncompletedTodoListForUser : ", uncompletedTodoListForUser);


    const loginUser = useSelector((state: RootState) => state.user.loginUser);
    console.log("userInfo : ", userInfo);
    console.log("loginUser from profile component : ", loginUser);


    const mutationForUpdateUserProfileImage = useMutation({
        mutationFn: apiForUpdateProfileImage,
        onSuccess: ({ result }: any) => {
            console.log("result for profile image update", result);

            toast({
                title: "image update success",
                status: "success",
                duration: 2000,
                isClosable: true,
            });

        }
    })

    const mutationForImageUploadToCloudFlare = useMutation({
        mutationFn: apiForUploadToCloudFlare,
        onSuccess: ({ result }: any) => {
            console.log("result for mutation : ", result);
            console.log("result : ", result.variants[0]);
            setProfileImageUrl(result.variants[0])
            setIsLoadingForImageUpload(false)

            mutationForUpdateUserProfileImage.mutate({ email: userInfo.email, profileImage: result.variants[0] })

            // toast({
            //     title: "image upload success",
            //     description: result.variants[0],
            //     status: "success",
            //     duration: 2000,
            //     isClosable: true,
            // });
        },
        onError: (error: Error) => {
            // 에러 발생 시 처리할 내용
            console.log("error : ", error);
        },
    });

    const mutationForGetImageUploadUrl = useMutation({
        mutationFn: apiForGetUrlForImageUpload,
        onSuccess: (result: any) => {
            // 성공 시 처리할 내용
            console.log("result : ", result);
            setUrlToImageUpload(result.uploadURL);
        },
        onError: (error: Error) => {
            // 에러 발생 시 처리할 내용
        },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
        mutationForGetImageUploadUrl.mutate();
    };

    const uploadImageToCloudFlare = () => {
        setIsLoadingForImageUpload(true)
        mutationForImageUploadToCloudFlare.mutate({ file: selectedFile, uploadURL: urlToImageUpload })
    }

    return (
        <Box
            width={"20%"}
            display="flex"
            flexDirection="column"
            alignItems="center"
            border={"1px solid black"}
            height={"70vh"}
        >
            {/* {isLoggedIn ? "로그인 상태" : "비 로그인 상태"} */}
            <Box display="flex" flexDirection="column" width={"100%"}>
                <Box border={"1px solid black"} width={"100%"} >
                    {selectedFile ? (
                        <Image
                            width={"100%"}
                            objectFit="fill"
                            src={URL.createObjectURL(selectedFile)}
                            alt="Selected Image"
                            height={"30vh"}
                        />
                    ) : (
                        <Image
                            width={"100%"}
                            objectFit="contain"
                            src={profileImageUrl}
                            alt="Sample Image"
                            height={"30vh"}
                        />
                    )}
                </Box>
                <Box display={"flex"} justifyContent="space-between" border={"0px solid red"} p={2}>
                    <Box border={"0px solid green"} width={"48%"}>
                        <label htmlFor="fileSelect">
                            <Input
                                type="file"
                                id="fileSelect"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <Button variant="outline" size={'md'} width={"100%"} as="span">
                                Select
                            </Button>
                        </label>
                    </Box>
                    <Box width={"48%"} >
                        <Button
                            variant="outline"
                            size={"md"}
                            className="equal-width-button"
                            width={"100%"}
                            onClick={uploadImageToCloudFlare}
                            colorScheme={urlToImageUpload ? "green" : "gray"}
                            isDisabled={!urlToImageUpload}
                        >
                            Update Image
                            {isLoadingForImageUpload ? (
                                <Spinner size="sm" color="green.500" />
                            ) : (
                                ""
                            )}
                        </Button>
                    </Box>

                </Box>


            </Box>
            <Box marginTop="2px" border={"0px solid black"} width={"100%"} p={2}>
                <Text>Email: {userInfo.email}</Text>
                <Text>Nickname: {userInfo.nickname}</Text>
                <Text>Gender: {userInfo.gender}</Text>
                <Text>Role: {userInfo.role}</Text>
            </Box>

            <Box>
                {loginUser.email}
                {loginUser.following?.map((user) => <Box>{user.email}</Box>)}
            </Box>


            <Box mt={3}>
                {loginUser.email === "" ? (
                    ""
                ) : (
                    loginUser.email !== "" && (
                        <Flex alignItems="center">
                            {loginUser.following?.map((row) => row.email).includes(userInfo.email) ? (
                                <Button
                                    leftIcon={<FaHeart />}
                                    variant="outline"
                                    colorScheme="red"
                                // onClick={handleUnfollow}
                                >
                                    언팔로우
                                </Button>
                            ) : (
                                <Button
                                    leftIcon={<FaRegHeart />}
                                    // variant="outline"
                                    colorScheme='green'
                                // onClick={handleFollow}
                                >
                                    팔로우
                                </Button>
                            )}
                        </Flex>
                    )
                )}
            </Box>

        </Box>
    )
}

export default UserProfileInfo