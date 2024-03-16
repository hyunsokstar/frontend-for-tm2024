import React from "react";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi"; // 로그아웃 아이콘 사용 예시
import useUser from "@/hooks/useUser";
import ModalButtonForLogin from "./Modal/ModalButtonForLogin";
import ModalButtonForAddUser from "./Modal/ModalButtonForAddUser";
import { useRouter } from "next/router"; // Next.js의 useRouter 사용

const HeaderMenus = () => {
    const router = useRouter(); // Next.js의 useRouter 훅 사용
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
        >
            <Box>
                <Box display={"flex"} gap={5} px={2}>
                    <Link
                        href="/"
                        color={router.pathname === "/" ? "#4267B2" : "inherit"}
                        fontWeight={router.pathname === "/" ? "bold" : "normal"}
                    >
                        Home
                    </Link>
                    <Link
                        href="/todos/todoListForEntry"
                        color={router.pathname.includes("/todos/todoListForEntry") ? "#4267B2" : "inherit"}
                        fontWeight={router.pathname.includes("/todos/todoListForEntry") ? "bold" : "normal"}
                    >
                        Todo(Entry)
                    </Link>
                    <Link
                        href="/Test/Todos/TodosPageByReactDataGrid"
                        color={router.pathname.includes("/Test/Todos") ? "#4267B2" : "inherit"}
                        fontWeight={router.pathname.includes("/Test/Todos") ? "bold" : "normal"}
                    >
                        Todo(Ready To Complete)
                    </Link>

                    <Link
                        href="/Note/RoadMap/RoadMapContainer"
                        color={router.pathname.includes("/Note/RoadMap/RoadMapContainer") ? "#4267B2" : "inherit"}
                        fontWeight={router.pathname.includes("/Note/RoadMap/RoadMapContainer") ? "bold" : "normal"}
                    >
                        RoadMap
                    </Link>

                    <Link
                        href="/Note/TechNoteList"
                        color={router.pathname.includes("/Note/TechNoteList") ? "#4267B2" : "inherit"}
                        fontWeight={router.pathname.includes("/Note/TechNoteList") ? "bold" : "normal"}
                    >
                        Tech Note
                    </Link>
                    <Link
                        href="/Note/SkilNoteList"
                        color={router.pathname.includes("/Note/SkilNoteList") ? "#4267B2" : "inherit"}
                        fontWeight={router.pathname.includes("/Note/SkilNoteList") ? "bold" : "normal"}
                    >
                        Skil Note
                    </Link>
                    <Link
                        href="/Note/ShortCutList"
                        color={router.pathname.includes("/Note/ShortCutList") ? "#4267B2" : "inherit"}
                        fontWeight={router.pathname.includes("/Note/ShortCutList") ? "bold" : "normal"}
                    >
                        ShortCuts
                    </Link>
                    <Link
                        href="/users/UserlistByDataGrid"
                        color={router.pathname.includes("/users/UserlistByDataGrid") ? "#4267B2" : "inherit"}
                        fontWeight={router.pathname.includes("/users/UserlistByDataGrid") ? "bold" : "normal"}
                    >
                        유저 관리
                    </Link>
                    {/* StarterKits\StarterKitList.tsx */}

                    <Link
                        href="/StarterKits/StarterKitList"
                        color={router.pathname.includes("/StarterKits/StarterKitList") ? "#4267B2" : "inherit"}
                        fontWeight={router.pathname.includes("/StarterKits/StarterKitList") ? "bold" : "normal"}
                    >
                        StarterKit
                    </Link>
                    <Link
                        href="/buyPoints"
                        color={router.pathname.includes("/buyPoints") ? "#4267B2" : "inherit"}
                        fontWeight={router.pathname.includes("/buyPoints") ? "bold" : "normal"}
                    >
                        결제(Test)
                    </Link>

                </Box>

            </Box>
            {isLoggedIn ? (
                <Flex alignItems="center">
                    <Box fontSize="sm" fontWeight="bold">
                        안녕하세요,{' '}
                        <Link href={`/UserProfile/${loginUser.id}`}>
                            <a>{loginUser.email}님</a>
                        </Link>
                        {/* {loginUser.id} */}
                    </Box>
                    <Button
                        variant="outline"
                        size="sm"
                        colorScheme="blue"
                        borderColor="#4267B2"
                        leftIcon={<FiLogOut />}
                        ml={2}
                        onClick={logout} // 로그아웃 함수 연결
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
