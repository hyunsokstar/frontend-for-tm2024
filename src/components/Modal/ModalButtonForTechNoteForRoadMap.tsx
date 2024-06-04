import React, { useState } from 'react';
import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import DataGridForTechNotesForRoadMap from '../DataGrid/DataGridForTechNotesForRoadMap';
import { ITypeForTechNotesRowForRoadMapsMasterDetail } from '@/types/typeForRoadMap';

type Props = {
    techNotes: ITypeForTechNotesRowForRoadMapsMasterDetail[]; // techNotes 배열을 Props로 받음
    roadMapId: any;
};

const ModalButtonForTechNoteForRoadMap: React.FC<Props> = ({ techNotes, roadMapId }) => {
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);

    return (
        <>
            <Button width={"100px"} onClick={onOpen} border={"1px solid black"} variant={"outlined"} size={"sm"} >technotes ({techNotes?.length ? techNotes.length : 0})</Button>
            <Modal isOpen={isOpen} onClose={onClose} size={"7xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Tech Notes for RoadMap</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box width={"100%"} bgColor={"#DCEDF9"}>
                            <DataGridForTechNotesForRoadMap
                                techNotes={techNotes ? techNotes : []}
                                roadMapId={roadMapId}
                            />
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForTechNoteForRoadMap;
