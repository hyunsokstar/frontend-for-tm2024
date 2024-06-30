import React, { useState } from 'react';
import { IconButton, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, HStack, useDisclosure, Tooltip } from '@chakra-ui/react';
import { GiRunningNinja } from 'react-icons/gi';
import { FaRocket, FaDizzy } from 'react-icons/fa';
import { CiFaceSmile } from 'react-icons/ci';
import { FiSmile } from 'react-icons/fi';
import { LuShovel } from "react-icons/lu";

type Props = {}

const IconButtonForShowUserTaskCondition: React.FC<Props> = () => {
    const [selectedIcon, setSelectedIcon] = useState<JSX.Element>(<FiSmile />);
    const [selectedLabel, setSelectedLabel] = useState<string>('기본 상태');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const iconOptions = [
        { icon: <FaRocket />, label: '좋았어 영차!', color: 'teal' },
        { icon: <GiRunningNinja />, label: '달리는중', color: 'orange' },
        { icon: <CiFaceSmile />, label: 'smile', color: 'yellow' },
        { icon: <LuShovel />, label: '삽질중', color: 'red' },
        { icon: <FaDizzy />, label: '대가리 깨짐', color: 'blue' },
    ];

    const handleIconClick = (icon: JSX.Element, label: string) => {
        setSelectedIcon(icon);
        setSelectedLabel(label);
        onClose();
    }

    const getIconColorScheme = (icon: JSX.Element): string | undefined => {
        const option = iconOptions.find(opt => opt.icon.type === icon.type);
        return option ? option.color : undefined;
    }

    return (
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <PopoverTrigger>
                <Tooltip label={selectedLabel} hasArrow>
                    <IconButton
                        aria-label="Task Condition"
                        icon={selectedIcon}
                        variant="outline"
                        size="lg"
                        onClick={onOpen}
                        colorScheme={getIconColorScheme(selectedIcon)}
                    />
                </Tooltip>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>상태 선택</PopoverHeader>
                <PopoverBody>
                    <HStack spacing="4">
                        {iconOptions.map((option, index) => (
                            <Tooltip key={index} label={option.label} hasArrow>
                                <IconButton
                                    aria-label={option.label}
                                    icon={option.icon}
                                    variant="outline"
                                    size="md"
                                    colorScheme={option.color}
                                    onClick={() => handleIconClick(option.icon, option.label)}
                                />
                            </Tooltip>
                        ))}
                    </HStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}

export default IconButtonForShowUserTaskCondition;