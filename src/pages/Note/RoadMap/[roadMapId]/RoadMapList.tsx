// src\pages\Note\RoadMap\[roadMapId]\RoadMapList.tsx

import { useRouter } from 'next/router';
import React from 'react'

type Props = {}

const RoadMapList = (props: Props) => {

    const router = useRouter();
    const { roadMapId } = router.query;


    return (
        <div>roadMapList for {roadMapId}</div>
    )
}

export default RoadMapList