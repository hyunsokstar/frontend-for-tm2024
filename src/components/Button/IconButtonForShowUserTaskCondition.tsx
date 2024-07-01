import React, { useState, useEffect } from 'react';
import { IconButton, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, HStack, useDisclosure, Tooltip } from '@chakra-ui/react';
import { FaRocket, FaDizzy } from 'react-icons/fa';
import { GiRunningNinja } from 'react-icons/gi';
import { FiSmile } from 'react-icons/fi';
import { LuShovel } from 'react-icons/lu';
import { SiFastify } from "react-icons/si";

type PerformanceLevelType = 'struggling' | 'offroad' | 'ninja' | 'cheetah' | 'rocket';

type Props = {
    performanceLevel?: PerformanceLevelType;
};

const IconButtonForShowUserTaskCondition: React.FC<Props> = ({ performanceLevel }) => {
    const [selectedIcon, setSelectedIcon] = useState<JSX.Element>(<FiSmile />);
    const [selectedLabel, setSelectedLabel] = useState<PerformanceLevelType>('ninja');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const iconOptions: Array<{ icon: JSX.Element, label: PerformanceLevelType, color: string }> = [
        { icon: <FaRocket />, label: 'rocket', color: 'teal' },
        { icon: <SiFastify />, label: 'cheetah', color: 'orange' },
        { icon: <GiRunningNinja />, label: 'ninja', color: 'yellow' },
        { icon: <LuShovel />, label: 'offroad', color: 'red' },
        { icon: <FaDizzy />, label: 'struggling', color: 'blue' },
    ];

    const handleIconClick = (icon: JSX.Element, label: PerformanceLevelType) => {
        setSelectedIcon(icon);
        setSelectedLabel(label);
        onClose();
    };

    const getIconColorScheme = (icon: JSX.Element): string | undefined => {
        const option = iconOptions.find(opt => opt.icon.type === icon.type);
        return option ? option.color : undefined;
    };

    // Find the icon option that matches the performanceLevel prop
    const selectedOption = iconOptions.find(option => option.label === performanceLevel);

    // Use the selected option to set the initial state for selectedIcon and selectedLabel
    useEffect(() => {
        if (selectedOption) {
            setSelectedIcon(selectedOption.icon);
            setSelectedLabel(selectedOption.label);
        }
    }, [performanceLevel]);

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
};

export default IconButtonForShowUserTaskCondition;