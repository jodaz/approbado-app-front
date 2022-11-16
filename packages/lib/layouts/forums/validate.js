const validateForum = values => {
    const errors = {};

    if (!values.message) {
        errors.message = "Ingrese un título.";
    }
    if (!values.categories_ids) {
        errors.categories_ids = 'Seleccione al menos una categoría.'
    } else {
        if (!values.categories_ids.length) {
            errors.categories_ids = 'Seleccione una o más etiquetas.'
        }
        if (values.categories_ids.length > 3) {
            errors.categories_ids = 'Máximo tres temas.'
        }
    }
    if (!values.trivias_ids) {
        errors.trivias_ids = 'Seleccione al menos una trivia.'
    } else {
        if (!values.trivias_ids.length) {
            errors.trivias_ids = 'Seleccione uno o más temas.'
        }
        if (values.trivias_ids.length > 3) {
            errors.trivias_ids = 'Máximo tres temas.'
        }
    }

    return errors;
}

export default validateForum
