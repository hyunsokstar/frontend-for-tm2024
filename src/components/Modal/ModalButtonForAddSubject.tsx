import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, IconButton, FormErrorMessage } from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';
import useApiForCreateSubject from '@/hooks/useApiForCreateSubject';

const ModalFormForAddSubject = () => {
    const [isOpen, setIsOpen] = useState(false);
    const mutationForCreateSubject = useApiForCreateSubject();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data: any) => {
        mutationForCreateSubject.mutate(data.name);
        setIsOpen(false);
    };

    return (
        <>
            <IconButton
                aria-label='Add'
                icon={<IoMdAdd />}
                bg="gray.200"
                _hover={{ bg: 'gray.300' }}
                _active={{ bg: 'gray.400' }}
                _focus={{ boxShadow: 'none' }}
                variant={"outline"}
                size="sm"
                onClick={() => setIsOpen(true)}
            />
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Subject</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <FormControl isInvalid={!!errors.name}>
                                <FormLabel>Name</FormLabel>
                                <Input type="text" {...register("name", { required: "Name is required" })} />
                                <FormErrorMessage>{errors.name ? (errors.name.message as string) : ""}</FormErrorMessage>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} type="submit">
                                Save
                            </Button>
                            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalFormForAddSubject;
