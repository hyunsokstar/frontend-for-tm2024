import React from "react";
import {
    FormControl,
    FormLabel,
    HStack,
    Tag,
    TagLabel,
    TagCloseButton,
    Text,
    Box,
} from "@chakra-ui/react";
import ModalButtonForAddItemToSpecificFieldForTeamDecSpec from "../Modal/ModalButtonForAddItemToSpecificFieldForTeamDecSpec";

type Props = {
    fieldName: string;
    items: string[] | null;
    onRemove: (index: number) => void;
    teamId: number;
};

const UpdateFieldFormForDevSpecForArrayFieldForDevTeam = ({
    fieldName,
    items,
    onRemove,
    teamId,
}: Props) => {
    return (
        <Box width={"100%"} border={"0px solid green"}>
            <FormControl>
                <FormLabel display={"flex"} justifyContent={"space-between"}>
                    <Text>{fieldName}</Text>
                    <ModalButtonForAddItemToSpecificFieldForTeamDecSpec
                        teamId={teamId}
                        fieldName={fieldName}
                    />
                </FormLabel>
                <HStack spacing={1} flexWrap="wrap">
                    {items?.map((item, index) => (
                        <Tag size={"sm"} key={index} borderRadius="full" variant="solid" colorScheme="green">
                            <TagLabel>{item}</TagLabel>
                            <TagCloseButton onClick={() => onRemove(index)} />
                        </Tag>
                    ))}
                </HStack>
            </FormControl>
        </Box>
    );
};

export default UpdateFieldFormForDevSpecForArrayFieldForDevTeam;
