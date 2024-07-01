import DataGridForTechNoteList1 from '@/components/DataGrid/DataGridForTechNoteList1'
import Head from 'next/head'
import React from 'react'

type Props = {}

const TechNoteList = (props: Props) => {
    return (
        <>
            <Head>
                <title>Tech Note here?</title>
            </Head>
            <DataGridForTechNoteList1 />
            {/* <DataGridForTechNoteList2 /> */}
        </>
    )
}

export default TechNoteList