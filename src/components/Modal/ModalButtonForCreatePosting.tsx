import { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,

} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiForCreatePost } from '@/api/apiForPosting';

interface ModalButtonProps {
    button_text: string;
    userId: number;
}

interface FormData {
    title: string;
    content: string;
}

const ModalButtonForCreatePosting: React.FC<ModalButtonProps> = ({ button_text, userId }) => {
    const { register, handleSubmit } = useForm();
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();
    const toast = useToast();


    const mutationForCreatePost = useMutation({
        mutationFn: apiForCreatePost,
        onSuccess: (result: any) => {
            console.log("result : ", result);
            queryClient.refetchQueries({ queryKey: ['apiForGetUserPostings'] })

            toast({
                title: "Create Post Success",
                description: result.message,
                status: "success",
                duration: 2000, // 토스트 메시지가 보여지는 시간 (2초)
                isClosable: true,
            });
            setIsOpen(false);
        },
        onError: (error: Error) => {
            // 에러 발생 시 처리할 내용
            console.log("error at posting : ", error);

        },
    });

    const onSubmit = (data: FormData) => {
        console.log('제출된 데이터:', data);
        mutationForCreatePost.mutate({
            userId: userId,
            title: data.title,
            content: data.content
        })
    };

    return (
        <>
            <Button variant={"outline"} onClick={() => setIsOpen(true)}>{button_text}</Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>포스팅 생성</ModalHeader>
                    <ModalCloseButton />

                    {/* <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <FormControl>
                                <FormLabel htmlFor="title">제목</FormLabel>
                                <Input {...register('title')} id="title" />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel htmlFor="content">내용</FormLabel>
                                <Input {...register('content')} id="content" />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button variant="ghost" mr={3} onClick={() => setIsOpen(false)}>
                                취소
                            </Button>
                            <Button type="submit">제출</Button>
                        </ModalFooter>
                    </form> */}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForCreatePosting;
