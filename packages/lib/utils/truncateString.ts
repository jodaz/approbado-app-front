const truncateString = (str: string, num: number) => {
    if (str) {
        if (str.trim().length > num) {
            return `${str.slice(0, num).trimEnd()}...`;
        }
    }

    return str;
}

export default truncateString
