import * as React from 'react'
import {
    Image
} from 'react-native';
import {
    Row,
    Button,
    Text,
    ScrollViewContainer
} from '../../components';
import { Routes } from '../routes';
import styled from 'styled-components/native';

const Title = styled(Text)`
    text-align: center;
`

const LightText = styled(Text)`
    color: ${props => props.theme.palette.info.light};
`

const Presentation = ({ navigation }) => {
    const handleCreateAccount = () => navigation.navigate(Routes.SignUp)

    const handleLogin = () => navigation.navigate(Routes.Login)

    return (
        <ScrollViewContainer>
            <Row size={6} align='center'>
                <Image source={require('../../assets/Logo.png')} />
            </Row>
            <Row size={1} align='center'>
                <Title>
                    Estudia para tus exámenes con Approbado
                    y mejora tu rendimiento en la carrera.
                </Title>
            </Row>
            <Row size={1} align='center'>
                <Button
                    bgvariant='primary'
                    variant="contained"
                    onPress={handleCreateAccount}
                    fullWidth
                >
                    Crear una cuenta
                </Button>
            </Row>
            <Row size={1} align='center'>
                <Button
                    bgvariant='secondary'
                    variant="outlined"
                    onPress={handleLogin}
                    fullWidth
                >
                    Iniciar sesión
                </Button>
            </Row>
            <Row size={4} align='center'>
                <LightText fontSize={16} fontWeight={400}>
                    Términos y condiciones del servicio
                </LightText>
                <LightText fontSize={16} fontWeight={400}>
                    Todos los derechos reservados
                </LightText>
            </Row>
        </ScrollViewContainer>
    );
}

export default Presentation
