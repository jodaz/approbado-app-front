import * as React from 'react'
import {
    SafeAreaView,
    Image
} from 'react-native';
import { Routes } from '../routes';
import Container from '../../components/Container';
import InnerContainer from '../../components/InnerContainer';
import ButtonGroup from '../../components/ButtonGroup';
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
                <InnerContainer>
                    <Image source={require('../../assets/Logo.png')} />
                    <Title>
                        Estudia para tus exámenes con Approbado
                        y mejora tu rendimiento en la carrera.
                    </Title>
                    <ButtonGroup>
                        <Button
                            bgColor='primary'
                            variant="contained"
                            onPress={handleCreateAccount}
                            fullWidth
                        >
                            Crear una cuenta
                        </Button>
                        <Button
                            bgColor='secondary'
                            variant="outlined"
                            onPress={handleLogin}
                            fullWidth
                        >
                            Iniciar sesión
                        </Button>
                    </ButtonGroup>
                    <LightText fontSize={16} fontWeight={400}>
                        Términos y condiciones del servicio
                    </LightText>
                </InnerContainer>
                <LightText fontSize={16} fontWeight={400}>
                    Todos los derechos reservados
                </LightText>
            </Container>
        </SafeAreaView>
    );
}

export default Presentation
