import * as React from 'react'
import {
    Text,
    SafeAreaView,
    Image,
    View,
    Pressable
} from 'react-native';
import style from './style';
import ButtonGroup from '../../components/ButtonGroup';

const Login = () => {
    return (
        <SafeAreaView>
            <View style={style.container}>
                <View style={style.innerContainer}>
                    <Image source={require('../../assets/Logo.png')} />
                    <Text style={style.text}>
                        Estudia para tus exámenes con Approbado y mejora tu rendimiento en la carrera.
                    </Text>
                    <ButtonGroup>
                        <Pressable
                            style={style.primaryButton}
                        >
                            <Text style={style.buttonInnerText}>Crear una cuenta</Text>
                        </Pressable>
                        <Pressable
                            style={style.secondaryButton}
                        >
                            <Text style={style.buttonInnerText}>Iniciar sesión</Text>
                        </Pressable>
                    </ButtonGroup>
                    <Text style={style.lightText}>
                        Términos y condiciones del servicio
                    </Text>
                </View>
                <Text style={style.lightText}>
                    Todos los derechos reservados
                </Text>
            </View>
        </SafeAreaView>
    );
}

export default Login
