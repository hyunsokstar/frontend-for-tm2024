import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Textarea,
    Tag,
    TagLabel,
    TagCloseButton,
    SimpleGrid,
    Box,
    useToast
} from '@chakra-ui/react';
import { FiEdit3 } from 'react-icons/fi';
import useApiForMultiCreateCategoriesForSubject from '@/hooks/useApiForMultiCreateCategoriesForSubject';
import { CreateCategoriesForDevAssignmentDto } from '@/types/typeForDevRelay';

type Props = {
    subjectId: number;
};

const ModalButtonForMultiCreateCategoryForDevAssignment: React.FC<Props> = ({ subjectId }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const { createCategories, error } = useApiForMultiCreateCategoriesForSubject();
    const toast = useToast();

    const handleOpenModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
        setInputValue('');
        setTags([]);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const handleAddTag = () => {
        const newTags = inputValue.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        if (newTags.length === 0) {
            toast({
                title: "Please add categories separated by commas.",
                status: "warning",
                duration: 2000,
                isClosable: true,
            });
            return;
        }
        const uniqueNewTags = newTags.filter(tag => !tags.includes(tag));
        setTags([...tags, ...uniqueNewTags]);
        setInputValue('');
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = async () => {
        if (tags.length === 0) {
            toast({
                title: "Please add categories before submitting.",
                status: "warning",
                duration: 2000,
                isClosable: true,
            });
            return;
        }

        const data: CreateCategoriesForDevAssignmentDto = { name: tags };
        try {
            await createCategories(subjectId, data);
            closeModal();
        } catch (error: any) {
            console.error("Error creating categories: ", error);
            toast({
                title: "Error creating categories",
                description: error.response?.data?.message || "An error occurred while creating categories.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Button
                w="100%"
                colorScheme="blue"
                leftIcon={<FiEdit3 />}
                onClick={handleOpenModal}
            >
                Add Categories
            </Button>

            <Modal isOpen={isOpen} onClose={closeModal} size="3xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Categories</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box display="flex" mb={4}>
                            <Textarea
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="Enter categories, separated by commas"
                                flex="1"
                                mr={2}
                            />
                            <Button onClick={handleAddTag} colorScheme="blue">
                                Add
                            </Button>
                        </Box>
                        <SimpleGrid columns={2} spacing={2}>
                            {tags.map((tag, index) => (
                                <Tag key={index} size="lg" borderRadius="full" variant="solid" colorScheme="teal">
                                    <TagLabel>{tag}</TagLabel>
                                    <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                                </Tag>
                            ))}
                        </SimpleGrid>
                    </ModalBody>

                    <ModalFooter display="flex" gap={2}>
                        <Button colorScheme="red" mr={3} onClick={closeModal} w="50%">
                            Close
                        </Button>
                        <Button colorScheme="blue" onClick={handleSubmit} w="50%">
                            {'Submit'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForMultiCreateCategoryForDevAssignment;
