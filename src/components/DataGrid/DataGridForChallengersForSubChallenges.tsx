import React, { useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import { Box } from '@chakra-ui/react';
import DataGrid from 'react-data-grid';
import { ITypeForChallengersRow } from '@/types/typeforChallenges';
import SwitchButtonIsPassedForParticipantForSubChallenge from '../Switch/SwitchButtonIsPassedForParticipantForSubChallenge';

const getColumns = (subChallengeId: number) => {
    return [
        {
            key: 'email',
            name: 'Email'
        },
        {
            key: 'noteUrl',
            name: 'Note URL'
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
}

const DataGridForChallengersForSubChallenges = ({ subChallengeId, participantsForSubChallenge }: IProps) => {
    console.log("data For Challengers 12345: ", participantsForSubChallenge);
    const [participantsRows, setParticipantsRows] = useState<any[]>([]);

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
            <DataGrid columns={getColumns(subChallengeId)} rows={participantsRows} />
        </Box>
    );
};

export default DataGridForChallengersForSubChallenges;
