import React, { useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import { Box } from '@chakra-ui/react';
import DataGrid from 'react-data-grid';
import { ITypeForChallengersRow } from '@/types/typeforChallenges';

const columns = [
    { key: 'email', name: 'Email' },
    { key: 'noteUrl', name: 'Note URL' },
];

interface IProps {
    participantsForSubChallenge: ITypeForChallengersRow[]
}

const DataGridForChallengersForSubChallenges = ({ participantsForSubChallenge }: IProps) => {
    console.log("data For Challengers 12345: ", participantsForSubChallenge);

    const [participantsRows, setParticipantsRows] = useState<any[]>([])

    useEffect(() => {
        let participantsRowsToUpdate = [];

        if (participantsForSubChallenge) {
            participantsRowsToUpdate = participantsForSubChallenge.map((row) => {
                return {
                    email: row.user.email,
                    noteUrl: row.noteUrl
                }
            })
            setParticipantsRows(participantsRowsToUpdate)
        }

    }, [participantsForSubChallenge])


    return (
        <Box width={"100%"} m={"auto"}>
            <DataGrid columns={columns} rows={participantsRows} />
        </Box>
    );
};

export default DataGridForChallengersForSubChallenges;
