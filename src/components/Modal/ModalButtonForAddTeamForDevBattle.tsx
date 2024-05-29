import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useApiForAddTeamToDevBattle from '@/hooks/useApiForAddTeamToDevBattle';

interface IProps {
    devBattleId: number;
}

const ModalButtonForAddTeamForDevBattle: React.FC<IProps> = ({ devBattleId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit, reset } = useForm();
    const mutation = useApiForAddTeamToDevBattle();

    const onSubmit = (data: any) => {
        const addTeamToDevBattleDto = {
            name: data.name,
            description: data.description,
        };

        mutation.mutate({ devBattleId, addTeamToDevBattleDto });
        onClose();
        reset();
    };

    return (
        <>
            <Button variant="outline" size="xs" onClick={onOpen}>
                create team
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Team</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <FormControl mb={4}>
                                <FormLabel>Name</FormLabel>
                                <Input {...register('name', { required: true })} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Input {...register('description', { required: true })} />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                colorScheme="blue"
                                mr={3}
                                type="submit"
                            >
                                Add Team
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForAddTeamForDevBattle;