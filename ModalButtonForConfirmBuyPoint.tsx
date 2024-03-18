import React, { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useToast } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import useApiForUpdateUserCashPoints from '@/hooks/useApiForUpdateUserCashPoints';


type Props = {
    button_text: string;
    cashPointsToBuy: number;
    isLoggedIn: boolean; // Whether the user is logged in
    setPurchaseAmountForPoints: React.Dispatch<React.SetStateAction<number>>;
};

const ModalButtonForConfirmBuyPoint: React.FC<Props> = ({ button_text, cashPointsToBuy, isLoggedIn, setPurchaseAmountForPoints }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toast = useToast();
    const [merchantUid, setMerchantUid] = useState<string>(uuidv4()); // UUID 생성 및 상태 관리
    const updateUserCashPointsMutation = useApiForUpdateUserCashPoints();


    const handleConfirm = () => {
        if (!isLoggedIn) {
            // 사용자가 로그인되어 있지 않은 경우
            toast({
                title: "로그인 필요",
                description: "포인트를 구매하려면 먼저 로그인이 필요합니다.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (cashPointsToBuy === 0) {
            // 구매할 포인트가 0인 경우
            toast({
                title: "구매할 포인트 입력 필요",
                description: "구매할 포인트를 입력해주세요. 0 원 이상의 포인트를 구매할 수 있습니다.",
                status: "warning",
                duration: 3000,
                position: "top",
                isClosable: true,
            });
            return;
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
                "amount": cashPointsToBuy, // 입력한 포인트 값을 amount에 설정
            }

            IMP.request_pay(payment_props, function (response: any) {
                // router.push("/"); // 홈페이지로 이동
                console.log("결제 후 resposne check !");
                console.log("response : ", response);

                if (response.success) {
                    updateUserCashPointsMutation.mutate({ cashPointsToBuy: response.paid_amount })

                    // toast({
                    //     title: "point 구매 성공",
                    //     description: `${response.paid_amount} 원을 결제 성공 !`,
                    //     status: "warning",
                    //     duration: 3000,
                    //     position: "top",
                    //     isClosable: true,
                    // });

                    setPurchaseAmountForPoints(0)
                    setIsOpen(false);

                    // 새로운 UUID 생성하여 merchantUid 상태 업데이트
                    const newMerchantUid = uuidv4();
                    setMerchantUid(newMerchantUid);
                }

            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Button colorScheme="teal" variant="outline" onClick={() => setIsOpen(true)} size="md">
                {button_text}
            </Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>구매 확인</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {cashPointsToBuy} 포인트를 구매하시겠습니까?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={handleConfirm}>
                            Yes
                        </Button>
                        <Button colorScheme="red" onClick={handleCancel}>
                            No
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForConfirmBuyPoint;
