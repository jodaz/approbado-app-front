import * as React from 'react'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import { JSONAxiosInstance as axios } from '@approbado/lib/api'
import TextInput from '@approbado/lib/components/TextInput'

const validate = values => {
    const errors = {};

    if (!values.names) {
        errors.names = "Ingrese su nombre.";
    }
    if (!values.email) {
        errors.email = "Ingrese su correo electrónico.";
    }
    if (!values.user_name) {
        errors.user_name = 'Ingrese su nombre de usuario.'
    }

    return errors;
}

const UpdateProfile = () => {
    const [record, setRecord] = React.useState({})
    const [loading, setLoading] = React.useState(false)
    const { showNotification } = useUiDispatch();

    const save = React.useCallback(async (values) => {
        setLoading(true)

        try {
            await axios.post('profile', values);

            showNotification('Hemos actualizado tu perfil con éxito.')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [axios])

    const fetchProfile = React.useCallback(async () => {
        const { data } = await axios.get('profile');

        setRecord(data)
    }, [axios])

    React.useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <BaseForm
            save={save}
            saveButtonLabel='Actualizar'
            disabled={loading}
            record={record}
            validate={validate}
        >
            <InputContainer label='Nombre' md={6} sm={12}>
                <TextInput
                    name='names'
                    placeholder='Ingresar nombres'
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Apellido'  md={6} sm={12}>
                <TextInput
                    name='surnames'
                    placeholder='Ingresar apellidos'
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Usuario'  md={6} sm={12}>
                <TextInput
                    name='user_name'
                    placeholder='Ingrese un nombre de usuario'
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Correo electrónico'  md={6} sm={12}>
                <TextInput
                    name='email'
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Ocupación'  md={6} sm={12}>
                <TextInput
                    name='profession'
                    placeholder='Ingrese una ocupación'
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Teléfono'  md={6} sm={12}>
                <TextInput
                    name='phone'
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Linkedin'  md={6} sm={12}>
                <TextInput
                    name='linkedin'
                    placeholder='https://linkedin.com/in/usuario'
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Twitter'  md={6} sm={12}>
                <TextInput
                    name='twitter'
                    placeholder='@usuario'
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Biografía' xs={12} sm={12} md={12}>
                <TextInput
                    name='twitter'
                    fullWidth
                    multiline
                    placeholder='Escribe un poco sobre ti'
                />
            </InputContainer>
        </BaseForm>
    )
}

export default UpdateProfile
