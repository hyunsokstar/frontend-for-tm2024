import React, { useState } from 'react';
import { IconButton, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, HStack, useDisclosure } from '@chakra-ui/react';
import { FaRocket, FaSmile, FaCloudRain, FaDizzy } from 'react-icons/fa';
import { MdRunCircle } from 'react-icons/md'; // 닌자 달리는 아이콘
import { FiSmile } from 'react-icons/fi';

type Props = {}

const IconButtonForShowUserTaskCondition: React.FC<Props> = () => {
    const [selectedIcon, setSelectedIcon] = useState<JSX.Element>(<FiSmile />);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const iconOptions = [
        { icon: <FaRocket />, label: '쾌속 순항 중', color: 'teal' },
        { icon: <MdRunCircle />, label: '빠르게 치고 나가는 중', color: 'orange' }, // 닌자 달리는 아이콘
        { icon: <FiSmile />, label: '웃는 얼굴', color: 'yellow' },
        { icon: <FaDizzy />, label: '버벅이는 중', color: 'red' },
        { icon: <FaCloudRain />, label: '낙담 중', color: 'blue' },
    ];

    const handleIconClick = (icon: JSX.Element) => {
        setSelectedIcon(icon);
        onClose();
    }

    // 선택된 아이콘의 색상을 반환하는 함수
    const getIconColorScheme = (icon: JSX.Element): string | undefined => {
        if (icon === <FaRocket />) return 'teal';
        if (icon === <MdRunCircle />) return 'orange';
        if (icon === <FiSmile />) return 'yellow';
        if (icon === <FaDizzy />) return 'red';
        if (icon === <FaCloudRain />) return 'blue';
        return undefined; // 기본값은 없음
    }

    return (
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <PopoverTrigger>
                <IconButton
                    aria-label="Task Condition"
                    icon={selectedIcon}
                    variant="outline"
                    size="md"
                    onClick={onOpen}
                    colorScheme={getIconColorScheme(selectedIcon)} // 선택된 아이콘의 색상에 맞게 동적으로 설정
                />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>상태 선택</PopoverHeader>
                <PopoverBody>
                    <HStack spacing="4">
                        {iconOptions.map((option, index) => (
                            <IconButton
                                key={index}
                                aria-label={option.label}
                                icon={option.icon}
                                variant="outline"
                                size="md"
                                colorScheme={option.color}
                                onClick={() => handleIconClick(option.icon)}
                            />
                        ))}
                    </HStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}

export default IconButtonForShowUserTaskCondition;
