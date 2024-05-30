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
    useDisclosure,
} from "@chakra-ui/react";

type Props = {};


const ModalButtonForDevSpecForTeam = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button size="xs" variant="outline" colorScheme="teal" onClick={onOpen}>
                Dev Spec
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Dev Spec for Team
                        <Button
                            size="xs"
                            variant="outline"
                            colorScheme="blue"
                            ml={4}
                            onClick={() => {
                                // handle select button click
                            }}
                        >
                            Select
                        </Button>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* modal body content */}
                    </ModalBody>

                    <ModalFooter>
                        {/* modal footer content */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForDevSpecForTeam;
