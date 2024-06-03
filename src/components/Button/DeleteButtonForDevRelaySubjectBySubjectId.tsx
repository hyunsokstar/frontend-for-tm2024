import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubjectResponse } from "@/types/typeForDevRelay";
import { IconButton, useToast } from "@chakra-ui/react";
import { BsDashSquare } from "react-icons/bs";

type Props = {
    subjectId: number;
};

const DeleteButtonForDevRelaySubjectBySubjectId = ({ subjectId }: Props) => {



    const handleDelete = () => {
        if (confirm("정말로 이 주제를 삭제하시겠습니까?")) {
        }
    };

    return (
        <IconButton
            aria-label="Delete subject"
            icon={<BsDashSquare />}
            variant="outline"
            onClick={handleDelete}
            size="xs"
        />
    );
};

export default DeleteButtonForDevRelaySubjectBySubjectId;
