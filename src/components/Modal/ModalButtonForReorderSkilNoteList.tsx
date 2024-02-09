import React, { useState } from 'react'
import { SkillNoteRow } from '@/types/typeForSkilNote'
import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import ReactBeautifulDndForSkilNoteList from './ReactBeautifulDnd/ReactBeautifulDndForSkilNoteList'
// import useApiForUpdateSkilNoteListOrder from '@/hooks/useApiForUpdateSkilNoteListOrder'

type Props = {
    dataForSkilNoteList: SkillNoteRow[] | undefined
    techNoteId: any
    pageNum: any
}

const ModalButtonForReorderSkilNoteList = ({ techNoteId, pageNum, dataForSkilNoteList }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState<SkillNoteRow | null>(null);

    // useApiForUpdateSkilNoteListOrder
    // const muationForSkilNoteListOrder = useApiForUpdateSkilNoteListOrder(techNoteId, pageNum);

    const openModal = (note: SkillNoteRow) => {
        setSelectedNote(note);
        setIsOpen(true);
    };

    const closeModal = () => {
        setSelectedNote(null);
        setIsOpen(false);
    };

    return (
        <Box>
            <Button
                size="sm"
                variant={"outlie"}
                border={"1px solid lightgray"}
                onClick={() => setIsOpen(true)}
            >
                Ordering For SkilNoteList
            </Button>

            {/* 모달 */}
            <Modal isOpen={isOpen} onClose={closeModal} size={"5xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>SkilNote Ordering</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* {dataForSkilNoteList ? dataForSkilNoteList.map((note) => (
                            <Box key={note.id} onClick={() => openModal(note)} border={"1px solid green"} display={"flex"} justifyContent={"space-between"} mb={1}>
                                <p>{note.id}</p>
                                <p>{note.title}</p>
                                <p>{note.category}</p>
                            </Box>
                        )) : "no data"} */}
                        <ReactBeautifulDndForSkilNoteList
                            techNoteId={techNoteId}
                            pageNum={pageNum}
                            dataForSkilNoteList={dataForSkilNoteList}
                        />
                    </ModalBody>
                    <ModalFooter>
                        {/* 선택된 노트의 정보 출력 */}
                        {selectedNote && (
                            <>
                                <p>ID: {selectedNote.id}</p>
                                <p>Email: {selectedNote.email}</p>
                                <p>Title: {selectedNote.title}</p>
                                <p>Category: {selectedNote.category}</p>
                            </>
                        )}
                        {/* 추가적인 모달 내용이 있다면 여기에 추가 */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default ModalButtonForReorderSkilNoteList;
