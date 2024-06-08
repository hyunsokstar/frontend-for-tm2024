import React from 'react';
import {
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    Button,
    Input,
    Select,
    useDisclosure,
} from '@chakra-ui/react';
import { FaPencilAlt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { DevProgressForTeamResponse, IUpdateDevProgressForTeamDto } from '@/types/typeForDevBattle';
import useApiForUpdateDevProgressForTeam from '@/hooks/useApiForUpdateDevProgressForTeam';

type Props = {
    progressId: number;
    progressForTeam: DevProgressForTeamResponse;
};

const ModalButtonForUpdateDevProgress = ({ progressId, progressForTeam }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit, reset, setValue } = useForm<IUpdateDevProgressForTeamDto>({
        defaultValues: {
            task: progressForTeam.task,
            figmaUrl: progressForTeam.figmaUrl,
            youtubeUrl: progressForTeam.youtubeUrl,
            noteUrl: progressForTeam.noteUrl,
            status: progressForTeam.status,
        },
    });
    const { mutate } = useApiForUpdateDevProgressForTeam();

    const onSubmit = async (data: IUpdateDevProgressForTeamDto) => {
        mutate({ progressId, updateDevProgressForTeamDto: data });
        onClose();
        reset();
    };

    React.useEffect(() => {
        setValue('task', progressForTeam.task);
        setValue('figmaUrl', progressForTeam.figmaUrl);
        setValue('youtubeUrl', progressForTeam.youtubeUrl);
        setValue('noteUrl', progressForTeam.noteUrl);
        setValue('status', progressForTeam.status);
    }, [progressForTeam, setValue]);

    return (
        <>
            <IconButton
                onClick={onOpen}
                size="xs"
                variant="outline"
                aria-label="Update Dev Progress"
                icon={<FaPencilAlt />}
                bg="orange.50"
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Dev Progress</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <Input {...register('task')} placeholder="Task" mb={4} />
                            <Input {...register('figmaUrl')} placeholder="Figma URL" mb={4} />
                            <Input {...register('youtubeUrl')} placeholder="YouTube URL" mb={4} />
                            <Input {...register('noteUrl')} placeholder="Note URL" mb={4} />
                            <Select {...register('status')} placeholder="Status">
                                <option value="ready">ready</option>
                                <option value="in_progress">in_progress</option>
                                <option value="test">test</option>
                                <option value="complete">complete</option>
                            </Select>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="ghost" mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="blue" type="submit">
                                Update
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForUpdateDevProgress;