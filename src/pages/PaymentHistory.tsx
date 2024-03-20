import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import useApiForGetUsersPaymentHistory from '@/hooks/useApiForGetUsersPaymentHistory';
import { Box, Table, Thead, Tbody, Tr, Th, Td, useToast } from '@chakra-ui/react';

import { RowTypeForPaymentHistoryData } from '@/types/typeForUserBoard';

const PaymentHistory = () => {
    const { isLoggedIn, loginUser, logout } = useUser();
    const router = useRouter();
    const toast = useToast();

    const [paymentHistory, setPaymentHistory] = useState<RowTypeForPaymentHistoryData[]>([]);
    const { isLoading, error, data: paymentHistoryData } = useApiForGetUsersPaymentHistory(); // Call the hook

    console.log("paymentHistory : ", paymentHistory);

    useEffect(() => {
        // if (!isLoggedIn) {
        //     router.push('/login'); // Redirect to login if not logged in
        //     return;
        // }

        const fetchData = async () => {
            try {
                if (paymentHistoryData) {
                    const response = await paymentHistoryData as any;
                    setPaymentHistory(response.paymentHistory);
                }
            } catch (error) {
                console.error('Error fetching payment history:', error);
                toast({ title: 'Error fetching data', status: 'error' }); // Display error toast
            }
        };

        fetchData();
    }, [isLoggedIn, paymentHistoryData, router, toast]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!paymentHistory) return <div>No payment history found.</div>;

    return (
        <div>
            <h2>{loginUser.email} 님의 결제 정보</h2>
            <Table variant="striped" colorScheme="teal">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>결제 금액</Th>
                        <Th>거래 ID</Th>
                        <Th>생성 시간</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {paymentHistory.map((payment: any) => (
                        <Tr key={payment.id}>
                            <Td>{payment.id}</Td>
                            <Td>{payment.paymentAmount}</Td>
                            <Td>{payment.merchantUid}</Td>
                            <Td>{new Date(payment.createdAt).toLocaleString()}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </div>
    );
};

export default PaymentHistory;
