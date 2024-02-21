import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
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
                        {/* 서브 단축키 데이터를 모달 내부에 표시 */}
                        {/* {subShortCuts ? subShortCuts.map((subShortCut) => (
                            <div key={subShortCut.id}>
                                <p>ID: {subShortCut.id}</p>
                                <p>Shortcut: {subShortCut.shortcut}</p>
                                <p>Description: {subShortCut.description}</p>
                                <p>Category: {subShortCut.category}</p>
                            </div>
                        )) : "no data for sub short cuts"} */}
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
