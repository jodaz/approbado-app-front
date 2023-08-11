const formDataHandler = (data, fieldFileName = 'file') => {
    const formData = new FormData();
    const { file, ...rest } = data;

    if (file) {
        formData.append(fieldFileName, file);
    }

    for (let [key, value] of Object.entries(rest)) {
        if (typeof value == 'undefined' || value === null) continue; // ignore undefined or null

        if (Array.isArray(value)) {
            value = JSON.stringify(value)
        }

        if (typeof value == 'object') {
            value = value.toString()
        }
        //@ts-expect-error
        formData.append(key, value);
    };

    return formData;
}

export default formDataHandler
