import React, { useState, useMemo } from 'react';
import {
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Scatter
} from 'recharts';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    HStack,
    Text,
    VStack
} from "@chakra-ui/react";
import { MdOutlineTimeline, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { IUser } from '@/types/typeForUserBoard';
import useApiForGetUserCompletedTaskStatics from '@/hooks/useApiForGetUserCompletedTaskStatics';
import { ICompletedTaskStatistic } from '@/types/typeforTodos';

interface IProps {
    user: IUser
}

const getWeekDates = (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay() + 1);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return { start, end };
};

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        // 날짜 파싱에 실패한 경우, 입력된 문자열을 그대로 반환
        return dateString;
    }
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}-${day}`;
};

const TaskCompletionChart: React.FC<{ data: ICompletedTaskStatistic[] }> = ({ data }) => {
    const maxValue = useMemo(() => {
        return Math.max(
            ...data.map(item => Math.max(item.completedTasks, item.teamAverage))
        );
    }, [data]);

    const yAxisTicks = useMemo(() => {
        const max = Math.ceil(maxValue);
        return Array.from({ length: 6 }, (_, i) => Math.round(i * max / 5));
    }, [maxValue]);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
                data={data}
                margin={{
                    top: 20, right: 30, bottom: 20, left: 20,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis
                    dataKey="date"
                    scale="point"
                    padding={{ left: 30, right: 30 }}
                    tickFormatter={formatDisplayDate}
                    interval={0}
                />
                <YAxis
                    allowDecimals={false}
                    domain={[0, 'dataMax']}
                    ticks={yAxisTicks}
                />
                <Tooltip
                    labelFormatter={formatDisplayDate}
                    formatter={(value: number) => Math.round(value)}
                />
                <Legend />
                <Bar
                    dataKey="completedTasks"
                    name="완료된 업무"
                    barSize={20}
                    fill="#413ea0"
                />
                <Scatter
                    dataKey="teamAverage"
                    name="팀 평균"
                    fill="red"
                    shape="circle"
                    r={4}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

const ModalButtonForUserTaskStatistics: React.FC<IProps> = ({ user }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentWeek, setCurrentWeek] = useState(new Date());

    const { start, end } = useMemo(() => getWeekDates(currentWeek), [currentWeek]);
    const startDate = formatDate(start);
    const endDate = formatDate(end);

    const { data, isLoading, error } = useApiForGetUserCompletedTaskStatics(user.id, startDate, endDate);

    const handlePrevWeek = () => setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() - 7)));
    const handleNextWeek = () => setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() + 7)));

    return (
        <>
            <IconButton
                aria-label="업무 통계 보기"
                icon={<MdOutlineTimeline />}
                variant="outline"
                colorScheme="teal"
                onClick={onOpen}
            />
            <Modal isOpen={isOpen} onClose={onClose} size="6xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>주간 완료된 업무 통계</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <HStack>
                                <IconButton
                                    aria-label="이전 주"
                                    icon={<MdChevronLeft />}
                                    onClick={handlePrevWeek}
                                />
                                <Text>{`${formatDisplayDate(startDate)} ~ ${formatDisplayDate(endDate)}`}</Text>
                                <IconButton
                                    aria-label="다음 주"
                                    icon={<MdChevronRight />}
                                    onClick={handleNextWeek}
                                />
                            </HStack>
                            {isLoading ? (
                                <Text>로딩 중...</Text>
                            ) : error ? (
                                <Text>에러가 발생했습니다.</Text>
                            ) : (
                                <TaskCompletionChart data={data?.data || []} />
                            )}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForUserTaskStatistics;