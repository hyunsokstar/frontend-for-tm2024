import React from 'react'
import 'react-data-grid/lib/styles.css';
import { Box } from '@chakra-ui/react'
import DataGrid from 'react-data-grid';
import { SubChallengeRow } from '@/types/typeforChallenges';


type Props = {
    subChallenges: SubChallengeRow[];
}

const DataGridForSubChallenges = ({ subChallenges }: Props) => {
    const columns = [
        { key: 'subChallengeName', name: 'Sub Challenge Name' },
        { key: 'description', name: 'Description' },
        { key: 'prize', name: 'Prize' },
        { key: 'deadline', name: 'Deadline' }
    ];

    return (
        <Box width={"100%"} m={"auto"}>
            <DataGrid columns={columns} rows={subChallenges} />;
        </Box>
    )
}

export default DataGridForSubChallenges
