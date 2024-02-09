import React, { useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";

interface props {

}

const PlanNoteContentList = ({ }: props) => {

    return (
        <Box w="98%" m={2}>
            <Grid templateColumns="7fr 3fr" gap={4}>
                <GridItem border={"1px solid green"}>
                    left
                </GridItem>
                <GridItem border={"1px solid green"}>
                    right
                </GridItem>
            </Grid>
        </Box>
    );
};

export default PlanNoteContentList;
