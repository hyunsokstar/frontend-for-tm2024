import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Box } from "@chakra-ui/react";
import { ITypeForSubShortCutListRow } from '@/types/typeForShortCut';
import DataGridForSubShortcuts from '../DataGrid/DataGridForSubShortcuts';

interface Props {
    buttonText: string; // 버튼 텍스트 props로 전달 받음
    subShortCuts: ITypeForSubShortCutListRow[]; // 서브 단축키 데이터 props로 전달 받음
}

const ModalButtonForSubShortCuts: React.FC<Props> = ({ buttonText, subShortCuts }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);

    return (
        <div>
            <Button onClick={onOpen}>{buttonText} ({subShortCuts.length})</Button>
            <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sub Shortcuts</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box display={"flex"} justifyContent={"flex-end"}>
                            <Button variant={"outline"} size="sm">add shortcut</Button>
                        </Box>
                        <DataGridForSubShortcuts subShortCuts={subShortCuts} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default ModalButtonForSubShortCuts;
