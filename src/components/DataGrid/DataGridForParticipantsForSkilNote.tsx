
import React, { useEffect, useState } from 'react'
import 'react-data-grid/lib/styles.css';
import { Box } from '@chakra-ui/react'
import DataGrid from 'react-data-grid';
import { ITypeForParticipantsRow } from '@/types/typeForRoadMap';

const columns = [
    {
        key: 'id',
        name: 'ID',
        renderCell: (props: any) => (
            <Box>
                {props.row.id}
            </Box>
        )
    },
    {
        key: 'email',
        name: 'Email',
        renderCell: (props: any) => (
            <Box>
                {props.row.email}
            </Box>
        )
    },
    {
        key: 'authorityForEdit',
        name: 'Authority For Edit',
        renderCell: (props: any) => (
            <Box>
                {props.row.authorityForEdit}
            </Box>
        )
    },
    {
        key: 'phoneNumber',
        name: 'Phone Number',
        renderCell: (props: any) => (
            <Box>
                {props.row.phoneNumber}
            </Box>
        )
    }
];



type Props = {
    participants: ITypeForParticipantsRow[]
}

const DataGridForParticipantsForSkilNote = ({ participants }: Props) => {

    const [participantRows, setParticipantRows] = useState<ITypeForParticipantsRow[]>([])

    useEffect(() => {
        let participantsRowsForUpdate;
        if (participants) {
            participantsRowsForUpdate = participants.map((row) => {

                return {
                    id: row.id,
                    email: row.user?.email,
                    authorityForEdit: row.authorityForEdit,
                    phoneNumber: row.user?.phoneNumber,
                    createdAt: row.createdAt
                }
            })
            setParticipantRows(participantsRowsForUpdate);
        }

    }, [participants])


    return (
        <Box width={"100%"} m={"auto"}>
            <DataGrid columns={columns} rows={participantRows} />
        </Box>
    )
}

export default DataGridForParticipantsForSkilNote    