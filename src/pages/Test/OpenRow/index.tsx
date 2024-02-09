import { Box, Button, Collapse, useDisclosure } from "@chakra-ui/react"

export default function CollapseEx() {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <>
            <Button onClick={onToggle}>Click Me</Button>
            <Collapse in={isOpen} animateOpacity>
                <Box
                    p='40px'
                    color='white'
                    mt='4'
                    bg='teal.500'
                    rounded='md'
                    shadow='md'
                >
                    Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis.
                </Box>
            </Collapse>
        </>
    )
}