import React from 'react';
import Text from '../../components/Text';
import { SafeAreaView } from 'react-native';
import Row from '../../components/Row';
import Button from '../../components/Button';
import Container from '../../components/Container';
import TitleBar from '../../components/TitleBar';
import styled from 'styled-components/native';
import { IComp } from '../../types';
import { Routes } from '../routes';
import { ChevronRight } from 'lucide-react-native';

interface INavButtonProps extends IComp {
    navigation: any;
    to: string;
}

const StyledNavButton = styled.TouchableOpacity`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`

const FormContainer = styled.View`
    margin-top: 40px;
    width: 100%;
    text-align: center;
    align-items: center;
    margin-bottom: 20px;
`

const NavButton = ({ navigation, children, to } : INavButtonProps ) : JSX.Element => (
    <StyledNavButton onPress={() => navigation.navigate(to)}>
        <Text fontSize={18} fontWeight={400}>
            {children}
        </Text>
        <ChevronRight size={24} color='#000' />
    </StyledNavButton>
)

const Settings = ({ navigation }) => (
    <SafeAreaView>
        <Container>
            <TitleBar title="Configuraciones" />
            <FormContainer>
                <Row size={2}>
                    <NavButton
                        navigation={navigation}
                        to={Routes.PrivacySettings}
                    >
                        Privacidad
                    </NavButton>
                </Row>
                <Row size={2}>
                    <NavButton
                        navigation={navigation}
                        to={Routes.Memberships}
                    >
                        Membresías
                    </NavButton>
                </Row>
                <Row size={2}>
                    <NavButton
                        navigation={navigation}
                        to={Routes.NotificationSettings}
                    >
                        Notificaciones
                    </NavButton>
                </Row>
                <Row size={2}>
                    <NavButton
                        navigation={navigation}
                        to={Routes.Security}
                    >
                        Contraseña
                    </NavButton>
                </Row>
                <Row size={2}>
                    <NavButton
                        navigation={navigation}
                        to={Routes.DeleteAccount}
                    >
                        Cuenta
                    </NavButton>
                </Row>
                <Row size={6} align='start'>
                    <Button variant="text">
                        Cerrar sesión
                    </Button>
                </Row>
            </FormContainer>
        </Container>
    </SafeAreaView>
);

export default Settings;
