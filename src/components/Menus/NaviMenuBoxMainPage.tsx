import { Box, Button, SimpleGrid, Text } from '@chakra-ui/react'
import Link from 'next/link';
import React from 'react'

interface Link {
    href: string;
    text: string;
    visible: boolean;
}

type Props = {
    links1: Link[];
    links2: Link[];
    menuTitle: string;
    menuBg: string;
    menuColor: string;
    menuHover: string;
}

const NavigationMenuBoxForMainPage = ({
    links1,
    links2,
    menuTitle,
    menuBg,
    menuColor,
    menuHover
}: Props) => {
    return (
        <>
            <Text my={3} mt={10}> {menuTitle} <Button variant={"outline"} size={"sm"}>note</Button> </Text>

            <SimpleGrid
                columns={2}
                width="80%"
                margin="auto"
                mt={2}
                border="2px solid red"
                px={2}
                gap={2}
            >
                <Box>
                    {links1.map((link, index) => (
                        link.visible && ( // visible이 true일 때만 렌더링
                            <Link key={index} href={link.href}>
                                <Box
                                    width="100%"
                                    p={4}
                                    my={2}
                                    borderRadius="md"
                                    bg={menuBg}
                                    color={menuColor}
                                    textAlign="center"
                                    _hover={{ bg: `${menuHover}` }}
                                    cursor="pointer"
                                >
                                    <Text>{link.text}</Text>
                                </Box>
                            </Link>
                        )
                    ))}
                </Box>
                <Box>
                    {links2.map((link, index) => (
                        link.visible && ( // visible이 true일 때만 렌더링
                            <Link key={index} href={link.href}>
                                <Box
                                    width="100%"
                                    p={4}
                                    my={2}
                                    borderRadius="md"
                                    bg={menuBg}
                                    color={menuColor}
                                    textAlign="center"
                                    _hover={{ bg: `${menuHover}` }}
                                    cursor="pointer"
                                >
                                    <Text>{link.text}</Text>
                                </Box>
                            </Link>
                        )
                    ))}
                </Box>
            </SimpleGrid>
        </>
    )
}

export default NavigationMenuBoxForMainPage