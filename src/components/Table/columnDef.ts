interface ColumnDef {
    accessor: string;
    header: string;
}

export const sampleColumns: ColumnDef[] = [
    {
        accessor: "name",
        header: "Name",
    },
    {
        accessor: "age",
        header: "Age",
    },
    {
        accessor: "gender",
        header: "Gender",
    },
    {
        accessor: "height",
        header: "Height (cm)",
    },
];