import * as React from 'react'
import {
    SafeAreaView,
    Image
} from 'react-native';
import Row from '../../components/Row';
import { Routes } from '../routes';
import Container from '../../components/Container';
import Text from '../../components/Text';
import Button from '../../components/Button';
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
        <SafeAreaView>
            <Container>
                <Row size={4} align='center'>
                    <Image source={require('../../assets/Logo.png')} />
                </Row>
                <Row size={4} align='center'>
                    <Title>
                        Estudia para tus exámenes con Approbado
                        y mejora tu rendimiento en la carrera.
                    </Title>
                </Row>
                <Row size={1} align='center'>
                    <Button
                        bgColor='primary'
                        variant="contained"
                        onPress={handleCreateAccount}
                        fullWidth
                    >
                        Crear una cuenta
                    </Button>
                </Row>
                <Row size={1} align='center'>
                    <Button
                        bgColor='secondary'
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
            </Container>
        </SafeAreaView>
    );
}

export default Presentation
