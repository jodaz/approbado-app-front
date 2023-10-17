import * as React from 'react'
import {
    SafeAreaView,
    Image,
    View,
    Dimensions
} from 'react-native';
import { Routes } from '../routes';
import style from './style';
import ButtonGroup from '../../components/ButtonGroup';
import Text from '../../components/Text';
import Button from '../../components/Button';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

const Container = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: ${height};
`

const Title = styled(Text)`
    text-align: center;
    width: ${width * .9}
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
                <View style={style.innerContainer}>
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
                </View>
                <LightText fontSize={16} fontWeight={400}>
                    Todos los derechos reservados
                </LightText>
            </Container>
        </SafeAreaView>
    );
}

export default Presentation
