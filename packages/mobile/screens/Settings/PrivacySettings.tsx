import React from 'react';
import { useForm } from 'react-hook-form';
import { Routes } from '../routes';
import { updateSettings } from '@approbado/lib/services/settings.services'
import { getUser, useAuth } from '@approbado/lib/contexts/AuthContext';
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import {
    Row,
    Button,
    Checkbox,
    ScrollViewContainer
} from '../../components';

const PrivacySettings = ({ navigation }) => {
    const { state: { user }, dispatch } = useAuth()
    const { dispatch: dispatchToast } = useToast()
    const { control, handleSubmit, formState } = useForm({
        defaultValues: {
            show_name: user?.profile.show_name,
            public_profile: user?.profile.public_profile
        }
    });

    const onSubmit = async (values) => {
        const { success, status, data } = await updateSettings({ profile: values })

        if (success) {
            await getUser(dispatch)
            await openToast(
                dispatchToast,
                'success',
                'Configuraciones actualizadas'
            )
            navigation.navigate(Routes.Settings)
        } else {
            console.log(status, data)
        }
    };

    return (
        <ScrollViewContainer>
            <Row size={1}>
                <Checkbox
                    control={control}
                    label="Mostrar mi nombre cuando vean mi perfil"
                    name="show_name"
                />
            </Row>
            <Row size={1}>
                <Checkbox
                    control={control}
                    label="Permitir que otras personas puedan ver mi perfil como público"
                    name="public_profile"
                />
            </Row>
            <Row size={6}>
                <Button
                    onPress={handleSubmit(onSubmit)}
                    fullWidth
                    disabled={!formState.isValid || formState.isSubmitting}
                    isLoading={formState.isSubmitting}
                >
                    Guardar cambios
                </Button>
            </Row>
        </ScrollViewContainer>
    );
};

export default PrivacySettings;
