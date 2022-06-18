// let timeRegex = /^([0-1]\d):([0-5]\d)\s(?:AM|PM)?$/i;

export default function(values) {
    const errors = {};

    if (!values.trivia_id) {
        errors.trivia_id = "Seleccione una trivia.";
    }
    if (!values.level_id) {
        errors.level_id = "Seleccione un nivel.";
    }
    if (!values.title) {
        errors.title = "Ingrese un título para la reunión.";
    }
    if (!values.subtheme_id) {
        errors.subtheme_id = "Seleccione un subtema.";
    }
    if (!values.users_ids) {
        errors.users_ids = "Seleccione un participante.";
    }
    if (!values.time) {
        errors.time = "Formato incorrecto.";
    }

    return errors;
}
