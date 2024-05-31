import React, { useState, useEffect } from "react";
import {
    FormControl,
    FormLabel,
    HStack,
    Text,
    Button,
    IconButton,
    Spacer,
} from "@chakra-ui/react";
import { DevSpecRowForTeamBattle } from "@/types/typeForDevBattle";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import EditableInputForDevSpecForTeam from "../Input/EditableInputForDevSpecForTeam";


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
            <EditableInputForDevSpecForTeam
                label="backendLanguage"
                value={backendLanguage}
                onChange={setBackendLanguage}
                teamId={teamId}
            />

            <EditableInputForDevSpecForTeam
                label="frontendLanguage"
                value={frontendLanguage}
                onChange={setFrontendLanguage}
                teamId={teamId}
            />

            <EditableInputForDevSpecForTeam
                label="orm"
                value={orm}
                onChange={setOrm}
                teamId={teamId}
            />

            <EditableInputForDevSpecForTeam
                label="css"
                value={css}
                onChange={setCss}
                teamId={teamId}
            />

            <EditableInputForDevSpecForTeam
                label="app"
                value={app}
                onChange={setApp}
                teamId={teamId}
            />
        </>
    );
};

export default UpdateFormForDevSpecForTeamBattle;
