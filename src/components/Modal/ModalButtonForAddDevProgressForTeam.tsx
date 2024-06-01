import React, { useState } from 'react';
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
    Select,
    useDisclosure,
    FormErrorMessage,
} from '@chakra-ui/react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { IAddDevProgressForTeamDto } from '@/types/typeForDevBattle';
import { FaPlus } from 'react-icons/fa';
import useApiForAddProgressToDevTeam from '@/hooks/useApiForAddProgressToDevTeam';

interface IModalButtonForAddDevProgressForTeamProps {
    teamId: number;
}

const ModalButtonForAddDevProgressForTeam: React.FC<IModalButtonForAddDevProgressForTeamProps> = ({
    teamId,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IAddDevProgressForTeamDto>();
    const mutationForAddProgressToDevTeam = useApiForAddProgressToDevTeam();

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        const formData = data as IAddDevProgressForTeamDto;
        mutationForAddProgressToDevTeam.mutate(
            { teamId, addDevProgressForTeamDto: formData },
            {
                onSuccess: () => {
                    setIsLoading(false);
                    onClose();
                },
                onError: () => {
                    setIsLoading(false);
                },
            }
        );
    };

    return (
        <>
            <Button onClick={onOpen} size="xs" variant="outline" border={"1px solid black"}>
                <FaPlus />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Dev Progress</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <FormControl isInvalid={Boolean(errors.task)}>
                                <FormLabel>Task</FormLabel>
                                <Input type="text" placeholder="Task" {...register('task', { required: 'Task is required' })} />
                                <FormErrorMessage>{errors.task?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Figma URL</FormLabel>
                                <Input type="text" placeholder="Figma URL" {...register('figmaUrl')} />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Youtube URL</FormLabel>
                                <Input type="text" placeholder="Youtube URL" {...register('youtubeUrl')} />
                            </FormControl>

                            {/* <FormControl>
                                <FormLabel>Note URL</FormLabel>
                                <Input type="text" placeholder="Note URL" {...register('noteUrl')} />
                            </FormControl> */}

                            <FormControl>
                                <FormLabel>Status</FormLabel>
                                <Select {...register('status')}>
                                    <option value={"ready"}>Ready</option>
                                    <option value={"in_prgress"}>In Progress</option>
                                    <option value={"test"}>Test</option>
                                    <option value={"complete"}>Complete</option>
                                </Select>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button type="submit" isLoading={isLoading} colorScheme="blue" mr={3}>
                                Add
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForAddDevProgressForTeam;
