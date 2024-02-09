import React, { useState } from 'react';
import {
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    VStack,
    HStack,
    Grid,
} from '@chakra-ui/react';

type Props = {
    button_text: string;
    setDefaultDeadline: React.Dispatch<React.SetStateAction<Date | null>>;
};

const ModalButtonForSelectDeadLine = ({ button_text, setDefaultDeadline }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTodayOption, setSelectedTodayOption] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<number | null>(null);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
    const [resultDate, setResultDate] = useState<Date | any>(null);

    const onClose = () => {
        setIsOpen(false);
        setSelectedTime(null);
        setResultDate(null);
    };

    const handleButtonClick = () => {
        setIsOpen(true);
    };

    const handleTodayOptionButtonClick = (option: string) => {
        // 초기화
        setSelectedDay(null);
        setSelectedWeek(null);

        // Update the state immediately
        setSelectedTodayOption((currentOption) => {
            let result;
            const currentDate = new Date();

            // option에 따라 시간 설정
            switch (option) {
                case "morning":
                    result = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 13, 0, 0);
                    setResultDate(result);
                    setSelectedTime(13);
                    break;
                case "afternoon":
                    result = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0);
                    setResultDate(result);
                    setSelectedTime(18);
                    break;
                case "night":
                    result = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 0, 0);
                    setResultDate(result);
                    setSelectedTime(23);
                    break;
                default:
                    // You can add a default case if needed
                    break;
            }

            // Return the new value for selectedTodayOption
            return option;
        });
    };




    const handleTimeButtonClick = (time: number) => {
        // 클릭된 버튼의 시간을 state에 설정
        setSelectedTodayOption(null)
        setSelectedDay(null);
        setSelectedWeek(null);
        setSelectedTime(time);

        // 시간 계산 및 결과 출력
        const currentDate = new Date();
        const result = new Date(currentDate.getTime() + time * 60 * 60 * 1000);
        setResultDate(result);
        // setDefaultDeadline(result)

    };


    const handleDayButtonClick = (day: number) => {
        // 클릭된 버튼의 날짜를 state에 설정
        setSelectedTodayOption(null)
        setSelectedWeek(null);
        setSelectedTime(null)
        setSelectedDay(day);

        // 시간과 날짜 계산 및 결과 출력
        const currentDate = new Date();
        const result = new Date(currentDate.getTime() + day * 24 * 60 * 60 * 1000); // Convert days to milliseconds
        setResultDate(result);
        // setDefaultDeadline(result)

    };

    const handleWeekButtonClick = (week: number) => {
        // 클릭된 버튼의 주를 state에 설정
        setSelectedDay(null);
        setSelectedTime(null);
        setSelectedWeek(week);

        // 시간과 날짜 계산 및 결과 출력
        const currentDate = new Date();
        const result = new Date(currentDate.getTime() + week * 7 * 24 * 60 * 60 * 1000); // Convert weeks to milliseconds
        setResultDate(result);
        // setDefaultDeadline(result)

    };
    const cancleHandler = () => {
        console.log("hi");
        setResultDate(null)
        setDefaultDeadline(null)
        setIsOpen(false)
    }

    const selctDeadLineHandler = () => {
        setDefaultDeadline(resultDate)
        setIsOpen(false)
    }

    return (
        <>
            <Button onClick={handleButtonClick} width={"100%"} variant={"outline"}>
                {button_text}
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Select Deadline</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Grid templateColumns="repeat(2, 1fr)" gap={{ base: 4, md: 8 }} alignItems="center">
                            <VStack spacing={12} align="left">
                                <Box>기본 옵션</Box>
                                <Box>시간 선택</Box>
                                <Box>날짜 선택</Box>
                                <Box>주 선택</Box>
                            </VStack>

                            <VStack spacing={8} align="left">
                                <HStack>
                                    <Button
                                        onClick={() => handleTodayOptionButtonClick("morning")}
                                        variant={selectedTodayOption === "morning" ? 'outline' : 'solid'}
                                        borderColor={selectedTodayOption === "morning" ? 'red' : 'black'}
                                    >
                                        오늘 오전(13시)
                                    </Button>
                                    <Button
                                        onClick={() => handleTodayOptionButtonClick("afternoon")}
                                        variant={selectedTodayOption === "afternoon" ? 'outline' : 'solid'}
                                        borderColor={selectedTodayOption === "afternoon" ? 'red' : 'black'}

                                    >
                                        오늘 오후(6시)
                                    </Button>
                                    <Button
                                        onClick={() => handleTodayOptionButtonClick("night")}
                                        variant={selectedTodayOption === "night" ? 'outline' : 'solid'}
                                        borderColor={selectedTodayOption === "night" ? 'red' : 'black'}

                                    >
                                        오늘 밤(11시)
                                    </Button>
                                </HStack>

                                {/* 시간 선택 버튼들 */}
                                <HStack flexWrap={"wrap"}>
                                    {[...Array(5)].map((_, index) => (
                                        <Button
                                            key={index}
                                            onClick={() => handleTimeButtonClick(index + 1)}
                                            variant={selectedTime === index + 1 ? 'outline' : 'solid'}
                                            borderColor={selectedTime === index + 1 ? 'red' : 'black'}
                                        >
                                            {index + 1}
                                        </Button>
                                    ))}
                                </HStack>

                                {/* 날짜 선택 버튼들 */}
                                <HStack>
                                    {[...Array(10)].map((_, index) => (
                                        <Button
                                            key={index}
                                            onClick={() => handleDayButtonClick(index + 1)}
                                            variant={selectedDay === index + 1 ? 'outline' : 'solid'}
                                            borderColor={selectedDay === index + 1 ? 'red' : 'black'}
                                        >{index + 1}</Button>
                                    ))}
                                </HStack>

                                {/* 주 선택 버튼들 */}
                                <HStack>
                                    {[1, 2, 3, 4, 5].map((value, index) => (
                                        <Button
                                            key={value}
                                            onClick={() => handleWeekButtonClick(index + 1)}
                                            variant={selectedWeek === index + 1 ? 'outline' : 'solid'}
                                            borderColor={selectedWeek === index + 1 ? 'red' : 'black'}
                                        >{`${value} week`}</Button>
                                    ))}
                                </HStack>
                            </VStack>
                        </Grid>
                    </ModalBody>
                    <ModalFooter>
                        <Box display={'flex'} gap={20} justifyContent={'space-between'}>
                            {resultDate !== null && (
                                <Box>
                                    Result: {resultDate.toLocaleString()}
                                </Box>
                            )}
                            <Button colorScheme="blue" mr={3} onClick={selctDeadLineHandler}>
                                선택
                            </Button>
                            <Button onClick={cancleHandler}>
                                취소
                            </Button>
                        </Box>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForSelectDeadLine;
