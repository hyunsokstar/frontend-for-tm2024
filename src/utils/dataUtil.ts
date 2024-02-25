import { format } from 'date-fns';

export const formatDateTime = (dateTime: string) => {
    return format(new Date(dateTime), "MM-dd HH:mm");
};