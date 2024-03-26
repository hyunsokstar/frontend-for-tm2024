import React, { useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import { Box, Button, IconButton, Text } from '@chakra-ui/react';
import DataGrid from 'react-data-grid';
import { ITypeForChallengersRow } from '@/types/typeforChallenges';
import SwitchButtonIsPassedForParticipantForSubChallenge from '../Switch/SwitchButtonIsPassedForParticipantForSubChallenge';
import ModalButtonForSelectNoteForChallengeReport from '../Modal/ModalButtonForSelectNoteForChallengeReport';
import useUser from '@/hooks/useUser';
import { FiExternalLink } from 'react-icons/fi';

const getColumns = (subChallengeId: number, isLoggedIn: boolean, subChallengeName: string, openNewTabForNoteUrl: (noteUrl: string) => void) => {
    return [
        {
            key: 'email',
            name: 'Email'
        },
        {
            key: 'noteUrl',
            name: 'Note URL',
            renderCell({ row, tabIndex, onRowChange }: any): React.ReactNode {
                return (
                    <Box>
                        <Box>
                            {row.noteUrl === "" ?




                                <Box display={"flex"} justifyContent={"space-between"}>
                                    {
                                        isLoggedIn ?
                                            <ModalButtonForSelectNoteForChallengeReport
                                                subChallengeId={subChallengeId}
                                                participantId={row.id}
                                                subChallengeName={subChallengeName}
                                            />
                                            : ""
                                    }
                                </Box>
                                : (
                                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Text>
                                            {row.noteUrl}
                                        </Text>
                                        <Box display={"flex"} gap={1} alignItems={"center"}>
                                            <ModalButtonForSelectNoteForChallengeReport
                                                subChallengeId={subChallengeId}
                                                participantId={row.id}
                                                subChallengeName={subChallengeName}
                                            />
                                            <IconButton
                                                aria-label="Open note"
                                                icon={<FiExternalLink />} // 외부 링크 아이콘
                                                variant="outline"
                                                size="xs"
                                                onClick={() => openNewTabForNoteUrl(row.noteUrl)} // 클릭 이벤트 핸들러
                                                mt={1}
                                                _hover={{ backgroundColor: "green.100" }}
                                            />
                                        </Box>
                                    </Box>
                                )


                            }
                        </Box>

                    </Box>
                );
            }
        },
        {
            key: 'isPassed',
            name: 'isPassed',
            renderCell({ row, tabIndex, onRowChange }: any): React.ReactNode {
                return (
                    <Box>
                        {/* {row.isPassed ? "true" : "false"} */}
                        <SwitchButtonIsPassedForParticipantForSubChallenge participantId={row.user.id} subChallengeId={subChallengeId} defaultIsPassed={row.isPassed} />
                    </Box>
                );
            }
        },
    ];
};

interface IProps {
    subChallengeId: number;
    participantsForSubChallenge: ITypeForChallengersRow[];
    subChallengeName: string;
}

const DataGridForChallengersForSubChallenges = ({ subChallengeId, participantsForSubChallenge, subChallengeName }: IProps) => {
    console.log("data For Challengers 12345: ", participantsForSubChallenge);
    const [participantsRows, setParticipantsRows] = useState<any[]>([]);
    const { isLoggedIn, loginUser, logout } = useUser();

    const openNewTabForNoteUrl = (noteUrl: string) => {
        // 현재 페이지의 주소
        const currentUrl = window.location.href;

        // 기존 주소에서 "3000/" 뒤에 noteUrl을 추가하여 새로운 주소 생성
        const fullUrl = currentUrl.replace(/3000\/.*$/, "3000/" + noteUrl);

        // 새 탭에서 페이지 열기
        window.open(fullUrl, '_blank');
    }

    useEffect(() => {
        let participantsRowsToUpdate = [];

        if (participantsForSubChallenge) {
            participantsRowsToUpdate = participantsForSubChallenge.map((row) => {
                return {
                    id: row.id,
                    email: row.user.email,
                    noteUrl: row.noteUrl,
                    user: row.user,
                    isPassed: row.isPassed,
                };
            });
            setParticipantsRows(participantsRowsToUpdate);
        }

    }, [participantsForSubChallenge]);

    return (
        <Box width={"100%"} m={"auto"}>
            <DataGrid columns={getColumns(subChallengeId, isLoggedIn, subChallengeName, openNewTabForNoteUrl)} rows={participantsRows} />
        </Box>
    );
};

export default DataGridForChallengersForSubChallenges;
