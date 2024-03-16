// frontend-tm2024\src\pages\index.tsx
'use client'
import { RootState } from '@/store';
import { Box, Text, SimpleGrid, Button, LinkBox, Divider, HStack, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const Home = () => {
    const loginUser = useSelector((state: RootState) => state.user.loginUser);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    const portOneShopId = process.env.PORTONE_SHOP_ID || 'portOneShopIdNotDefined';
    // const portOneApiKey = process.env.PORTONE_API_KEY || 'portOneApiKeyNotDefined';
    // const portOneApiSecret = process.env.PORTONE_API_SECRET || 'portOneApiSecretNotDefined';
    console.log("portOneShopId : ", portOneShopId);


    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            기본 페이지
        </Box>
    );
};

export default Home;
