import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Flex, Input, Stack, IconButton } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import useApiForCreateDevAssignmentSubmission from '@/hooks/useApiForCreateDevAssignmentSubmission';
import { IParameterForCreateDevAssignmentSubmission } from '@/types/typeForDevRelay';

interface FormData {
    title: string;
    noteUrl?: string;
    figmaUrl?: string;
    youtubeUrl?: string;
}

interface Props {
    devAssignmentId: number;
}

const ModalButtonForAddSubmisstion: React.FC<Props> = ({ devAssignmentId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm<FormData>();
    const createDevAssignmentSubmission = useApiForCreateDevAssignmentSubmission(); // 훅 사용

    const onSubmit = (data: FormData) => {
        console.log({ ...data, devAssignmentId });
        const parameter: IParameterForCreateDevAssignmentSubmission = { // API 호출을 위한 매개변수 구성
            devAssignmentId: devAssignmentId,
            createDevAssignmentSubmissionDto: data
        };
        createDevAssignmentSubmission.mutate(parameter); // API 호출
        reset();
        setIsOpen(false);
    };

    return (
        <>
            <IconButton
                aria-label="Add"
                icon={<MdAdd />}
                size="xs"
                colorScheme="teal"
                variant="outline"
                onClick={() => setIsOpen(true)}
            />
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Submission</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={4}>
                                <Input {...register('title')} placeholder="Title" />
                                <Input {...register('noteUrl')} placeholder="Note URL" />
                                <Input {...register('figmaUrl')} placeholder="Figma URL" />
                                <Input {...register('youtubeUrl')} placeholder="YouTube URL" />
                            </Stack>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Flex justify="space-between" width="100%" gap={1}>
                            <Button colorScheme="teal" variant="outline" flex="1" onClick={handleSubmit(onSubmit)}>Submit</Button>
                            <Button colorScheme="gray" variant="outline" flex="1" onClick={() => setIsOpen(false)}>Cancel</Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalButtonForAddSubmisstion;
