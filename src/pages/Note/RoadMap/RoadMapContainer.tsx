// src\pages\Note\RoadMap\RoadMapContainer.tsx
import DataGridForRoadMapList from '@/components/DataGrid/DataGridForRoadMapList'
import { Box } from '@chakra-ui/react'
import React from 'react'

type Props = {}

const RoadMapContainer = (props: Props) => {
    return (
        <>
            <Box>
                <DataGridForRoadMapList />
            </Box>

        </>
    )
}

export default RoadMapContainer