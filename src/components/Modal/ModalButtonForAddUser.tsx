import { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    FormControl,
    FormLabel,
    Input,
    Flex,
    Text,
    Box,
    useToast,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiForAddUser } from '../../api/apiForUserBoard';


interface FormData {
    email: string;
    nickname: string;
    password: string;
    passwordCheck: string;
    phoneNumber: string;
}

interface ModalButtonProps {
    buttonText: string;
}

const ModalButtonForAddUser: React.FC<ModalButtonProps> = ({ buttonText }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toast = useToast();
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<FormData>();
    const [passwordMismatch, setPasswordMismatch] = useState(false); // 비밀번호 불일치 상태 추가
    const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이기 토글 상태

    const mutation = useMutation({
        mutationFn: apiForAddUser,
        onSuccess: (result: any) => {
            // 성공 시 처리할 내용
            console.log("result : ", result);

            queryClient.refetchQueries({ queryKey: ['apiForGetAllUsers'] })

            toast({
                title: "Create User Success",
                description: result.message,
                status: "success",
                duration: 2000, // 토스트 메시지가 보여지는 시간 (2초)
                isClosable: true,
            });
        },
        onError: (error: Error) => {
            // 에러 발생 시 처리할 내용
        },
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
        mutation.mutate({
            email: data.email,
            nickname: data.nickname,
            password: data.password,
        })
        onClose();
    };

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    const onPasswordCheckBlur = () => {
        const passwordValue = getValues("password");
        const passwordCheckValue = getValues("passwordCheck");
        setPasswordMismatch(passwordValue !== passwordCheckValue && passwordCheckValue.length > 0); // 비밀번호 불일치 시 true, 일치 시 false 설정
    };

    return (
        <Box border={"0px solid green"}>
            <Button
                variant="outline"
                size="sm"
                colorScheme="blue"
                onClick={onOpen}
            >
                {buttonText}
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="md">
                <ModalOverlay />
                <ModalContent bgColor="#F4F6F9" border="none">
                    <ModalHeader>
                        <Flex justifyContent="center">
                            <Text fontSize="lg" ml={2} fontWeight="bold">
                                사용자 추가
                            </Text>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <FormControl>
                                <FormLabel htmlFor="email">이메일</FormLabel>
                                <Input {...register('email', { required: true })} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel htmlFor="nickname">닉네임</FormLabel>
                                <Input {...register('nickname', { required: true })} />
                            </FormControl>

                            <FormControl mt={4}>
                                <Flex justifyContent="space-between"> {/* FormLabel을 감싸는 Flex 컨테이너 */}
                                    <FormLabel htmlFor="password" display="flex" alignItems="center"> {/* Flex로 라벨과 버튼을 감싸기 */}
                                        비밀번호
                                    </FormLabel>
                                    <Button variant={"outline"} size={"sm"} m={1} onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? '숨기기' : '보이기'}
                                    </Button>
                                </Flex>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', { required: true })}
                                    onBlur={onPasswordCheckBlur}
                                />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel htmlFor="passwordCheck">비밀번호 확인</FormLabel>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('passwordCheck', { required: true })}
                                    onBlur={onPasswordCheckBlur} // 비밀번호 확인 input에서 떠날 때 호출되는 함수
                                />
                            </FormControl>

                            <Box>
                                {/* todo2 여기에 패스워드 틀렸다고 경고 메세지 출력 */}
                                {passwordMismatch && ( // 비밀번호 불일치 시 메시지 출력
                                    <Text color="red" mt={2}>
                                        비밀번호가 일치하지 않습니다.
                                    </Text>
                                )}
                            </Box>

                        </ModalBody>

                        <ModalFooter>
                            <Flex w="full">
                                <Button flex="1" onClick={onClose} mr={2}>취소</Button>
                                <Button flex="1" colorScheme="blue" type="submit">등록</Button>
                            </Flex>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ModalButtonForAddUser;


