//Format date
export const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US").format(new Date(date));
}

//Count days from start and end date
export const countDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.abs(end - start);
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
}
