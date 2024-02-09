import React from 'react';
import gridStyles from './styles.module.scss';

interface FormatterForPhoneNumberProps<TRow, TSummaryRow> {
    row: TRow;
    column: { key: keyof TRow };
}

const FormatterForPhoneNumber = <TRow, TSummaryRow>({ row, column }: FormatterForPhoneNumberProps<TRow, TSummaryRow>) => {
    const value = row[column.key] as unknown as string;

    return value ? value : '- -';
};

export default FormatterForPhoneNumber;
