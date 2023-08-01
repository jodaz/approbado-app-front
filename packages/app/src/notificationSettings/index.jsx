import * as React from 'react'
import BaseForm from '@approbado/lib/components/BaseForm'
import Checkbox from '@approbado/lib/components/FinalFormCheckbox'
import Grid from '@material-ui/core/Grid'
import { JSONAxiosInstance as axios } from '@approbado/lib/api'
import useFetchProfile from '@approbado/lib/hooks/useFetchProfile'
import Spinner from '@approbado/lib/components/Spinner'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'

const NotificationSettings = () => {
    const [{ record, isLoading, isError }, doFetch] = useFetchProfile();
    const [loading, setLoading] = React.useState(false)
    const { showNotification } = useUiDispatch();

    const save = React.useCallback(async (values) => {
        setLoading(true)

        try {
            await axios.post('profile', values);
            showNotification('Hemos actualizado tus configuraciones de notificaciones con éxito.')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [axios])

    React.useEffect(() => {
        doFetch('/profile');
    }, []);

    if (isLoading) return <Spinner />;

    return (
        <BaseForm
            save={save}
            saveButtonLabel='Actualizar'
            disabled={loading}
            record={record}
        >
            <Grid item xs={12}>
                <Checkbox
                    source="profile.general_notifications"
                    label='Recibir notificaciones generales'
                />
            </Grid>
            <Grid item xs={12}>
                <Checkbox
                    source="profile.showNotification_mobile_app"
                    label='Recibir notificaciones sobre comentarios en aplicativo móvil'
                />
            </Grid>
            <Grid item xs={12}>
                <Checkbox
                    source="profile.showNotification_email"
                    label='Recibir notificaciones sobre comentarios en el correo electrónico vinculado'
                />
            </Grid>
            <Grid item xs={12}>
                <Checkbox
                    source="profile.showNotification_about_chat"
                    label='Recibir notificaciones sobre mensajería'
                />
            </Grid>
            <Grid item xs={12}>
                <Checkbox
                    source="profile.showNotification_about_account"
                    label='Recibir notificaciones sobre actualizaciones a la cuenta'
                />
            </Grid>
        </BaseForm>
    )
}

export default NotificationSettings
