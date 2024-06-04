import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DataGridForTechNoteList2 from '@/components/DataGrid/DataGridForTechNoteList2';

type Props = {};

const TechNoteListForRoadMap = (props: Props) => {
    const router = useRouter();
    const [roadMapId, setRoadMapId] = useState<number | undefined>();

    useEffect(() => {
        const { roadMapId: idFromQuery } = router.query;
        // Type assertion (assuming roadMapId is always a number)
        setRoadMapId(Number(idFromQuery));
    }, [router.query]);

    return (
        <div>
            {roadMapId !== undefined && <DataGridForTechNoteList2 roadMapId={roadMapId} />}
        </div>
    );
};

export default TechNoteListForRoadMap;