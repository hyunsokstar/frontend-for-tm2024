import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    Stack,
    FormErrorMessage,
    Text,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import ModalButtonForSelectDeadLine from '../Modal/ModalButtonForSelectDeadLine';
import useApiForCreateSubChallenge from '@/hooks/useApiForCreateSubChallenge';

interface IProps {
    challengeId: number;
    pageNum: number;
}

type FormData = {
    challengeName: string;
    description: string;
    prize: string;
};

const ModalButtonForCreateSubChallenge = ({ challengeId, pageNum }: IProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDeadline, setSelectedDeadline] = useState<Date | null>(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const { mutateAsync: createSubChallengeMutation } = useApiForCreateSubChallenge({ challengeId, pageNum, }); // 수정된 부분

    const onSubmit = async (data: FormData) => {
        try {
            const response = await createSubChallengeMutation({
                challengeName: data.challengeName,
                description: data.description,
                prize: parseInt(data.prize),
                deadline: selectedDeadline ? selectedDeadline.toISOString() : '', // ISO 형식으로 변환
            });
            console.log("Sub challenge created successfully: ", response.data);
            // 성공적으로 서브 챌린지가 생성된 후 추가적인 처리 로직을 구현할 수 있습니다.

            // 모달을 닫습니다.
            setIsOpen(false);
        } catch (error) {
            console.error("Error creating sub challenge: ", error);
            // 서브 챌린지 생성 중 오류가 발생한 경우의 처리 로직을 구현할 수 있습니다.
        }
    };

    const handleCancelDeadline = () => {
        setSelectedDeadline(null);
    };

    return (
        <>
            <Button
                aria-label="Add Row"
                leftIcon={<FaPlus />}
                colorScheme="green"
                variant="outline"
                onClick={() => setIsOpen(true)}
            >
                Create Sub Challenge
            </Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Sub Challenge</ModalHeader>
                    <ModalBody>
                        <Stack spacing={4}>
                            <FormControl isInvalid={!!errors.challengeName}>
                                <FormLabel>Challenge Name</FormLabel>
                                <Input {...register('challengeName', { required: 'Challenge name is required' })} />
                                <FormErrorMessage>{errors.challengeName?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.description}>
                                <FormLabel>Description</FormLabel>
                                <Input {...register('description', { required: 'Description is required' })} />
                                <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.prize}>
                                <FormLabel>Prize</FormLabel>
                                <Input type="number" {...register('prize', { required: 'Prize is required' })} />
                                <FormErrorMessage>{errors.prize?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl>
                                <FormLabel>DeadLine </FormLabel>
                                {selectedDeadline ? (
                                    <>
                                        <Text>{`Selected Deadline: ${format(selectedDeadline, 'yyyy-MM-dd HH:mm')}`}</Text>
                                        <Button colorScheme="red" onClick={handleCancelDeadline}>Cancel</Button>
                                    </>
                                ) : (
                                    <ModalButtonForSelectDeadLine button_text={"Select deadline"} setDefaultDeadline={setSelectedDeadline} />
                                )}
                            </FormControl>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
                            Submit
                        </Button>
                        <Button onClick={() => setIsOpen(false)}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForCreateSubChallenge;
