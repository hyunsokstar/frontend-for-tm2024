import React, { useState, useEffect } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Tag,
    TagLabel,
    TagCloseButton,
    useColorModeValue,
    HStack,
    Text,
    Divider,
} from "@chakra-ui/react";
import ModalButtonForAddItemToSpecificFieldForTeamDecSpec from "../Modal/ModalButtonForAddItemToSpecificFieldForTeamDecSpec";
import UpdateFormForDevSpecForTeamBattle from "./UpdateFormForDevSpecForTeamBattle";
import UpdateFieldFormForDevSpecForArrayFieldForDevTeam from "./UpdateFieldFormForDevSpecForArrayFieldForDevTeam";
import { DevSpecRowForTeamBattle } from "@/types/typeForDevBattle";

type Props = {
    teamId: number;
    onUpdate: (
        backendLanguage: string,
        frontendLanguage: string,
        orm: string,
        css: string,
        app: string,
        backendLibrary: string[] | null,
        frontendLibrary: string[] | null,
        collaborationTool: string[] | null,
        devops: string[] | null,
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
    const [frontendLibrary, setFrontendLibrary] = useState<string[]>([]);
    const [collaborationTool, setCollaborationTool] = useState<string[]>([]);
    const [devops, setDevops] = useState<string[]>([]);

    useEffect(() => {
        if (devSpec) {
            setBackendLanguage(devSpec.backendLanguage || "");
            setFrontendLanguage(devSpec.frontendLanguage || "");
            setOrm(devSpec.orm || "");
            setCss(devSpec.css || "");
            setApp(devSpec.app || "");
            setBackendLibrary(devSpec.backendLibrary || []);
            setFrontendLibrary(devSpec.frontendLibrary || []);
            setCollaborationTool(devSpec.collaborationTool || []);
            setDevops(devSpec.devops || []);
        }
    }, [devSpec]);

    const removeFromBackendLibrary = (index: number) => {
        setBackendLibrary(backendLibrary.filter((_, i) => i !== index));
    };

    const removeFromFrontendLibrary = (index: number) => {
        setFrontendLibrary(frontendLibrary.filter((_, i) => i !== index));
    };

    const removeFromCollaborationTool = (index: number) => {
        setCollaborationTool(collaborationTool.filter((_, i) => i !== index));
    };

    const removeFromDevops = (index: number) => {
        setDevops(devops.filter((_, i) => i !== index));
    };

    return (
        <Box>
            <Grid templateColumns="1fr 0fr 2fr" gap={3}>
                <GridItem padding="0 2px">
                    <UpdateFormForDevSpecForTeamBattle
                        devSpec={devSpec}
                        teamId={teamId}
                    />
                </GridItem>
                <GridItem mx={2}>
                    <Divider orientation="vertical" />
                </GridItem>
                <GridItem display={"flex"} flexDirection={"column"} gap={3}>
                    <UpdateFieldFormForDevSpecForArrayFieldForDevTeam
                        teamId={teamId}
                        fieldName="backendLibrary"
                        items={backendLibrary}
                        onRemove={removeFromBackendLibrary}
                    />
                    <UpdateFieldFormForDevSpecForArrayFieldForDevTeam
                        teamId={teamId}
                        fieldName="frontendLibrary"
                        items={frontendLibrary}
                        onRemove={removeFromFrontendLibrary}
                    />
                    <UpdateFieldFormForDevSpecForArrayFieldForDevTeam
                        teamId={teamId}
                        fieldName="collaborationTool"
                        items={collaborationTool}
                        onRemove={removeFromCollaborationTool}
                    />
                    <UpdateFieldFormForDevSpecForArrayFieldForDevTeam
                        teamId={teamId}
                        fieldName="devops"
                        items={devops}
                        onRemove={removeFromDevops}
                    />
                </GridItem>
            </Grid>
        </Box>
    );
};

export default DevSpecForm;

