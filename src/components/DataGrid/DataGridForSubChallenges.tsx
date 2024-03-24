import React from 'react'
import 'react-data-grid/lib/styles.css';
import { Box, IconButton } from '@chakra-ui/react'
import DataGrid from 'react-data-grid';
import { IChallengeRow, SubChallengeRow } from '@/types/typeforChallenges';
import useUser from '@/hooks/useUser';
import ModalButtonForUpdateChallenge from '../Modal/ModalButtonForUpdateChallenge';
import { DeleteIcon } from '@chakra-ui/icons';
import useApiForDeleteChallenges from '@/hooks/useApiForDeleteChallenges';
import ModalButtonForAllParticipantsForSubChallenges from '../Modal/ModalButtonForAllParticipantsForSubChallenges';
import ModalButtonForBriefingListForSubChallenge from '../Modal/ModalButtonForBriefingListForSubChallenge';


type Props = {
    pageNum: number
    mainChallenge: IChallengeRow
    subChallenges: SubChallengeRow[];
}

const DataGridForSubChallenges = ({
    mainChallenge,
    subChallenges,
    pageNum
}: Props) => {

    const { isLoggedIn, loginUser, logout } = useUser();
    const deleteChallengesMutation = useApiForDeleteChallenges(pageNum);

    console.log("mainChallenge : ", mainChallenge);

    const handleDelete = (isMainOrSub: string, challengeId: number) => {
        try {
            deleteChallengesMutation.mutateAsync({ isMainOrSub, challengeId });
        } catch (error) {
            console.error('챌린지 삭제 중 에러 발생:', error);
        }

    };

    const columns = [
        { key: 'challengeName', name: 'Sub Challenge Name' },

        {
            key: 'briefings',
            name: 'briefings',
            renderCell: (props: any) => (
                <Box>
                    <ModalButtonForBriefingListForSubChallenge
                        writerIdForSubChallenge={props.row.writer.id}
                        pageNum={pageNum}
                        subChallengeId={props.row.id}
                        briefingsForSubChallenge={props.row.briefings}
                    />
                </Box>
            )
        },

        {
            key: 'participants',
            name: 'participants',
            renderCell: (props: any) => (
                <Box>
                    <ModalButtonForAllParticipantsForSubChallenges
                        subChallengeName={props.row.challengeName}
                        subChallengeId={props.row.id}
                    />
                </Box>
            )
        },
        { key: 'prize', name: 'Prize' },
        { key: 'deadline', name: 'Deadline' },
        {
            key: 'utils',
            name: 'utils',
            renderCell: (props: any) => (
                <Box>
                    {loginUser.email === mainChallenge.writer.email ?
                        <>

                            <ModalButtonForUpdateChallenge
                                isMainOrSub="sub"
                                challenge={props.row}
                                buttonText={'update'}
                                challengeId={props.row.id}
                                pageNum={pageNum}
                            />

                            <IconButton
                                aria-label="Delete"
                                icon={<DeleteIcon />}
                                onClick={() => handleDelete("sub", props.row.id)}
                                variant="outline"
                                size="xs"
                                colorScheme="danger" // 버튼 색상 적용
                                _hover={{ bg: 'red.200' }} // 호버 시에 배경색 변경
                            />
                        </>
                        : ""}
                </Box>
            )
        }
    ];

    return (
        <Box width={"100%"} m={"auto"}>
            <DataGrid columns={columns} rows={subChallenges} />;
        </Box>
    )
}

export default DataGridForSubChallenges
