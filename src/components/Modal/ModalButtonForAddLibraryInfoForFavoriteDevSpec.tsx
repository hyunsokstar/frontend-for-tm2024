import React from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Flex, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import useApiForAddLibraryToFavoriteDevSpec from '@/hooks/useApiForAddLibraryToFavoriteDevSpec';

interface IProps {
    idForFavoriteDevSpec: number;
}

interface FormValues {
    library: string;
    description: string;
    siteUrl: string;
}

const ModalButtonForAddLibraryInfoForFavoriteDevSpec = ({ idForFavoriteDevSpec }: IProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>() // reset 함수 추가
    const addLibraryMutation = useApiForAddLibraryToFavoriteDevSpec({ favoriteDevSpecId: idForFavoriteDevSpec }); // 수정된 부분

    const onSubmit = async (data: FormValues) => {
        try {
            await addLibraryMutation.mutateAsync({
                favoriteDevSpecId: idForFavoriteDevSpec,
                createLibraryDto: data
            });
            reset(); // 폼 리셋
        } catch (error) {
            console.error("Error adding library: ", error);
        }
        onClose();
    };

    return (
        <>
            <Button variant="outline" size="sm" onClick={onOpen}>+</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Library Info</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <Input {...register("library", { required: "Library is required" })} placeholder="Library" mb={3} />
                            {errors.library && <p>{errors.library.message}</p>}

                            <Input {...register("description", { required: "Description is required" })} placeholder="Description" mb={3} />
                            {errors.description && <p>{errors.description.message}</p>}

                            <Input {...register("siteUrl", { required: "Site URL is required" })} placeholder="Site URL" mb={3} />
                            {errors.siteUrl && <p>{errors.siteUrl.message}</p>}
                        </ModalBody>

                        <ModalFooter>
                            <Flex w="full" gap={1}>
                                <Button flex="1" colorScheme="blue" type="submit">등록</Button>
                                <Button flex="1" onClick={onClose} mr={2}>취소</Button>
                            </Flex>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalButtonForAddLibraryInfoForFavoriteDevSpec
