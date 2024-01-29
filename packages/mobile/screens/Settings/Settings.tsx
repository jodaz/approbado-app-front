import React from 'react';
import { Routes } from '../routes';
import { logout, useAuth } from '@approbado/lib/contexts/AuthContext';
import { NavButton } from '../../components';
import {
    Row,
    Button,
    Container
} from '../../components';
import styled from 'styled-components/native';

const FormContainer = styled.View`
    margin-top: 40px;
    width: 100%;
    text-align: center;
    align-items: center;
    margin-bottom: 20px;
`

const Settings = ({ navigation }) => {
    const { dispatch } = useAuth();

    const onLogout = async () => {
        await logout(dispatch)
        navigation.navigate(Routes.Onboarding)
    }

    return (
        <Container>
            <NavButton to={Routes.PrivacySettings}>
                Privacidad
            </NavButton>
            <NavButton to={Routes.Memberships}>
                Membresías
            </NavButton>
            <NavButton to={Routes.NotificationSettings}>
                Notificaciones
            </NavButton>
            <NavButton to={Routes.Security}>
                Contraseña
            </NavButton>
            <NavButton to={Routes.DeleteAccount}>
                Cuenta
            </NavButton>
            <Row size={6} align='start'>
                <Button
                    textColor="error"
                    textVariant="main"
                    variant='text'
                    onPress={onLogout}
                >
                    Cerrar sesión
                </Button>
            </Row>
        </Container>
    );
}

export default Settings;
