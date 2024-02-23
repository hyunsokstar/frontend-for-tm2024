import React, { useState } from 'react';
import { Box, Img, Button, Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';

type ModalButtonProps = {
    imageUrl: string;
};

const ModalButtonForShowImageForBriefingBoard: React.FC<ModalButtonProps> = ({ imageUrl }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenImage = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Box position="relative" display="inline-block"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <Img src={imageUrl} alt="Uploaded" width={200} height={200} />
            {isHovering && (
                <Button
                    onClick={handleOpenImage}
                    size="sm"
                    position="absolute"
                    top="-24px"
                    right="-8px"
                    bg="gray.600"
                    color="white"
                    borderRadius="md"
                    boxShadow="md"
                    _hover={{ bg: 'gray.700' }}
                    style={{ visibility: isHovering ? 'visible' : 'hidden' }}
                >
                    열기
                </Button>
            )}

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="5xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <Img src={imageUrl} alt="Uploaded" width="100%" height="auto" />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ModalButtonForShowImageForBriefingBoard;
