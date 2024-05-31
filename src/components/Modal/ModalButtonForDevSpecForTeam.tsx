import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,

} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { DevSpecRowForTeamBattle } from "@/types/typeForDevBattle";
import DevSpecForm from "../Form/DevSpecForm";

type Props = {
    teamId: number;
    devSpec: DevSpecRowForTeamBattle | undefined;
};


const ModalButtonForAddItemToSpecificFieldForTeamDevSpec = ({ teamId, devSpec }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    console.log("teamId ::::::::", teamId);


    const handleUpdate = () => {
        console.log("handle update!");

    }

    return (
        <>
            <Button
                size="xs"
                variant="outline"
                colorScheme="teal"
                onClick={() => setIsOpen(true)}
            >
                Dev Spec
            </Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size={"3xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Dev Spec</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <DevSpecForm teamId={teamId} devSpec={devSpec} onUpdate={handleUpdate} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}>
                            Update
                        </Button>
                        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForAddItemToSpecificFieldForTeamDevSpec;
