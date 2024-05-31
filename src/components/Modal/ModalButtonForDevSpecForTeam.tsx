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
    Box,
    FormControl,
    FormLabel,
    Input,
    Flex,
    IconButton,
    Wrap,
    WrapItem,
    Tag,
    TagLabel,
    TagCloseButton,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { DevSpecRowForTeamBattle } from "@/types/typeForDevBattle";
import DevSpecForm from "../Form/DevSpecForm";

type Props = {
    teamId: number;
    devSpec: DevSpecRowForTeamBattle | undefined;
};

const ModalButtonForDevSpecForTeam = ({ teamId, devSpec }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const [backendLanguage, setBackendLanguage] = useState(
        devSpec?.backendLanguage || ""
    );
    const [frontendLanguage, setFrontendLanguage] = useState(
        devSpec?.frontendLanguage || ""
    );
    const [backendLibrary, setBackendLibrary] = useState<string[]>(
        devSpec?.backendLibrary || []
    );
    const [frontendLibrary, setFrontendLibrary] = useState<string[]>(
        devSpec?.frontendLibrary || []
    );
    const [orm, setOrm] = useState(devSpec?.orm || "");
    const [css, setCss] = useState(devSpec?.css || "");
    const [app, setApp] = useState(devSpec?.app || "");
    const [collaborationTool, setCollaborationTool] = useState<string[]>(
        devSpec?.collaborationTool || []
    );

    const [newBackendLibraryItem, setNewBackendLibraryItem] = useState("");
    const [newFrontendLibraryItem, setNewFrontendLibraryItem] = useState("");
    const [newCollaborationToolItem, setNewCollaborationToolItem] = useState("");
    const [newDevopsItem, setNewDevopsItem] = useState("");

    const [isNewBackendLibraryItemConfirmed, setIsNewBackendLibraryItemConfirmed] =
        useState(false);
    const [isNewFrontendLibraryItemConfirmed, setIsNewFrontendLibraryItemConfirmed] =
        useState(false);
    const [isNewCollaborationToolItemConfirmed, setIsNewCollaborationToolItemConfirmed] =
        useState(false);

    const handleUpdate = (
        backendLanguage: string,
        frontendLanguage: string,
        orm: string,
        css: string,
        app: string,
        backendLibrary: string[]
    ) => {
        console.log("hi");
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
                        <DevSpecForm teamId={teamId} onUpdate={handleUpdate} />
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

export default ModalButtonForDevSpecForTeam;
