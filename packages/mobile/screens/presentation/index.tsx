import * as React from 'react'
import {
    SafeAreaView,
    Image,
    View,
    Pressable
} from 'react-native';
import style from './style';
import ButtonGroup from '../../components/ButtonGroup';
import Text from '../../components/Text';

const Presentation = () => {
    return (
        <SafeAreaView>
            <View style={style.container}>
                <View style={style.innerContainer}>
                    <Image source={require('../../assets/Logo.png')} />
                    <Text>
                        Estudia para tus exámenes con Approbado y mejora tu rendimiento en la carrera.
                    </Text>
                    <ButtonGroup>
                        <Pressable
                            style={style.primaryButton}
                        >
                            <Text>Crear una cuenta</Text>
                        </Pressable>
                        <Pressable
                            style={style.secondaryButton}
                        >
                            <Text>Iniciar sesión</Text>
                        </Pressable>
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
