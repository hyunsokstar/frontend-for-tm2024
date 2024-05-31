import React, { useState } from "react";
import {
    HStack,
    Input,
    Text,
    IconButton,
    Spacer,
    useColorModeValue,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import useApiForUpdateForSpecificDevSpecForNotArryTypeForTeamBattle from "@/hooks/useApiForUpdateForSpecificDevSpecForNotArryTypeForTeamBattle";

type Props = {
    value: string;
    onChange: (value: string) => void;
    label: string;
    teamId: number;
};

const EditableInputForDevSpecForTeam = ({
    value,
    onChange,
    label,
    teamId,
}: Props) => {
    const [editMode, setEditMode] = useState(false);
    const mutationForUpdateForSpecificDevSpecForNotArryTypeForTeamBattle = useApiForUpdateForSpecificDevSpecForNotArryTypeForTeamBattle();

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleConfirmClick = () => {
        setEditMode(false);
        mutationForUpdateForSpecificDevSpecForNotArryTypeForTeamBattle.mutate({ teamId, fieldName: label, itemText: value });
    };

    const iconColor = useColorModeValue("gray.500", "gray.200");

    return (
        <FormControl mb={2}>
            <FormLabel>{label}</FormLabel>
            <HStack>
                {editMode ? (
                    <Input
                        size="xs"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    />
                ) : (
                    <Text>{value}</Text>
                )}
                <Spacer />
                {editMode ? (
                    <IconButton
                        icon={<CheckIcon />}
                        onClick={handleConfirmClick}
                        aria-label=""
                        colorScheme={iconColor}
                        size="xs"
                        variant="outline"
                    />
                ) : (
                    <IconButton
                        icon={<EditIcon />}
                        onClick={handleEditClick}
                        aria-label=""
                        colorScheme={iconColor}
                        size="xs"
                        variant="outline"
                    />
                )}
            </HStack>
        </FormControl>
    );
};

export default EditableInputForDevSpecForTeam;
