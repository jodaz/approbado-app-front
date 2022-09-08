import * as React from 'react'
import { Grid } from '@material-ui/core'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import TextInput from '@approbado/lib/components/TextInput'
import SelectInput from '@approbado/lib/components/SelectInput'
import { axios } from '@approbado/lib/providers'
import { useHistory } from 'react-router-dom'
import CustomPasswordInput from './CustomPasswordInput'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import SwitchInput from '@approbado/lib/components/SwitchInput'

const ACCESS_TYPES = [
    { id: 'Administrador', name: 'Administrador' },
    { id: 'Pagos', name: 'Pagos' },
    { id: 'Moderador', name: 'Moderador' }
]

const validate = (values) => {
    const errors = {};

    if (!values.names) {
        errors.names = "Ingrese el nombre.";
    }
    if (!values.email) {
        errors.email = "Ingrese un correo electronico.";
    }
    if (!values.random_pass && !values.password) {
        errors.password = "Ingrese una contraseña.";
    }

    return errors;
};

const UserCreate = () => {
    const { showNotification } = useUiDispatch();
    const history = useHistory()

    const save = React.useCallback(async (values) => {
        try {
            const { data } = await axios.post('/users', values)

            if (data) {
                history.push('/users?tab=admins')
                showNotification('Se ha completado el registro con éxito');
            }
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, []);

    return (
        <BaseForm
            save={save}
            validate={validate}
            formName='Agregar nuevo usuario'
        >
            <InputContainer
                label='Nombres'
            >
                <TextInput
                    name="names"
                    placeholder="Nombres"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Correo electrónico'>
                <TextInput
                    label={false}
                    name="email"
                    placeholder="Correo electronico"
                    fullWidth
                />
            </InputContainer>
            <Grid item xs={12}>
                <SwitchInput
                    source="random_pass"
                    label="Generar contraseña y enviar por correo"
                />
            </Grid>
            <CustomPasswordInput />
            <InputContainer label='Tipo de acceso'>
                <SelectInput
                    label={false}
                    options={ACCESS_TYPES}
                    name='rol'
                    fullWidth
                />
            </InputContainer>
        </BaseForm>
    )
}

export default UserCreate
