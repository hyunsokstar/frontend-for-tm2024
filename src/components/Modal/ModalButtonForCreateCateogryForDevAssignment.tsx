import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    IconButton,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import useApiForCreateCategoryForDevAssignment from '@/hooks/useApiForCreateCategoryForDevAssignment';
import { AddIcon } from '@chakra-ui/icons';

type Props = {};

const ModalButtonForCreateCategoryForDevAssignment = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const toast = useToast();
    // const createCategoryMutation = useApiForCreateCategoryForDevAssignment();
    const { mutate: createCategoryMutate } = useApiForCreateCategoryForDevAssignment();

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleAddCategory = () => {
        if (categoryName.trim() === '') {
            toast({
                title: 'Category name is required',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
            return;
        }

        createCategoryMutate({ name: categoryName });
        setCategoryName('');
        handleCloseModal()
    };

    return (
        <>
            <IconButton
                aria-label="Add category"
                icon={<AddIcon />}
                variant="outline"
                size="xs"
                onClick={handleOpenModal}
            />

            <Modal isOpen={isOpen} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a new category</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Category name</FormLabel>
                            <Input
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={handleAddCategory}
                        >
                            Add
                        </Button>
                        <Button variant="ghost" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForCreateCategoryForDevAssignment;
