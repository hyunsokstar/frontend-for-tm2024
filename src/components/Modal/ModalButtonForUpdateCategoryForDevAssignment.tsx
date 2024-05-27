import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, IconButton, Button, Input, FormErrorMessage } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { EditIcon } from '@chakra-ui/icons';
import useApiForUpdateCategoryForDevAssignment from '@/hooks/useApiForUpdateCategoryForDevAssignment';

interface IProps {
    categoryId: number
    categoryText: string
}

const ModalButtonForUpdateCategoryForDevAssignment = ({ categoryId, categoryText }: IProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit } = useForm(); // defaultValues 제거
    const mutationForUpdateCategoryForDevAssignment = useApiForUpdateCategoryForDevAssignment();

    const onSubmit = (data: any) => {
        mutationForUpdateCategoryForDevAssignment.mutate({
            id: categoryId,
            updateCategoryDto: {
                name: data.name
            }
        });
        onClose();
    };

    const onClose = () => {
        setIsOpen(false);
    };

    const onOpen = () => {
        setIsOpen(true);
    };

    return (
        <>
            <IconButton
                aria-label="Update"
                icon={<EditIcon />}
                size="xs"
                variant="outline"
                colorScheme='blue'
                mr={1}
                onClick={onOpen}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Category</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                type="text"
                                defaultValue={categoryText}
                                {...register('name')}
                            />
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
                            Update
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForUpdateCategoryForDevAssignment;
