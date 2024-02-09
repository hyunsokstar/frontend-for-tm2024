import React from 'react'
import { useRouter } from 'next/router';
import DataGridForSkilNoteListForTechNoteId2 from '@/components/DataGrid/DataGridForSkilNoteListForTechNoteId2'
import 'react-data-grid/lib/styles.css';
import Head from 'next/head';

type Props = {}

const SkilNoteListPage = (props: Props) => {

    const router = useRouter();
    const { techNoteId } = router.query;

    return (
        <>
            <Head>
                <title>스킬 노트 리스트</title>
            </Head>
            <DataGridForSkilNoteListForTechNoteId2 techNoteId={techNoteId} isOpen={true} />
        </>
    )
}

export default SkilNoteListPage