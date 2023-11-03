import React from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native';
import { Routes } from '../routes';
import { updateSettings } from '@approbado/lib/services/settings.services'
import Row from '../../components/Row';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Container from '../../components/Container';
import TitleBar from '../../components/TitleBar';
import styled from 'styled-components/native';
import { getUser, useAuth } from '@approbado/lib/contexts/AuthContext';

const FormContainer = styled.View`
    margin-top: 40px;
    width: 100%;
    text-align: center;
    align-items: center;
    margin-bottom: 20px;
`;

const NotificationSettings = ({ navigation }) => {
    const { state: { user }, dispatch } = useAuth();
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
            navigation.navigate(Routes.Settings)
        } else {
            console.log(status, data)
        }
    };

    return (
        <SafeAreaView>
            <Container>
                <TitleBar title="Ajustes de seguridad" />
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
        </SafeAreaView>
    );
};

export default NotificationSettings;
