//Format date

export default function formatDate(date) {
    const d = new Date(date);
    const time = d.toLocaleTimeString("en-US");
    return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

