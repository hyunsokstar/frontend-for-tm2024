import React from 'react';
import { Box, Flex, Checkbox, Skeleton } from "@chakra-ui/react";

type Props = {}

const SkeletonForBoard = (props: Props) => {
    return (
        <Box>
            {[1, 2, 3, 4, 5].map((item) => (
                <Flex key={item} align="center" justify="space-between" my={2}>
                    <Checkbox isChecked={false} isDisabled />
                    <Flex direction="column" flex="1" ml={2}>
                        <Skeleton height="20px" mb={1} />
                        <Skeleton height="16px" />
                    </Flex>
                    <Skeleton height="30px" width="80px" />
                </Flex>
            ))}
        </Box>
    );
}

export default SkeletonForBoard;
