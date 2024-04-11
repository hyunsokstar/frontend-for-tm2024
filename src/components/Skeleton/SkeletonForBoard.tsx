import React from 'react';
import { Box, Flex, Checkbox, Skeleton } from "@chakra-ui/react";

type Props = {}

const SkeletonForBoard = (props: Props) => {
    return (
        <Box>
            {[1, 2, 3, 4, 5].map((item) => (
                <Flex key={item} align="center" justify="space-between" my={2} gap={2}>
                    <Checkbox isChecked={false} isDisabled />
                    <Flex direction="column" flex="1" mx={2}>
                        <Skeleton height="20px" mb={1} />
                    </Flex>
                    <Skeleton height="20px" width="80px" />
                    <Skeleton height="20px" width="80px" />
                    <Skeleton height="20px" width="80px" />
                    <Skeleton height="20px" width="80px" />
                    <Skeleton height="20px" width="80px" />
                </Flex>
            ))}
        </Box>
    );
}

export default SkeletonForBoard;
