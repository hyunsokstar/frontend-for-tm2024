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
import useApiForAddItemToSpecificFieldForTeamDevSpec from '@/hooks/useApiForAddItemToSpecificFieldForTeamDevSpec';

type Props = {
    teamId: number;
    fieldName: string;
};

const ModalButtonForAddItemToSpecificFieldForTeamDecSpec = ({ teamId, fieldName }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [itemText, setItemText] = useState('');

    // Initialize the custom hook
    const { mutate: addItem } = useApiForAddItemToSpecificFieldForTeamDevSpec();

    const handleSubmit = () => {
        // Update the devSpecForTeamBattleUpdateDto with the current itemText
        addItem({
            teamId: teamId,
            devSpecForTeamBattleUpdateDto: {
                fieldName: fieldName,
                itemText: itemText,
            }
        });
        onClose();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setItemText(event.target.value);
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
                    <ModalHeader>{fieldName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>{fieldName}</FormLabel>
                            <Input type="text" value={itemText} onChange={handleInputChange} />
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

export default ModalButtonForAddItemToSpecificFieldForTeamDecSpec;
