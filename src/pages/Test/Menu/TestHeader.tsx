import { Box, Link } from '@chakra-ui/react'
import React from 'react'

type Props = {}

// 헤더 메뉴 만들기
// 127.0.0.1:3000/Test/Menu/TestHeader
const TestHeader = (props: Props) => {
    return (
        <Box>
            <Box display={"flex"} gap={5} px={2}>
                <Link href="/" color="#4267B2" _hover={{ textDecoration: "none" }}>
                    Home
                </Link>
                <Link href="/Test/Todos/TodosPageByReactDataGrid" color="#4267B2" _hover={{ textDecoration: "none" }}>
                    Todo
                </Link>
                <Link href="/Note/TechNoteList" color="#4267B2" _hover={{ textDecoration: "none" }}>
                    Tech Note
                </Link>
            </Box>
        </Box>
    )
}

export default TestHeader