import { css } from '@linaria/core';


interface CellExpanderFormatterProps {
    tabIndex: number;
    expanded: boolean;
    onCellExpand: () => void;
}

export default function CellExpanderFormatter({
    tabIndex,
    expanded,
    onCellExpand
}: CellExpanderFormatterProps) {
    function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onCellExpand();
        }
    }

    return (
        <div>
            {/* {expanded ? "true" : "false"} ? */}
            <span onClick={onCellExpand} onKeyDown={handleKeyDown}>
                <span tabIndex={tabIndex}>{expanded ? '\u25BC' : '\u25B6'}</span>
            </span>
        </div>
    );
}
