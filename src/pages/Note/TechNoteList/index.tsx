import DataGridForTechNoteList2 from '@/components/DataGrid/DataGridForTechNoteList2'
import Head from 'next/head'
import React from 'react'

type Props = {}

const TechNoteList = (props: Props) => {
    return (
        <>
            <Head>
                <title>Tech Note</title>
            </Head>

            <DataGridForTechNoteList2 />
        </>
    )
}

export default TechNoteList