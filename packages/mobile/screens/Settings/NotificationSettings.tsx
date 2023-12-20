import React from 'react';
import { useForm } from 'react-hook-form';
import { Routes } from '../routes';
import { updateSettings } from '@approbado/lib/services/settings.services'
import { getUser, useAuth } from '@approbado/lib/contexts/AuthContext';
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import {
    Text,
    Container,
    Button,
    Row,
    Checkbox
} from '../../components';
import TitleBar from '../../components/TitleBar';
import styled from 'styled-components/native';

const FormContainer = styled.View`
    margin-top: 40px;
    width: 100%;
    text-align: center;
    align-items: center;
    margin-bottom: 20px;
`;

const NotificationSettings = ({ navigation }) => {
    const { state: { user }, dispatch } = useAuth();
    const { dispatch: dispatchToast } = useToast()
    const { control, handleSubmit } = useForm({
        defaultValues: {
            general_notifications: user?.profile.general_notifications,
            showNotification_mobile_app: user?.profile.showNotification_mobile_app,
            showNotification_email: user?.profile.showNotification_email,
            showNotification_about_account: user?.profile.showNotification_about_account
        }
    });

    const onSubmit = async (values) => {
        const { success, status, data } = await updateSettings({ profile: values })

        if (success) {
            await getUser(dispatch);
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
        <Container>
            <TitleBar>
                <Text fontSize={18} fontWeight={600}>
                Ajustes de seguridad
                </Text>
            </TitleBar>
            <FormContainer>
                <Row size={1}>
                    <Checkbox
                        control={control}
                        label="Recibir notificaciones generales"
                        name="general_notifications"
                    />
                </Row>
                <Row size={1}>
                    <Checkbox
                        control={control}
                        label="Recibir notificaciones sobre comentarios"
                        name="showNotification_mobile_app"
                    />
                </Row>
                <Row size={1}>
                    <Checkbox
                        control={control}
                        label="Recibir notificaciones sobre mensajería"
                        name="showNotification_email"
                    />
                </Row>
                <Row size={1}>
                    <Checkbox
                        control={control}
                        label="Recibir notificaciones sobre actualización de cuenta"
                        name="showNotification_about_account"
                    />
                </Row>
                <Row size={6}>
                    <Button onPress={handleSubmit(onSubmit)} fullWidth>
                        Guardar cambios
                    </Button>
                </Row>
            </FormContainer>
        </Container>
    );
};

export default NotificationSettings;
