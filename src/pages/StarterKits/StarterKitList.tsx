
import React, { useEffect, useState } from 'react'
import 'react-data-grid/lib/styles.css';
import { Box } from '@chakra-ui/react'
import DataGrid from 'react-data-grid';
import useApiForGetAllStarterKitsData from '@/hooks/useApiForGetAllStarterKitsData';
import { ITypeForStarterKitRow } from '@/types/typeForStarterKit';
import { formatDateTime } from '@/utils/dataUtil';

const columns = [
    {
        key: 'id',
        name: 'ID',
        renderCell(props: any) {
            return (
                <Box>
                    {props.row.id}
                </Box>
            );
        },
    },
    {
        key: 'title',
        name: 'Title',
        renderCell(props: any) {
            return (
                <Box>
                    {props.row.title}
                </Box>
            );
        },
    },
    {
        key: 'description',
        name: 'Description',
        renderCell(props: any) {
            return (
                <Box>
                    {props.row.description}
                </Box>
            );
        },
    },
    {
        key: 'skilNoteUrl',
        name: 'Skill Note URL',
        renderCell(props: any) {
            return (
                <Box>
                    {props.row.skilNoteUrl}
                </Box>
            );
        },
    },
    {
        key: 'createdAt',
        name: 'Created At',
        renderCell(props: any) {
            return (
                <Box>
                    {formatDateTime(props.row.createdAt)}
                </Box>
            );
        },
    },
    {
        key: 'updatedAt',
        name: 'Updated At',
        renderCell(props: any) {
            return (
                <Box>
                    {props.row.updatedAt}
                </Box>
            );
        },
    },
];



type Props = {}

const StarterkitList = (props: Props) => {

    const [pageNum, setpageNum] = useState(1);
    const [starterKitRows, setStarterKitRows] =
        useState<ITypeForStarterKitRow[]>([]);

    const { isLoading, error, data: starterKitListData } =
        useApiForGetAllStarterKitsData({ pageNum });

    console.log("starterKitListData : ", starterKitListData);


    useEffect(() => {
        let starterKitRowsToUpdate = [];
        if (starterKitListData) {
            starterKitRowsToUpdate = starterKitListData.starterKitList.map((starter: ITypeForStarterKitRow) => {
                return {
                    id: starter.id,
                    title: starter.title,
                    description: starter.description,
                    skilNoteUrl: starter.skilNoteUrl,
                    createdAt: starter.createdAt,
                    updatedAt: starter.updatedAt
                };
            })
            setStarterKitRows(starterKitRowsToUpdate)
        }

    }, [starterKitListData])

    return (
        <Box width={"100%"} m={"auto"}>
            <DataGrid columns={columns} rows={starterKitRows} />;
        </Box>
    )
}


export default StarterkitList