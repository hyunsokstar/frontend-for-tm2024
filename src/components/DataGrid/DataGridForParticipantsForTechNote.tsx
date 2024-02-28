
import React, { useEffect, useState } from 'react'
import 'react-data-grid/lib/styles.css';
import { Box, Switch } from '@chakra-ui/react'
import DataGrid from 'react-data-grid';
import { ITypeForParticipantsRow } from '@/types/typeForRoadMap';
import useUser from '@/hooks/useUser';
import SwitchForUpdateIsCompletedForTechNote from '../Switch/SwitchForUpdateIsCompletedForTechNote';

const getColumns = (
    techNoteId: number,
    userId: number
) => {
    return [
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
            key: 'isCompleted',
            name: 'isCompleted',
            renderCell: (props: any) => (
                <Box>
                    <SwitchForUpdateIsCompletedForTechNote
                        techNoteId={techNoteId}
                        userId={userId}
                        isCompleted={props.row.isCompleted}
                    />

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
        },
    ];
}



type Props = {
    participants: ITypeForParticipantsRow[]
    techNoteId: number;
}

const DataGridForParticipantsForTechNote = ({
    participants,
    techNoteId
}: Props) => {
    const [participantRows, setParticipantRows] = useState<ITypeForParticipantsRow[]>([])
    const { isLoggedIn, loginUser, logout } = useUser();
    const userId = loginUser.id

    const columns = getColumns(techNoteId, userId)

    useEffect(() => {
        let participantsRowsForUpdate;
        if (participants) {
            participantsRowsForUpdate = participants.map((row) => {

                return {
                    id: row.id,
                    email: row.user?.email,
                    authorityForEdit: row.authorityForEdit,
                    phoneNumber: row.user?.phoneNumber,
                    isCompleted: row.isCompleted,
                    createdAt: row.createdAt
                }
            })
            setParticipantRows(participantsRowsForUpdate);
        }

    }, [participantRows])


    return (
        <Box width={"100%"} m={"auto"}>
            <DataGrid columns={columns} rows={participantRows} />
        </Box>
    )
}

export default DataGridForParticipantsForTechNote    