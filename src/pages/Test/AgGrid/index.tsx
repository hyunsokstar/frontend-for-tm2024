import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

type Props = {}

function AgGrid({ }: Props) {

    const [rowData, setRowData] = useState([
        { mission: "Voyager", company: "NASA", location: "Cape Canaveral", date: "1977-09-05", rocket: "Titan-Centaur ", price: 86580000, successful: true },
        { mission: "Apollo 13", company: "NASA", location: "Kennedy Space Center", date: "1970-04-11", rocket: "Saturn V", price: 3750000, successful: false },
        { mission: "Falcon 9", company: "SpaceX", location: "Cape Canaveral", date: "2015-12-22", rocket: "Falcon 9", price: 9750000, successful: true }
    ]);

    const [colDefs, setColDefs] = useState<any>([
        { field: "mission" },
        { field: "company" },
        { field: "location" },
        { field: "date" },
        { field: "price" },
        { field: "rocket" },
        { field: "successful" },
    ]);

    return (
        <Box className="ag-theme-quartz" style={{ height: 500, width: "80%", margin: "auto", padding: "10px 0px" }}>
            {/* The AG Grid component */}
            <AgGridReact rowData={rowData} columnDefs={colDefs} />
        </Box>
    )
}

export default AgGrid