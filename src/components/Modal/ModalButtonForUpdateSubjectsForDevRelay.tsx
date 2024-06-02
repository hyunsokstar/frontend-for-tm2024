import React, { useState } from "react";
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
import { BsPencilSquare, BsCheck, BsX, BsDashCircleFill, BsDashSquare } from "react-icons/bs";

type Props = {
    subjects: SubjectForCategoryRow[];
};

const ModalButtonForUpdateSubjectsForDevRelay = ({ subjects }: Props) => {
    const [updatedSubjects, setUpdatedSubjects] = useState<SubjectForCategoryRow[]>(subjects);
    const [editingSubjectId, setEditingSubjectId] = useState<number | null>(null);

    const { isOpen, onOpen, onClose } = useDisclosure();

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

    const handleSave = () => {
        // Update the subjects based on updatedSubjects
        // Reset editingSubjectId
        setEditingSubjectId(null);
    };

    const handleCancel = () => {
        // Reset updatedSubjects to the original subjects
        setUpdatedSubjects(subjects);
        setEditingSubjectId(null);
    };

    const handleDelete = (id: number) => {
        // Delete the subject from updatedSubjects
        setUpdatedSubjects(updatedSubjects.filter((subject) => subject.id !== id));
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
                                        <IconButton
                                            aria-label="Delete subject"
                                            icon={<BsDashSquare />}
                                            variant="outline"
                                            onClick={() => handleDelete(subject.id)}
                                            size="xs"
                                        />
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
