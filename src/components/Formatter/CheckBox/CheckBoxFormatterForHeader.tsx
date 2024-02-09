import React from 'react'
import { RenderHeaderCellProps, SelectCellFormatter, useRowSelection } from 'react-data-grid';

type Props = {}

const CheckBoxFormatterForHeader = (props: RenderHeaderCellProps<unknown>) => {
    const [isRowSelected, onRowSelectionChange] = useRowSelection();

    return (
        <SelectCellFormatter
            aria-label="Select All"
            tabIndex={props.tabIndex}
            value={isRowSelected}
            onChange={(checked) => {
                onRowSelectionChange({ type: 'HEADER', checked });
            }}
        />
    );
}

export default CheckBoxFormatterForHeader