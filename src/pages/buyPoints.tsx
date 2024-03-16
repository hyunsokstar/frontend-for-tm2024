// pages/buyPoints.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Input, Heading, Flex } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

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
                "merchant_uid": merchantUid + "tm2024", // UUID 사용
                "name": "tm2024 point",
                "amount": points, // 입력한 포인트 값을 amount에 설정
            }

            IMP.request_pay(payment_props, function (response: any) {
                // 결제 완료 후 처리할 로직 작성
                location.href = "127.0.0.1:3000/";
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