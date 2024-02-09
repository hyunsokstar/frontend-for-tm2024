import { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Button,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    useDisclosure,
    Box,
    HStack
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { useMutation } from '@tanstack/react-query';
import { apiForLogin } from '@/api/apiForUserBoard';
import { IParamterTypeForLogin } from '@/types/typeForAuthentication';

// redux 관련
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

// 로그인 관련
import { setLoginUser } from '../../store/userSlice';
import { FiLogIn } from 'react-icons/fi';


interface ModalButtonForLoginProps {
    buttonText: string;
}

interface FormData {
    email: string;
    password: string;
}

const ModalButtonForLogin: React.FC<ModalButtonForLoginProps> = ({ buttonText }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm<FormData>();
    const [errorMessageForLogin, setErrorMessageForLogin] = useState(""); // 에러 상태 추가
    const dispatch = useDispatch(); // useDispatch 훅을 사용하여 dispatch 함수 가져오기


    const mutationForLoginByEmail = useMutation({
        mutationFn: ({ email, password }: IParamterTypeForLogin) => {
            return apiForLogin({ email, password })
        },
        // mutationFn: apiForLogin,
        onSuccess: (result) => {
            // 성공시 처리
            console.log("result : ", result);

            if (result.success) {
                dispatch(
                    setLoginUser({
                        id: result.id,
                        email: result.email,
                        nickname: result.nickname,
                        following: result.following,
                        followers: result.followers
                    })
                );
                localStorage.setItem('accessToken', result.accessToken);
                localStorage.setItem('refreshToken', result.refreshToken);
            }

            setErrorMessageForLogin("")
            setLoading(false);
        },
        onError: (error) => {
            // 실패시 처리 
            setLoading(false);
            setErrorMessageForLogin("로그인에 실패했습니다. 다시 시도해주세요."); // 에러 메시지 설정
        }
    })

    const onSubmit = (data: FormData) => {
        setLoading(true);
        mutationForLoginByEmail.mutate({ email: data.email, password: data.password }); // 여기에 추가
    };

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                colorScheme="blue"
                borderColor="#4267B2"
                leftIcon={<FiLogIn />}
                ml={2}
                onClick={onOpen}>
                {buttonText}
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="md">
                <ModalOverlay />
                <ModalContent borderRadius="lg">
                    <ModalHeader textAlign="center">Login</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <InputGroup mt="3">
                                <InputLeftElement pointerEvents="none" children={<EmailIcon color="gray.300" />} />
                                <Input
                                    placeholder="Email"
                                    {...register('email', { required: true })}
                                />
                            </InputGroup>
                            <InputGroup mt="3">
                                <InputLeftElement pointerEvents="none" children={<LockIcon color="gray.300" />} />
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    {...register('password', { required: true })}
                                />
                            </InputGroup>
                        </ModalBody>
                        <ModalFooter display="flex" justifyContent="space-between" alignItems={"center"} flexDirection={"column"} gap={2}>
                            {errorMessageForLogin && <Box style={{ color: "red" }}>{errorMessageForLogin}</Box>} {/* 에러 메시지 출력 */}
                            <HStack spacing={2} width="100%">
                                <Button variant="outline" flex="1" onClick={onClose}>Cancel</Button>
                                <Button colorScheme="teal" flex="1" type="submit" isLoading={loading}>Login</Button>
                            </HStack>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForLogin;
