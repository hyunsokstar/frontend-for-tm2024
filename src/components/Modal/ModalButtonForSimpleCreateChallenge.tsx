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
import ModalButtonForSelectDeadLine from './ModalButtonForSelectDeadLine';
import useApiForSimpleCreateChallenge from '@/hooks/useApiForSimpleCreateChallenge';


type FormData = {
    challengeName: string;
    description: string;
    prize: string;
};

const ModalButtonForSimpleCreateChallenge = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDeadline, setSelectedDeadline] = useState<Date | null>(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [pageNum, setPageNum] = useState(1);
    // useApiForSimpleCreateChallenge 훅 사용
    const mutation = useApiForSimpleCreateChallenge({ pageNum });

    const onSubmit = (data: FormData) => {

        console.log("data.prize : ", data.prize);


        const challengeDto = {
            challengeName: data.challengeName,
            description: data.description,
            prize: parseInt(data.prize),
            deadline: selectedDeadline ? selectedDeadline.toISOString() : '' // ISO 형식으로 변환
        };
        mutation.mutate(challengeDto); // mutation 호출
        setIsOpen(false)
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
                Create
            </Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Challenge</ModalHeader>
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

export default ModalButtonForSimpleCreateChallenge;
