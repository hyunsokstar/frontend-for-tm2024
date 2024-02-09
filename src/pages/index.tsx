
import { RootState } from '@/store';
import { Box, Text, SimpleGrid, Button, LinkBox, Divider, HStack, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import NavigationMenuBoxForMainPage from '@/components/Menus/NaviMenuBoxMainPage';

const Home = () => {
    const loginUser = useSelector((state: RootState) => state.user.loginUser);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    console.log("loginUser : ", loginUser);

    const links1 = [
        { href: '/Test/Todos/TodosPageByReactDataGrid', text: 'todo 관리', visible: true },
    ];

    const links2 = [
        { href: '/Note/TechNoteList', text: 'Tech Note List', visible: true },
        { href: '/Note/SkilNoteContents/1/1', text: 'note contents sample', visible: true },
        { href: '/users/UserlistByDataGrid', text: 'user list', visible: true },
        { href: '/UserProfile/1', text: 'user profile sample', visible: true },
    ];

    const links3 = [
        { href: '/users', text: '회원 관리 (기본)', visible: true },
        { href: '/users/UserlistByDataGrid', text: '회원 관리(react-data-grid)', visible: true },
        { href: '/Test/AgGridBasic', text: '회원 관리(ag-grid)', visible: true },
        { href: `/UserProfile/${loginUser.id}`, text: 'User Postings', visible: isLoggedIn }, // 로그인 상태일 때만 보이도록 설정
        { href: '/payment', text: '결제(구현 예정)', visible: true },
    ];

    const links4 = [
        { href: '/Test/CardList/PostingList', text: '포스팅 리스트', visible: true },
    ];

    // todo list by react data grid 1227
    const links5 = [
        { href: '/Test/CardList/PostingList', text: 'react-data-grid 로 todo list 구현 하기', visible: true },
        { href: '/Test/ReactDataGrid/Basic/BasicDataGrid', text: 'Basic React Data Grid Component', visible: true },
        { href: '/Test/ReactDataGrid/Basic/DataGridWithSampleData', text: 'Basic Grid With Sample Data', visible: true },
        { href: '/Test/ReactDataGrid/GroupBy', text: 'Group By Sample Page', visible: true },
        { href: '/Test/ReactDataGrid/HeaderFilters', text: 'Header Filter Sample Page', visible: true },
        { href: '/Test/ReactDataGrid/TotalCount', text: 'TotalCount Sample Page', visible: true },
        { href: '/Test/ReactDataGrid/MasterDetail', text: 'MasterDetail Sample Page', visible: true },
        { href: '/Test/ReactDataGrid/RowReorder', text: 'row reorder Sample Page', visible: true },
    ];

    const links6 = [
        { href: '/Test/Todos/TodosPageByChakraUi', text: 'Todos By Chakra-ui Table', visible: true },
        { href: '/Test/Todos/TodosPageByReactDataGrid', text: 'Todos By React Data Grid', visible: true },
    ];

    const links7 = [
        { href: '/Test/CardList/PostingList', text: 'image upload (1)', visible: true },
    ];

    const links8 = [
        { href: '/Test/CardList/PostingList', text: 'image upload (2)', visible: true },
    ];

    const links9 = [
        { href: '/Test/CardList/PostingList', text: 'react-pro-sidebar (1)', visible: true },
    ];

    const links10 = [
        { href: '/Test/CardList/PostingList', text: 'react-pro-sidebar (2)', visible: true },
    ];

    const links11 = [
        { href: '/Test/CardList/PostingList', text: 'recharts (1)', visible: true },
    ];

    const links12 = [
        { href: '/Test/CardList/PostingList', text: 'recharts (2)', visible: true },
    ];

    const links13 = [
        { href: '/Test/Editor/EditorTest', text: 'slate-editor (1)', visible: true },
    ];

    const links14 = [
        { href: '/Test/Editor/EditorTest', text: 'slate-editor (1)', visible: true },
    ];

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <NavigationMenuBoxForMainPage links1={links1} links2={links2} menuTitle={'main 1'} menuBg={'orange.100'} menuColor={'black'} menuHover={'orange.200'} />
            {/* <NavigationMenuBoxForMainPage links1={links1} links2={links2} menuTitle={'boiler plate1 (회원 서비스)'} menuBg={'red.100'} menuColor={'black'} menuHover={'red.200'} /> */}
            <NavigationMenuBoxForMainPage links1={links5} links2={links6} menuTitle={'boiler plate3 (todo list)'} menuBg={'green.100'} menuColor={'black'} menuHover={'green.200'} />
            <NavigationMenuBoxForMainPage links1={links7} links2={links8} menuTitle={'todo list by ag grid'} menuBg={'blue.100'} menuColor={'black'} menuHover={'blue.200'} />
            <NavigationMenuBoxForMainPage links1={links3} links2={links4} menuTitle={'todo list by react table'} menuBg={'blue.100'} menuColor={'black'} menuHover={'blue.200'} />
            <NavigationMenuBoxForMainPage links1={links5} links2={links6} menuTitle={'recharts'} menuBg={'red.100'} menuColor={'black'} menuHover={'red.200'} />
            <NavigationMenuBoxForMainPage links1={links7} links2={links8} menuTitle={'image-upload'} menuBg={'orange.100'} menuColor={'black'} menuHover={'orange.200'} />
            <NavigationMenuBoxForMainPage links1={links9} links2={links10} menuTitle={'react-pro-sidebar'} menuBg={'purple.100'} menuColor={'black'} menuHover={'purple.200'} />
            <NavigationMenuBoxForMainPage links1={links11} links2={links12} menuTitle={'image-slide'} menuBg={'gray.100'} menuColor={'black'} menuHover={'gray.200'} />
            <NavigationMenuBoxForMainPage links1={links13} links2={links14} menuTitle={'slate-editor'} menuBg={'yellow.100'} menuColor={'black'} menuHover={'yellow.200'} />

            <Divider my={5} />
            <VStack gap={2}>
                <Box>story-book</Box>
                <Box>image-slide</Box>
                <Box>figma</Box>
                <Box>일정 관리</Box>
                <Box>데이터 분석</Box>
                <Box>nestjs</Box>
                <Box>nextjs</Box>
                <Box>react-table</Box>
                <Box>layout</Box>
                <Box>chatting</Box>
                <Box>payment</Box>
                <Box>spring-boot</Box>
                <Box>fastapi</Box>
                <Box>rust</Box>
                <Box>golang</Box>
                <Box>aws</Box>
                <Box>docker</Box>
                <Box>authentication</Box>
                <Box>story book</Box>
                <Box>terraform</Box>
                <Box>msa</Box>
                <Box>쿠버네티스</Box>
                <Box>english</Box>
                <Box>math</Box>
                <Box>AI</Box>
                <Box>기술 동향 보고서</Box>
                <Box>3D UI</Box>
                <Box>데이터 시각화</Box>
                <Box>동시성 프로그래밍</Box>
                <Box>성능 최적화</Box>
            </VStack>
        </Box>
    );
};

export default Home;
