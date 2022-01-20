import dayjs from 'dayjs';

export const useDateFormatter = () => {
    return {
        formatDate: (date: Date, includeYear: boolean = false) => {
            const format = `DD MMM${includeYear ? ' YYYY' : ''}`;
            return dayjs(date).format(format);
        },
        formatTime: (date: Date) => {
            const format = 'HH:mm';
            return dayjs(date).format(format);
        }
    };
};
