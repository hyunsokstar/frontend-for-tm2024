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
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import useApiForCreateCategoryForDevAssignment from '@/hooks/useApiForCreateCategoryForDevAssignment';
import { FiEdit3 } from 'react-icons/fi';

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
            <Button
                w="100%"
                colorScheme="teal"
                leftIcon={<FiEdit3 />}
                onClick={handleOpenModal}
            >
                카테고리 추가
            </Button>

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
