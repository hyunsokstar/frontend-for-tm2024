// pages/buyPoints.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
    Box,
    Button,
    Input,
    Heading,
    Flex,
    useToast,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import useUser from '@/hooks/useUser';
import ModalButtonForConfirmBuyPoint from '../../ModalButtonForConfirmBuyPoint';

declare global {
    interface Window {
        IMP: any;
    }
}

const BuyPointsPage: React.FC = () => {
    const router = useRouter();
    const toast = useToast();

    const [purchaseAmountForPoints, setPurchaseAmountForPoints] = useState<number>(0);
    const { isLoggedIn, loginUser, logout } = useUser();

    console.log("loginUser : ", loginUser);


    const [merchantUid, setMerchantUid] = useState<string>(uuidv4()); // UUID 생성 및 상태 관리

    const handleBuyPoints = () => {
        // todo : isLoggedIn 이 false 이면 로그인 해주세요 chakra-ui toast message + return 

        if (!isLoggedIn) {
            // 사용자가 로그인되어 있지 않은 경우
            // Chakra UI toast message를 사용하여 메시지를 표시합니다.
            toast({
                title: "로그인 필요",
                description: "포인트를 구매하려면 먼저 로그인이 필요합니다.",
                status: "error",
                duration: 3000, // 3초 동안 메시지 표시
                isClosable: true,
            });
            return; // 로그인되어 있지 않으므로 더 이상 진행하지 않습니다.
        }

        if (purchaseAmountForPoints === 0) {
            // 구매할 포인트가 0인 경우
            // Chakra UI toast message를 사용하여 메시지를 표시합니다.
            toast({
                title: "구매할 포인트 입력 필요",
                description: "구매할 포인트를 입력해주세요. 0 원 이상의 포인트를 구매할 수 있습니다.",
                status: "warning",
                duration: 3000, // 3초 동안 메시지 표시
                position: "top",
                isClosable: true,
            });
            return; // 구매할 포인트가 없으므로 더 이상 진행하지 않습니다.
        }

        // purchaseAmountForPoints 가 0 일 경우 0 원이상 구매해 주세요

        try {
            // 포인트를 구매하는 로직을 구현
            const IMP = window.IMP;
            const code = process.env.PORTONE_SHOP_ID;
            IMP.init(code);

            const payment_props = {
                "merchant_uid": merchantUid, // UUID 사용
                "name": "tm2024_point",
                "amount": purchaseAmountForPoints, // 입력한 포인트 값을 amount에 설정
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
                        value={purchaseAmountForPoints}
                        onChange={(e) => setPurchaseAmountForPoints(parseInt(e.target.value))}
                        placeholder="구매할 포인트를 입력하세요"
                        mr={2}
                    />
                    {/* <Button onClick={handleBuyPoints} colorScheme="blue">
                        포인트 구매
                    </Button> */}
                    <ModalButtonForConfirmBuyPoint
                        button_text={'구매'}
                        cashPointsToBuy={purchaseAmountForPoints}
                        isLoggedIn={isLoggedIn}
                        setPurchaseAmountForPoints={setPurchaseAmountForPoints}
                    />
                </Flex>
            </Box>
        </Flex>
    );
};

export default BuyPointsPage;