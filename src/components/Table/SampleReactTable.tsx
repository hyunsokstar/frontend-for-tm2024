import React, { useState } from 'react'
import { useReactTable } from "@tanstack/react-table";
// import { sampleData } from './data';


type Props = {}

export const sampleData = [
    {
        name: "John Doe",
        age: 30,
        gender: "male",
        height: 180,
    },
    {
        name: "Jane Doe",
        age: 25,
        gender: "female",
        height: 170,
    },
];

const ReactTable = (props: Props) => {
    // const [data, setData] = useState<any[]>(sampleData);
    // console.log("data : ", data);


    return (
        <div>ReactTable</div>
    )
}

export default ReactTable