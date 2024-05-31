import React, { useState } from 'react'
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    IconButton,
    FormControl,
    FormLabel,
    Input,
    Button,
} from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';

type Props = {
    teamId: number;
    fieldName: string;
};

const ModalButtonForAddLibrary = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [library, setLibrary] = useState("");

    const handleSubmit = () => {
        console.log(`Team ID: ${props.teamId}, Field Name: ${props.fieldName}, Library: ${library}`);
        onClose();
    };

    return (
        <>
            <IconButton
                aria-label="Add tag"
                icon={<AddIcon />}
                size="xs"
                variant={"outline"}
                onClick={onOpen}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{props.fieldName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>{props.fieldName}</FormLabel>
                            <Input
                                type="text"
                                value={library}
                                onChange={(e) => setLibrary(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForAddLibrary;
