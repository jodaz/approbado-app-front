import * as React from 'react'
import { Image,  } from 'react-native';
import { useForm } from 'react-hook-form';
import { PASSWORD, USERNAME } from '@approbado/lib/utils/validations'
import { loginUser } from '@approbado/lib/services/auth.services'
import { Routes } from '../routes';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import TextInput from '../../components/TextInput';
import Text from '../../components/Text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Link from '../../components/Link';

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const FormContainer = styled.View`
    margin-top: 20px;
    width: 100%;
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
        <Container>
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
            </FormContainer>
            <Link to={Routes.ForgetPassword}>
                ¿Olvidaste tu contraseña?
            </Link>
            <Button onPress={handleSubmit(onSubmit)} fullWidth>
                Iniciar sesión
            </Button>
            <Text>
                ¿Aún no tienes una cuenta?
            </Text>
            <Link to={Routes.SignUp}>
                Crear una cuenta
            </Link>
        </Container>
    );
}

export default Login
