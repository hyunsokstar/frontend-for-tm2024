import React, { useState } from "react";
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
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import ModalButtonForAddLibrary from "../Modal/ModalButtonForAddLibrary";

type Props = {
    teamId: number;
    onUpdate: (
        backendLanguage: string,
        frontendLanguage: string,
        orm: string,
        css: string,
        app: string,
        backendLibrary: string[]
    ) => void;
};

const DevSpecForm = ({ teamId, onUpdate }: Props) => {
    const [backendLanguage, setBackendLanguage] = useState("");
    const [frontendLanguage, setFrontendLanguage] = useState("");
    const [orm, setOrm] = useState("");
    const [css, setCss] = useState("");
    const [app, setApp] = useState("");
    const [backendLibrary, setBackendLibrary] = useState<string[]>(["docker", "Kubernetes"]);

    const handleUpdate = () => {
        onUpdate(
            backendLanguage,
            frontendLanguage,
            orm,
            css,
            app,
            backendLibrary
        );
    };

    const removeFromBackendLibrary = (index: number) => {
        setBackendLibrary(backendLibrary.filter((_, i) => i !== index));
    };

    // Generate an array of random colors
    const tagColors = Array.from({ length: backendLibrary.length }, () => useColorModeValue("pink.500", "pink.200"));

    return (
        <Box>
            <Grid templateColumns="1fr 1fr" gap={6}> {/* Modify templateColumns prop here */}
                <GridItem>
                    <FormControl mb={4}>
                        <FormLabel>Back-end Language</FormLabel>
                        <Input
                            size="xs"
                            value={backendLanguage}
                            onChange={(e) => setBackendLanguage(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Front-end Language</FormLabel>
                        <Input
                            size="xs"
                            value={frontendLanguage}
                            onChange={(e) => setFrontendLanguage(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>ORM</FormLabel>
                        <Input
                            size="xs"
                            value={orm}
                            onChange={(e) => setOrm(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>CSS</FormLabel>
                        <Input
                            size="xs"
                            value={css}
                            onChange={(e) => setCss(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>App</FormLabel>
                        <Input
                            size="xs"
                            value={app}
                            onChange={(e) => setApp(e.target.value)}
                        />
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl>
                        <FormLabel display={"flex"} justifyContent={"space-between"}>
                            <Text>
                                Back-end Library
                            </Text>

                            <ModalButtonForAddLibrary teamId={teamId} fieldName={"backendLibrary"} />

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
            <Box mt={4}>
                <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
                    Update
                </Button>
            </Box>
        </Box>
    );
};

export default DevSpecForm;
