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
import useApiForUpdateForSpecificDevSpecForNotArryTypeForTeamBattle from "@/hooks/useApiForUpdateForSpecificDevSpecForNotArryTypeForTeamBattle";
import { CheckIcon, EditIcon, CloseIcon } from "@chakra-ui/icons";

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

    const handleCancelClick = () => {
        setEditMode(false);
    };

    const iconColor = useColorModeValue("gray.500", "gray.200");
    const labelBgColor = useColorModeValue("blue.100", "blue.700");

    return (
        <FormControl mb={4}>
            <FormLabel color="blue.500">{label}</FormLabel>
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
                    <>
                        <IconButton
                            icon={<CheckIcon />}
                            onClick={handleConfirmClick}
                            aria-label=""
                            colorScheme={iconColor}
                            size="xs"
                            variant="outline"
                        />
                        <IconButton
                            icon={<CloseIcon />}
                            onClick={handleCancelClick}
                            aria-label=""
                            colorScheme={iconColor}
                            size="xs"
                            variant="outline"
                        />
                    </>
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
