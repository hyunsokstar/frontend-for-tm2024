import React, { useState, useEffect } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Grid,
    GridItem,
    Tag,
    TagLabel,
    TagCloseButton,
    IconButton,
    useColorModeValue,
    HStack,
    Text,
} from "@chakra-ui/react";
import ModalButtonForAddItemToSpecificFieldForTeamDecSpec from "../Modal/ModalButtonForAddItemToSpecificFieldForTeamDecSpec";
import { DevSpecRowForTeamBattle } from "@/types/typeForDevBattle";
import UpdateFormForDevSpecForTeamBattle from "./UpdateFormForDevSpecForTeamBattle";

type Props = {
    teamId: number;
    onUpdate: (
        backendLanguage: string,
        frontendLanguage: string,
        orm: string,
        css: string,
        app: string,
    ) => void;
    devSpec: DevSpecRowForTeamBattle | undefined;
};

const DevSpecForm = ({ teamId, onUpdate, devSpec }: Props) => {
    const [backendLanguage, setBackendLanguage] = useState("");
    const [frontendLanguage, setFrontendLanguage] = useState("");
    const [orm, setOrm] = useState("");
    const [css, setCss] = useState("");
    const [app, setApp] = useState("");
    const [backendLibrary, setBackendLibrary] = useState<string[]>([]);

    useEffect(() => {
        if (devSpec?.backendLibrary) {
            setBackendLibrary(devSpec.backendLibrary);
        }
    }, [devSpec]);

    const handleUpdate = () => {
        onUpdate(
            backendLanguage,
            frontendLanguage,
            orm,
            css,
            app,
        );
    };

    const removeFromBackendLibrary = (index: number) => {
        setBackendLibrary(backendLibrary.filter((_, i) => i !== index));
    };

    return (
        <Box>
            <Grid templateColumns="1fr 2fr" gap={6}>
                <GridItem>
                    <UpdateFormForDevSpecForTeamBattle
                        devSpec={devSpec}
                        teamId={teamId}
                    />
                </GridItem>

                <GridItem>
                    <FormControl>
                        <FormLabel display={"flex"} justifyContent={"space-between"}>
                            <Text>
                                Back-end Library
                            </Text>
                            <ModalButtonForAddItemToSpecificFieldForTeamDecSpec teamId={teamId} fieldName={"backendLibrary"} />

                        </FormLabel>
                        <HStack spacing={1}>
                            {backendLibrary.map((item, index) => (
                                <Tag
                                    size={"sm"}
                                    key={index}
                                    borderRadius='full'
                                    variant='solid'
                                    colorScheme='green'
                                >
                                    <TagLabel>{item}</TagLabel>
                                    <TagCloseButton onClick={() => removeFromBackendLibrary(index)} />
                                </Tag>
                            ))}
                        </HStack>
                    </FormControl>
                </GridItem>
            </Grid>

        </Box>
    );
};

export default DevSpecForm;
