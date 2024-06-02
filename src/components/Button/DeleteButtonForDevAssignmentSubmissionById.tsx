import React from 'react';
import useApiForDeleteDevAssignmentSubmissionById from '@/hooks/useApiForDeleteDevAssignmentSubmission';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { FaMinus } from 'react-icons/fa';

type Props = {
    categoryId: number;
    submissionId: number;
};

const DeleteButtonForDevAssignmentSubmissionById = ({ categoryId, submissionId }: Props) => {
    const mutation = useApiForDeleteDevAssignmentSubmissionById(categoryId);

    const handleDeleteSubmission = () => {
        mutation.mutate(submissionId);
    };

    return (
        <Tooltip label="Delete submission" hasArrow>
            <IconButton
                aria-label="delete submission"
                icon={<FaMinus />}
                variant="outline"
                colorScheme="red"
                size="xs"
                onClick={handleDeleteSubmission}
                _hover={{ bgColor: "red.200" }} // 호버 시 색상 변경
            />
        </Tooltip>
    );
};

export default DeleteButtonForDevAssignmentSubmissionById;
