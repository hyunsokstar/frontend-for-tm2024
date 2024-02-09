import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface StarRatingProps {
    totalStars: number;
}

const StarRatingForPriority: React.FC<StarRatingProps> = ({ totalStars }) => {
    const [selectedStars, setSelectedStars] = useState<number>(0);
    const [hoveredStar, setHoveredStar] = useState<number>(0);

    useEffect(() => {
        setSelectedStars(totalStars);
    }, [totalStars]);

    const handleStarClick = (star: number) => {
        setSelectedStars(star);
        console.log(`선택한 별의 순서: ${star}`);
    };

    const handleStarHover = (star: number) => {
        if (selectedStars === 0) {
            setHoveredStar(star);
        }
    };

    const handleStarHoverExit = () => {
        if (selectedStars === 0) {
            setHoveredStar(0);
        }
    };

    return (
        <Box display={"flex"} gap={1}>
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                const isColoredStar = starValue <= totalStars;
                return (
                    <Box
                        key={index}
                        style={{
                            color: isColoredStar ? 'gold' : starValue <= selectedStars ? 'gold' : 'gray',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleStarClick(starValue)}
                        onMouseEnter={() => handleStarHover(starValue)}
                        onMouseLeave={handleStarHoverExit}
                        fontSize={"xl"}
                    >
                        {starValue <= selectedStars ? <AiFillStar /> : <AiOutlineStar />}
                    </Box>
                );
            })}
        </Box>
    );
};

export default StarRatingForPriority;
