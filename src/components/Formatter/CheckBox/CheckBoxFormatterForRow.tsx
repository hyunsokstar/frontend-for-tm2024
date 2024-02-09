import React from 'react'
import { RenderCellProps, SelectCellFormatter, useRowSelection } from 'react-data-grid';

type Props = {}

const CheckBoxFormatterForRow = (props: RenderCellProps<unknown>) => {
    const [isRowSelected, onRowSelectionChange] = useRowSelection();

    return (
        <SelectCellFormatter
            aria-label="Select"
            tabIndex={props.tabIndex}
            value={isRowSelected}
            onChange={(checked, isShiftClick) => {
                onRowSelectionChange({ type: 'ROW', row: props.row, checked, isShiftClick });
            }}

        />
    )
}

export default CheckBoxFormatterForRow
