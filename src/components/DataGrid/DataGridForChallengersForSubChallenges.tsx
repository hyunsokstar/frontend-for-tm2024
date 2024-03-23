import React, { useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import { Box, Button } from '@chakra-ui/react';
import DataGrid from 'react-data-grid';
import { ITypeForChallengersRow } from '@/types/typeforChallenges';
import SwitchButtonIsPassedForParticipantForSubChallenge from '../Switch/SwitchButtonIsPassedForParticipantForSubChallenge';
import ModalButtonForSelectNoteForChallengeReport from '../Modal/ModalButtonForSelectNoteForChallengeReport';
import useUser from '@/hooks/useUser';

const getColumns = (subChallengeId: number, isLoggedIn: boolean, subChallengeName: string) => {
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
                    <Box display={"flex"} justifyContent={"space-between"}>
                        {row.noteUrl}
                        {
                            isLoggedIn ?
                                <ModalButtonForSelectNoteForChallengeReport subChallengeName={subChallengeName} />
                                : ""
                        }
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


    useEffect(() => {
        let participantsRowsToUpdate = [];

        if (participantsForSubChallenge) {
            participantsRowsToUpdate = participantsForSubChallenge.map((row) => {
                return {
                    email: row.user.email,
                    noteUrl: row.noteUrl,
                    user: row.user,
                    isPassed: row.isPassed
                };
            });
            setParticipantsRows(participantsRowsToUpdate);
        }

    }, [participantsForSubChallenge]);

    return (
        <Box width={"100%"} m={"auto"}>
            <DataGrid columns={getColumns(subChallengeId, isLoggedIn, subChallengeName)} rows={participantsRows} />
        </Box>
    );
};

export default DataGridForChallengersForSubChallenges;
