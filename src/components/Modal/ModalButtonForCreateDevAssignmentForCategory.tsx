import React, { useState, useEffect } from 'react';
import { IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure, Input, Button, useToast } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import useApiForCreateDevAssignment from '@/hooks/useApiForCreateDevAssignment';
import { CreateDevAssignmentDto } from '@/types/typeForDevRelay';

interface IProps {
    categoryId: any;
}

const ModalButtonForCreateDevAssignmentForCategory = ({ categoryId }: IProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [day, setDay] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const toast = useToast();

    // call the useApiForCreateDevAssignment hook and pass in the categoryId prop
    const { mutate: createDevAssignment } = useApiForCreateDevAssignment({ categoryId });

    const handleSubmit = () => {
        // create a CreateDevAssignmentDto object with the form data
        const createDevAssignmentDto: CreateDevAssignmentDto = {
            day,
            title,
        };
        createDevAssignment(createDevAssignmentDto);
        onClose();
    };

    // modify the onOpen function to include the categoryId check
    const handleOpen = () => {
        if (categoryId === null || categoryId === undefined) {
            toast({
                title: "카테고리를 먼저 선택해주세요",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
        } else {
            onOpen();
        }
    };

    return (
        <>
            <IconButton
                aria-label="추가"
                icon={<AddIcon />}
                onClick={handleOpen} // 모달을 열도록 클릭 이벤트 핸들러 설정
                variant={"outline"}
                size={"sm"}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Dev Assignment 입력</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* 입력 폼 */}
                        <Input placeholder="" value={day} onChange={(e) => setDay(e.target.value)} />
                        <Input mt={2} placeholder="" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>확인</Button>
                        <Button onClick={onClose}>취소</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForCreateDevAssignmentForCategory;
