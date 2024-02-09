import React from 'react';
import { Button, Stack } from '@chakra-ui/react';
import { EmailIcon, ArrowForwardIcon } from '@chakra-ui/icons';

type Props = {};

const Buttons = (props: Props) => {
    return (
        <Stack direction='row' spacing={2} width={"80"} mt={3} mx={"auto"}>
            {/* 버튼1 */}
            <Button size='sm' variant='outline' leftIcon={<EmailIcon />} flex={1}>
                New Row
            </Button>
            {/* 버튼2 */}
            <Button size='sm' variant='outline' rightIcon={<ArrowForwardIcon />} flex={1}>
                Save
            </Button>
        </Stack>
    );
};

export default Buttons;
