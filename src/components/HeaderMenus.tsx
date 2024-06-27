import React from "react";
import { Box, Button, Flex, Link, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { FiLogOut, FiChevronDown } from "react-icons/fi";
import useUser from "@/hooks/useUser";
import ModalButtonForLogin from "./Modal/ModalButtonForLogin";
import ModalButtonForAddUser from "./Modal/ModalButtonForAddUser";
import { useRouter } from "next/router";

const HeaderMenus = () => {
    const router = useRouter();
    const { isLoggedIn, loginUser, logout } = useUser();

    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            my={2}
            height="60px"
            bg="ButtonFace"
            color="black"
            p={2}
            borderRadius="md"
            boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.1)"
            fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        >
            <Flex alignItems="center" gap={4}>
                <Link
                    href="/"
                    color={router.pathname === "/" ? "#4267B2" : "inherit"}
                    fontWeight={router.pathname === "/" ? "bold" : "normal"}
                    p={2}
                    height="40px"
                    display="flex"
                    alignItems="center"
                    _hover={{ bg: "gray.100" }}
                    borderRadius="md"
                >
                    Home
                </Link>
                <Link
                    href="/todos/todoListForEntry"
                    color={router.pathname.includes("/todos/todoListForEntry") ? "#4267B2" : "inherit"}
                    fontWeight={router.pathname.includes("/todos/todoListForEntry") ? "bold" : "normal"}
                    p={2}
                    height="40px"
                    display="flex"
                    alignItems="center"
                    _hover={{ bg: "gray.100" }}
                    borderRadius="md"
                >
                    Todo(Entry)
                </Link>
                <Link
                    href="/Test/Todos/TodosPageByReactDataGrid"
                    color={router.pathname.includes("/Test/Todos") ? "#4267B2" : "inherit"}
                    fontWeight={router.pathname.includes("/Test/Todos") ? "bold" : "normal"}
                    p={2}
                    height="40px"
                    display="flex"
                    alignItems="center"
                    _hover={{ bg: "gray.100" }}
                    borderRadius="md"
                >
                    Todo(ready)
                </Link>
                <Link
                    href="/Note/RoadMap/RoadMapContainer"
                    color={router.pathname.includes("/Note/RoadMap/RoadMapContainer") ? "#4267B2" : "inherit"}
                    fontWeight={router.pathname.includes("/Note/RoadMap/RoadMapContainer") ? "bold" : "normal"}
                    p={2}
                    height="40px"
                    display="flex"
                    alignItems="center"
                    _hover={{ bg: "gray.100" }}
                    borderRadius="md"
                >
                    RoadMap
                </Link>
                <Link
                    href="/Note/TechNoteList"
                    color={router.pathname.includes("/Note/TechNoteList") ? "#4267B2" : "inherit"}
                    fontWeight={router.pathname.includes("/Note/TechNoteList") ? "bold" : "normal"}
                    p={2}
                    height="40px"
                    display="flex"
                    alignItems="center"
                    _hover={{ bg: "gray.100" }}
                    borderRadius="md"
                >
                    Tech Note
                </Link>
                <Link
                    href="/Note/SkilNoteList"
                    color={router.pathname.includes("/Note/SkilNoteList") ? "#4267B2" : "inherit"}
                    fontWeight={router.pathname.includes("/Note/SkilNoteList") ? "bold" : "normal"}
                    p={2}
                    height="40px"
                    display="flex"
                    alignItems="center"
                    _hover={{ bg: "gray.100" }}
                    borderRadius="md"
                >
                    Skil Note
                </Link>
                <Link
                    href="/Note/ShortCutList"
                    color={router.pathname.includes("/Note/ShortCutList") ? "#4267B2" : "inherit"}
                    fontWeight={router.pathname.includes("/Note/ShortCutList") ? "bold" : "normal"}
                    p={2}
                    height="40px"
                    display="flex"
                    alignItems="center"
                    _hover={{ bg: "gray.100" }}
                    borderRadius="md"
                >
                    ShortCuts
                </Link>

                <Menu>
                    <MenuButton
                        as={Button}
                        rightIcon={<FiChevronDown />}
                        height="40px"
                        fontWeight="normal"
                        bg="transparent"
                        _hover={{ bg: "gray.100" }}
                        _active={{ bg: "gray.200" }}
                    >
                        유저 관리
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => router.push('/users/UsersByDataGrid')}>
                            유저 목록(data-grid)
                        </MenuItem>
                        <MenuItem onClick={() => router.push('/users/UsersByCardList')}>
                            유저 목록(Card List)
                        </MenuItem>
                    </MenuList>
                </Menu>

                <Link
                    href="/buyPoints"
                    color={router.pathname.includes("/buyPoints") ? "#4267B2" : "inherit"}
                    fontWeight={router.pathname.includes("/buyPoints") ? "bold" : "normal"}
                    p={2}
                    height="40px"
                    display="flex"
                    alignItems="center"
                    _hover={{ bg: "gray.100" }}
                    borderRadius="md"
                >
                    결제(Test)
                </Link>
                <Link
                    href="/DevSpecSurvey"
                    color={router.pathname.includes("/DevSpecSurvey") ? "#4267B2" : "inherit"}
                    fontWeight={router.pathname.includes("/DevSpecSurvey") ? "bold" : "normal"}
                    p={2}
                    height="40px"
                    display="flex"
                    alignItems="center"
                    _hover={{ bg: "gray.100" }}
                    borderRadius="md"
                >
                    Dev Spec Survey
                </Link>
                <Link
                    href="/WebSkil"
                    color={router.pathname.includes("/WebSkil") ? "#4267B2" : "inherit"}
                    fontWeight={router.pathname.includes("/WebSkil") ? "bold" : "normal"}
                    p={2}
                    height="40px"
                    display="flex"
                    alignItems="center"
                    _hover={{ bg: "gray.100" }}
                    borderRadius="md"
                >
                    Web Skil
                </Link>
                <Link
                    href="/DevBattle"
                    color={router.pathname.includes("/DevBattle") ? "#4267B2" : "inherit"}
                    fontWeight={router.pathname.includes("/DevBattle") ? "bold" : "normal"}
                    p={2}
                    height="40px"
                    display="flex"
                    alignItems="center"
                    _hover={{ bg: "gray.100" }}
                    borderRadius="md"
                >
                    Dev Battle
                </Link>
                <Link
                    href="/global-chat-rooms"
                    color={router.pathname.includes("/global-chat-rooms") ? "#4267B2" : "inherit"}
                    fontWeight={router.pathname.includes("/global-chat-rooms") ? "bold" : "normal"}
                    p={2}
                    height="40px"
                    display="flex"
                    alignItems="center"
                    _hover={{ bg: "gray.100" }}
                    borderRadius="md"
                >
                    ChatRoom
                </Link>
            </Flex>
            {isLoggedIn ? (
                <Flex alignItems="center">
                    <Box fontSize="sm" fontWeight="bold">
                        <Link href={`/UserProfile/${loginUser.id}`}>
                            <a>{loginUser.email}님</a>
                        </Link>
                        <Link href="/PaymentHistory">
                            <a target="_blank">({loginUser.cashPoints} 원)</a>
                        </Link>
                    </Box>
                    <Button
                        variant="outline"
                        size="sm"
                        colorScheme="blue"
                        borderColor="#4267B2"
                        leftIcon={<FiLogOut />}
                        ml={2}
                        onClick={logout}
                    >
                        로그아웃
                    </Button>
                </Flex>
            ) : (
                <Box display={"flex"} gap={2}>
                    <ModalButtonForLogin buttonText="로그인" />
                    <ModalButtonForAddUser buttonText={'회원 가입'} />
                </Box>
            )}
        </Flex>
    );
};

export default HeaderMenus;