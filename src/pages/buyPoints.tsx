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