import React, { useState, useEffect } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    HStack,
    Text,
    Button,
} from "@chakra-ui/react";
import { DevSpecRowForTeamBattle } from "@/types/typeForDevBattle";

type Props = {
    teamId: number;
    devSpec: DevSpecRowForTeamBattle | undefined;
};

const UpdateFormForDevSpecForTeamBattle = ({ teamId, devSpec }: Props) => {
    const [backendLanguage, setBackendLanguage] = useState("");
    const [frontendLanguage, setFrontendLanguage] = useState("");
    const [orm, setOrm] = useState("");
    const [css, setCss] = useState("");
    const [app, setApp] = useState("");

    console.log("devSpec for updateform: ", devSpec);


    useEffect(() => {
        if (devSpec) {
            setBackendLanguage(devSpec.backendLanguage || "");
            setFrontendLanguage(devSpec.frontendLanguage || "");
            setOrm(devSpec.orm || "");
            setCss(devSpec.css || "");
            setApp(devSpec.app || "");
        }
    }, [devSpec]);

    return (
        <>
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
        </>
    );
};

export default UpdateFormForDevSpecForTeamBattle;
