import React, { useState, useEffect } from "react";
import { SubjectForCategoryRow } from "@/types/typeForDevRelay";
import {
    Box,
    Text,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    IconButton,
    useDisclosure,
    Input,
} from "@chakra-ui/react";
import useApiForUpdateSubjectNameForDevRelay from "@/hooks/useApiForUpdateSubjectNameForDevRelay";
import useApiForDeleteSubjectForDelay from "@/hooks/useApiForDeleteSubject";
import { BsCheck, BsPencilSquare, BsX } from "react-icons/bs";
import DeleteButtonForDevRelaySubjectBySubjectById from "../Button/DeleteButtonForDevRelaySubjectBySubjectById";

type Props = {
    subjects: SubjectForCategoryRow[];
};

const ModalButtonForUpdateSubjectsForDevRelay = ({ subjects }: Props) => {
    const [updatedSubjects, setUpdatedSubjects] = useState<SubjectForCategoryRow[]>(subjects);
    const [editingSubjectId, setEditingSubjectId] = useState<number | null>(null);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { mutate: updateSubjectName } = useApiForUpdateSubjectNameForDevRelay();
    const mutationForDeleteSubject = useApiForDeleteSubjectForDelay();

    useEffect(() => {
        setUpdatedSubjects(subjects);
    }, [subjects]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const updatedSubjectsList = updatedSubjects.map((subject: SubjectForCategoryRow) => {
            if (subject.id === id) {
                return { ...subject, name: e.target.value };
            }
            return subject;
        });
        setUpdatedSubjects(updatedSubjectsList);
    };

    const handleEdit = (id: number) => {
        setEditingSubjectId(id);
    };

    const handleSave = async () => {
        if (editingSubjectId && updatedSubjects) {
            const subjectToUpdate = updatedSubjects.find((subject) => subject.id === editingSubjectId);
            if (subjectToUpdate) {
                await updateSubjectName({ subjectId: editingSubjectId, name: subjectToUpdate.name });
                setEditingSubjectId(null);
            }
        }
    };

    const handleCancel = () => {
        // Reset updatedSubjects to the original subjects
        setUpdatedSubjects(subjects);
        setEditingSubjectId(null);
    };

    const handleDeleteSubject = (subjectId: number) => {
        if (confirm("정말로 이 주제를 삭제하시겠습니까?")) {
            mutationForDeleteSubject.mutate(subjectId);
        }

        setUpdatedSubjects(updatedSubjects.filter((subject) => subject.id !== subjectId));
    };

    return (
        <>
            <IconButton
                aria-label="Update subjects"
                icon={<BsPencilSquare />}
                variant="outline"
                onClick={onOpen}
                size="sm"
                bg={'orange.200'}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Subjects</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {updatedSubjects.map((subject: SubjectForCategoryRow) => (
                            <Box key={subject.id} display="flex" alignItems="center" justifyContent="space-between" gap={1} mb={1}>
                                {editingSubjectId === subject.id ? (
                                    <Input
                                        size="xs"
                                        value={subject.name}
                                        onChange={(e) => handleInputChange(e, subject.id)}
                                    />
                                ) : (
                                    <Text fontSize={"10px"}>{subject.name}</Text>
                                )}
                                {editingSubjectId === subject.id ? (
                                    <Box display="flex" gap={1}>
                                        <IconButton
                                            aria-label="Save subject"
                                            icon={<BsCheck />}
                                            variant="outline"
                                            onClick={handleSave}
                                            size="xs"
                                        />
                                        <IconButton
                                            aria-label="Cancel editing subject"
                                            icon={<BsX />}
                                            variant="outline"
                                            onClick={handleCancel}
                                            size="xs"
                                        />
                                    </Box>
                                ) : (
                                    <Box display="flex" gap={1}>
                                        <IconButton
                                            aria-label="Edit subject"
                                            icon={<BsPencilSquare />}
                                            variant="outline"
                                            onClick={() => handleEdit(subject.id)}
                                            size="xs"
                                        />
                                        <DeleteButtonForDevRelaySubjectBySubjectById subjectId={subject.id} onDelete={handleDeleteSubject} />
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForUpdateSubjectsForDevRelay;
