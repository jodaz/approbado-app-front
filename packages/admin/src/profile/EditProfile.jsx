import * as React from 'react'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import { useUserDispatch, useUserState } from '@approbado/lib/hooks/useUserState'
import { Form } from 'react-final-form'
import { updateProfile } from '@approbado/lib/services/profile.services'
import InputContainer from '@approbado/lib/components/InputContainer'
import Grid from '@material-ui/core/Grid'
import ProfilePhotoInput from '@approbado/lib/components/ProfilePhotoInput'
import Box from '@material-ui/core/Box'
import Button from '@approbado/lib/components/Button'
import TextInput from '@approbado/lib/components/TextInput'

const validate = values => {
    const errors = {};

    if (!values.names) {
        errors.names = "Ingrese su nombre.";
    }
    if (!values.email) {
        errors.email = "Ingrese su correo electrónico.";
    }

    return errors;
}

const UpdateProfile = () => {
    const { user } = useUserState();
    const [loading, setLoading] = React.useState(false)
    const { showNotification } = useUiDispatch();
    const { fetchUser } = useUserDispatch();

    const save = React.useCallback(async ({ file, ...restValues }) => {
        setLoading(true)
        const values = {
            file: file,
            ...restValues
        };

        const { data, success } = await updateProfile(values)

        if (success) {
            setLoading(false)
            fetchUser();
            showNotification(`Su perfil ha sido actualizado.`)
        } else {
            setLoading(false)
            return data;
        }
    }, []);

    return (
        <Box paddingTop='2rem'>
            <Form
                initialValues={user}
                save={save}
                disabled={loading}
                validate={validate}
                onSubmit={save}
                render={ ({ handleSubmit }) => (
                    <Grid container spacing='5'>
                        <Grid item md='3' xs='12'>
                            <Box width='100%' display='flex' justifyContent="center">
                                <ProfilePhotoInput
                                    name='file'
                                    preview={user.picture}
                                    disabled={loading}
                                    accept='image/*'
                                />
                            </Box>
                        </Grid>
                        <Grid item md='9' xs='12'>
                            <InputContainer label='Nombre' md={8} sm={8} xs={12}>
                                <TextInput
                                    name='names'
                                    disabled={loading}
                                    fullWidth
                                />
                            </InputContainer>
                            <InputContainer label='Correo electrónico' md={8} sm={8} xs={12}>
                                <TextInput
                                    name='email'
                                    disabled={loading}
                                    fullWidth
                                />
                            </InputContainer>
                            <Grid item xs={12} sm={12} md={4} lg={3}>
                                <Button
                                    disabled={loading}
                                    onClick={event => {
                                        if (event) {
                                            event.preventDefault();
                                            handleSubmit();
                                        }
                                    }}
                                    unresponsive
                                >
                                    Actualizar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            />
        </Box>
    )
}

UpdateProfile.defaultProps = {
    basePath: 'profile',
    resource: 'profile'
}

export default UpdateProfile
