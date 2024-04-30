export function formattedDate(date: string | Date): string {
    date = typeof date === "string" ? new Date(date) : date;

    const difference: number = Math.floor((Date.now() - date.getTime()) / 1000);

    switch (true) {
        case difference < 60: // Less than 1 minute
            return `${difference} seconds ago`;
        case difference < 3600: // Less than 1 hour
            return `${Math.floor(difference / 60)} minute(s) ago`;
        case difference < 86400: // Less than 1 day
            return `${Math.floor(difference / 3600)} hour(s) ago`;
        case difference < 604800: // Less than 1 week
            return `${Math.floor(difference / 86400)} day(s) ago`;
        case difference < 2419200: // Less than 4 weeks
            return `${Math.floor(difference / 604800)} week(s) ago`;
        case difference < 31449600: // Less than 1 year
            return `${Math.floor(difference / 2419200)} month(s) ago`;
        default:
            return `${Math.floor(difference / 31449600)} year(s) ago`;
    }
}
