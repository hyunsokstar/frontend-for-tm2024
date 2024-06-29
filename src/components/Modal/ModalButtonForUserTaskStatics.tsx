import React from 'react';
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
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton
} from "@chakra-ui/react";
import { MdOutlineTimeline } from "react-icons/md";

// 이번 주 데이터 (2024년 6월 24일 월요일부터 6월 28일 금요일까지)
const data = [
    { date: '6월 24일 (월)', completedTasks: 6, teamAverage: 5.8 },
    { date: '6월 25일 (화)', completedTasks: 8, teamAverage: 7.2 },
    { date: '6월 26일 (수)', completedTasks: 5, teamAverage: 6.5 },
    { date: '6월 27일 (목)', completedTasks: 7, teamAverage: 6.9 },
    { date: '6월 28일 (금)', completedTasks: 9, teamAverage: 7.5 },
];

const TaskCompletionChart = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
                data={data}
                margin={{
                    top: 20, right: 20, bottom: 20, left: 20,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="date" scale="band" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completedTasks" name="완료된 업무" barSize={20} fill="#413ea0" />
                <Scatter dataKey="teamAverage" name="팀 평균" fill="red" />
            </ComposedChart>
        </ResponsiveContainer>
    );
}

const ModalButtonForUserTaskStatistics = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <IconButton
                aria-label="업무 통계 보기"
                icon={<MdOutlineTimeline />}
                variant="outline"
                colorScheme="teal"
                onClick={onOpen}
            />
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>이번 주 완료된 업무 통계</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <TaskCompletionChart />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalButtonForUserTaskStatistics;