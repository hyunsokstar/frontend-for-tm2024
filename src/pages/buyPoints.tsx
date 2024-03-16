// pages/buyPoints.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Input, Heading, Flex } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

declare global {
    interface Window {
        IMP: any;
    }
}

const BuyPointsPage: React.FC = () => {
    const router = useRouter();
    const [points, setPoints] = useState<number>(0);

    const [merchantUid, setMerchantUid] = useState<string>(uuidv4()); // UUID 생성 및 상태 관리

    const handleBuyPoints = () => {
        try {
            // 포인트를 구매하는 로직을 구현
            const IMP = window.IMP;
            const code = process.env.PORTONE_SHOP_ID;
            IMP.init(code);

            const payment_props = {
                "merchant_uid": merchantUid, // UUID 사용
                "name": "tm2024_point",
                "amount": points, // 입력한 포인트 값을 amount에 설정
            }

            IMP.request_pay(payment_props, function (response: any) {
                router.push("/"); // 홈페이지로 이동
                console.log("결제 후 resposne check !");
                console.log("response : ", response);

            });
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <Flex direction="column" alignItems="center">
            <Box p={4}>
                <Heading size="md" mb={4}>포인트 구매 페이지</Heading>
                <Flex alignItems="center">
                    <Input
                        type="number"
                        value={points}
                        onChange={(e) => setPoints(parseInt(e.target.value))}
                        placeholder="구매할 포인트를 입력하세요"
                        mr={2}
                    />
                    <Button onClick={handleBuyPoints} colorScheme="blue">
                        포인트 구매
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
};

export default BuyPointsPage;