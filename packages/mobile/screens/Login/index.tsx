import * as React from 'react'
import { Image, SafeAreaView } from 'react-native';
import { useForm } from 'react-hook-form';
import { PASSWORD, USERNAME } from '@approbado/lib/utils/validations'
import { loginUser } from '@approbado/lib/services/auth.services'
import { Routes } from '../routes';
import Container from '../../components/Container';
import InnerContainer from '../../components/InnerContainer';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import TextInput from '../../components/TextInput';
import Text from '../../components/Text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Link from '../../components/Link';

const FormContainer = styled.View`
    margin-top: 20px;
    width: 100%;
    text-align: center;
    align-items: center;
    margin-bottom: 20px;
`;

const Login = ({ navigation }) => {
    const { control, handleSubmit } = useForm();

    const onSubmit = async (values) => {
        try {
            const { success, data } = await loginUser(values);

            if (success) {
                await AsyncStorage.setItem('token', data.token)

                navigation.navigate(Routes.Home)
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <SafeAreaView>
            <Container>
                <InnerContainer>
                    <Image source={require('../../assets/Logo.png')} />
                    <Text>
                        Iniciar sesión
                    </Text>
                    <FormContainer>
                        <TextInput
                            name="email"
                            validations={USERNAME}
                            control={control}
                            placeholder='Ingresa tu usuario'
                        />
                        <TextInput
                            name="password"
                            validations={PASSWORD}
                            control={control}
                            placeholder='Ingresa tu contraseña'
                            secureTextEntry
                        />
                        <Link to={Routes.ForgetPassword} align='right'>
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </FormContainer>
                    <Button onPress={handleSubmit(onSubmit)} fullWidth>
                        Iniciar sesión
                    </Button>
                    <Text fontSize={16}>
                        ¿Aún no tienes una cuenta?
                    </Text>
                    <Link to={Routes.SignUp} align='center'>
                        Crear una cuenta
                    </Link>
                </InnerContainer>
            </Container>
        </SafeAreaView>
    );
}

export default Login
