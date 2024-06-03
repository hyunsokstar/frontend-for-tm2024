import React from "react";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { FaMinus } from "react-icons/fa";

type Props = {
    subjectId: number;
    onDelete: (subjectId: number) => void;
};

const DeleteButtonForDevRelaySubjectBySubjectById = ({ subjectId, onDelete }: Props) => {
    const handleDeleteSubject = () => {
        if (confirm("정말로 이 주제를 삭제하시겠습니까?")) {
            onDelete(subjectId);
        }
    };

    return (
        <Tooltip label="Delete subject" hasArrow>
            <IconButton
                aria-label="delete subject"
                icon={<FaMinus />}
                variant="outline"
                colorScheme="red"
                size="xs"
                onClick={handleDeleteSubject}
                _hover={{ bgColor: "red.200" }} // 호버 시 색상 변경
            />
        </Tooltip>
    );
};

export default DeleteButtonForDevRelaySubjectBySubjectById;
