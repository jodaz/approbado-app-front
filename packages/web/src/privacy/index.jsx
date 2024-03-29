import * as React from 'react'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import BaseForm from '@approbado/lib/components/BaseForm'
import Checkbox from '@approbado/lib/components/FinalFormCheckbox'
import Grid from '@material-ui/core/Grid'
import { apiProvider as axios } from '@approbado/lib/api'
import useFetchProfile from '@approbado/lib/hooks/useFetchProfile'
import Spinner from '@approbado/lib/components/Spinner'

const PrivacySettings = () => {
    const [{ record, isLoading, isError }, doFetch] = useFetchProfile();
    const [loading, setLoading] = React.useState(false)
    const { showNotification } = useUiDispatch();

    const save = React.useCallback(async (values) => {
        setLoading(true)

        try {
            await axios.post('profile', values);
            showNotification('Hemos actualizado tus configuraciones de privacidad con éxito.')
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
            loading={loading}
            record={record}
        >
            <Grid item xs={12}>
                <Checkbox
                    source="profile.show_name"
                    label='Mostrar mi nombre cuando vean mi perfil'
                />
            </Grid>
            <Grid item xs={12}>
                <Checkbox
                    source="profile.public_profile"
                    label='Permitir que otras personas puedan ver mi perfil como público'
                />
            </Grid>
        </BaseForm>
    )
}

export default PrivacySettings
