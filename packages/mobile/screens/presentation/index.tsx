import * as React from 'react'
import {
    SafeAreaView,
    Image,
    View
} from 'react-native';
import { Routes } from '../routes';
import style from './style';
import ButtonGroup from '../../components/ButtonGroup';
import Text from '../../components/Text';
import Button from '../../components/Button';

const Presentation = ({ navigation }) => {
    const handleCreateAccount = () => navigation.navigate(Routes.SignUp)

    const handleLogin = () => navigation.navigate(Routes.Login)

    return (
        <SafeAreaView>
            <View style={style.container}>
                <View style={style.innerContainer}>
                    <Image source={require('../../assets/Logo.png')} />
                    <Text>
                        Estudia para tus exámenes con Approbado y mejora tu rendimiento en la carrera.
                    </Text>
                    <ButtonGroup>
                        <Button
                            bgColor='primary'
                            variant="contained"
                            onPress={handleCreateAccount}
                        >
                            Crear una cuenta
                        </Button>
                        <Button
                            bgColor='secondary'
                            variant="outlined"
                            onPress={handleLogin}
                        >
                            Iniciar sesión
                        </Button>
                    </ButtonGroup>
                    <Text>
                        Términos y condiciones del servicio
                    </Text>
                </View>
                <Text>
                    Todos los derechos reservados
                </Text>
            </View>
        </SafeAreaView>
    );
}

export default Presentation
