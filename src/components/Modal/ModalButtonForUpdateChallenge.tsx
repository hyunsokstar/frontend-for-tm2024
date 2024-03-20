import React, { useState, useEffect } from 'react';
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
    IconButton,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useApiForUpdateChallenge from '@/hooks/useApiForUpdateChallenge'; // 변경된 부분
import { EditIcon } from '@chakra-ui/icons';
import { IChallengeRow } from '@/types/typeforChallenges';

interface ModalButtonProps {
    buttonText: string;
    challengeId: number;
    pageNum: number; // 페이지 번호도 props로 전달받아야 합니다.
    challenge: IChallengeRow
}

interface IFormDataForUpdateChallenge {
    challengeName: string;
    description: string;
    prize: number;
    deadline: string;
}

const ModalButtonForUpdateChallenge: React.FC<ModalButtonProps> = ({ buttonText, challengeId, challenge, pageNum }) => {
    const { register, handleSubmit, reset } = useForm<IFormDataForUpdateChallenge>(); // useForm에 제네릭 타입 지정
    const [isOpen, setIsOpen] = useState(false);
    const toast = useToast();

    // useApiForUpdateChallenge 훅을 사용합니다.
    const mutationForUpdateChallenge = useApiForUpdateChallenge({ pageNum });

    useEffect(() => {
        // 모달이 열릴 때마다 초기값을 설정합니다.
        reset({
            challengeName: challenge.challengeName,
            description: challenge.description,
            prize: challenge.prize,
            deadline: new Date(challenge.deadline).toISOString().slice(0, 10), // Date 객체로 변환하여 초기값 설정
        });
        setIsOpen(false)
    }, [challenge, reset]);

    const onSubmit = (data: IFormDataForUpdateChallenge) => {
        mutationForUpdateChallenge.mutate({
            challengeId: challengeId,
            updateChallengeDto: {
                challengeName: data.challengeName,
                description: data.description,
                prize: data.prize,
                deadline: data.deadline,
            },
        });
        reset({});
    };

    return (
        <>
            <IconButton
                aria-label="Edit"
                icon={<EditIcon />}
                onClick={() => setIsOpen(true)}
                variant="outline"
                size="xs"
                mr={2}
                colorScheme="primary" // 버튼 색상 적용
                _hover={{ bg: 'blue.100' }} // 호버 시에 배경색 변경
            />

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Challenge</ModalHeader>
                    <ModalCloseButton />

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <FormControl>
                                <FormLabel htmlFor="challengeName">Challenge Name</FormLabel>
                                <Input {...register('challengeName')} id="challengeName" />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel htmlFor="description">Description</FormLabel>
                                <Input {...register('description')} id="description" />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel htmlFor="prize">Prize</FormLabel>
                                <Input {...register('prize')} id="prize" type="number" />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel htmlFor="deadline">Deadline</FormLabel>
                                <Input {...register('deadline')} id="deadline" type="date" />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button variant="ghost" mr={3} onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Update</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForUpdateChallenge;
