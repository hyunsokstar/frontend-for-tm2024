import React, { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Image, useToast, Spinner } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiForGetUrlForImageUpload, apiForUploadToCloudFlare } from '@/api/apiForCloudFlare';
import { apiForUpdateProfileImage } from '@/api/apiForUserBoard';

type Props = {
    buttonText: string;
    userEmail: string;
    pageNum: any
};

const ModalButtonForProfileImageUpload:
    React.FC<Props> = ({ pageNum, buttonText, userEmail }) => {
        const toast = useToast();
        const queryClient = useQueryClient();


        const { isOpen, onOpen, onClose } = useDisclosure();
        const [selectedFile, setSelectedFile] = useState<File | null>(null);
        const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);

        // step1 image upload url 을 저장할 상태값 선언
        const [urlToImageUpload, setUrlToImageUpload] = useState<string>("")
        const [isLoadingForImageUpload, setIsLoadingForImageUpload] = useState(false);


        // step2 이미지 업로드 mutation 선언
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

        const handleFileChange =
            (event: React.ChangeEvent<HTMLInputElement>) => {
                const files = event.target.files;
                if (files && files.length > 0) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        setPreviewImage(reader.result);
                    };
                    reader.readAsDataURL(files[0]);
                    setSelectedFile(files[0]);
                }
                // step3 파일 선택할때 image upload url 얻어 오기
                mutationForGetImageUploadUrl.mutate();
            };


        const mutationForUpdateUserProfileImage = useMutation({
            mutationFn: apiForUpdateProfileImage,
            onSuccess: async ({ result }: any) => {
                console.log("result for profile image update", result);

                await queryClient.refetchQueries({
                    queryKey: ['apiForGetAllUsers', pageNum],
                });

                toast({
                    title: "image update success",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });

            }
        })

        // step4 c
        const mutationForImageUploadToCloudFlare = useMutation({
            mutationFn: apiForUploadToCloudFlare,
            onSuccess: async ({ result }: any) => {
                console.log("result for mutation : ", result);
                console.log("result : ", result.variants[0]);

                await mutationForUpdateUserProfileImage.mutate({
                    email: userEmail,
                    profileImage: result.variants[0]
                })

                // await queryClient.refetchQueries({
                //     queryKey: ['apiForGetAllUsers', pageNum],
                // });

                setIsLoadingForImageUpload(false)
                onClose();

            },
            onError: (error: Error) => {
                // 에러 발생 시 처리할 내용
                console.log("error : ", error);
            },
        });

        const handleSubmit = async () => {
            if (selectedFile) {
                // 여기서 파일 업로드 로직을 추가할 수 있습니다.
                console.log('Selected File:', selectedFile);

                console.log("submit click !");


                // 파일 업로드 후 모달을 닫습니다.
                setIsLoadingForImageUpload(true)
                await mutationForImageUploadToCloudFlare.mutate({ file: selectedFile, uploadURL: urlToImageUpload })

            }
        };

        return (
            <>
                <Button onClick={onOpen} variant="outlined" size="sm" border={"1px solid gray"} mr={1}>
                    {buttonText}
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>프로필 이미지 업로드</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                            {previewImage && (
                                <Image src={previewImage.toString()} alt="Preview" maxW="300px" maxH="300px" />
                            )}
                            {!previewImage && (
                                <div style={{ width: '300px', height: '300px', backgroundColor: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    No Image Selected
                                </div>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                                업로드
                                {isLoadingForImageUpload ? (
                                    <Spinner size="sm" color="green.500" />
                                ) : (
                                    ""
                                )}
                            </Button>
                            <Button onClick={onClose}>취소</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        );
    };

export default ModalButtonForProfileImageUpload;
