export default function setFormErrors (setErrors, errors) {
    Object.entries(errors).forEach(([key, value]) => {
        setErrors(key, {
            //@ts-ignore
            type: value
        });
    });
}

