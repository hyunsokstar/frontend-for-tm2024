import React, { useState, useEffect, useCallback, useRef } from 'react';
import { IconButton, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, HStack, useDisclosure, Tooltip } from '@chakra-ui/react';
import { FaRocket, FaDizzy } from 'react-icons/fa';
import { GiRunningNinja } from 'react-icons/gi';
import { FiSmile } from 'react-icons/fi';
import { LuShovel } from 'react-icons/lu';
import { SiFastify } from "react-icons/si";
import useApiForUpdateUserInfoAboutCurrentStatus from '@/hooks/useApiForUpdateUserInfoAboutCurrentStatus';

type PerformanceLevelType = 'struggling' | 'offroad' | 'ninja' | 'cheetah' | 'rocket';

type Props = {
    userId: number;
    performanceLevel?: PerformanceLevelType;
    pageNum: number;
};

const IconButtonForShowUserTaskCondition: React.FC<Props> = ({ userId, performanceLevel, pageNum }) => {
    const [selectedIcon, setSelectedIcon] = useState<JSX.Element>(<FiSmile />);
    const [selectedLabel, setSelectedLabel] = useState<PerformanceLevelType>('ninja');
    const selectedLabelRef = useRef<PerformanceLevelType>('ninja');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const updateUserInfoMutation = useApiForUpdateUserInfoAboutCurrentStatus(pageNum);

    const iconOptions: Array<{ icon: JSX.Element, label: PerformanceLevelType, color: string }> = [
        { icon: <FaRocket />, label: 'rocket', color: 'teal' },
        { icon: <SiFastify />, label: 'cheetah', color: 'orange' },
        { icon: <GiRunningNinja />, label: 'ninja', color: 'yellow' },
        { icon: <LuShovel />, label: 'offroad', color: 'red' },
        { icon: <FaDizzy />, label: 'struggling', color: 'blue' },
    ];

    const handleIconClick = useCallback((icon: JSX.Element, label: PerformanceLevelType) => {

        // Update local state and ref
        setSelectedIcon(icon);
        setSelectedLabel(label);
        selectedLabelRef.current = label;

        // Close the popover
        onClose();

        // Update the server using the ref value
        updateUserInfoMutation.mutate({
            userId: userId,
            updateDto: {
                targetField: 'performanceLevel',
                performanceLevel: selectedLabelRef.current
            }
        });
    }, [userId, updateUserInfoMutation, onClose]);

    const getIconColorScheme = (icon: JSX.Element): string | undefined => {
        const option = iconOptions.find(opt => opt.icon.type === icon.type);
        return option ? option.color : undefined;
    };

    useEffect(() => {
        const selectedOption = iconOptions.find(option => option.label === performanceLevel);
        if (selectedOption) {
            setSelectedIcon(selectedOption.icon);
            setSelectedLabel(selectedOption.label);
            selectedLabelRef.current = selectedOption.label;
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