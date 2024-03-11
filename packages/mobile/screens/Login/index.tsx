import * as React from 'react'
import { Image, Dimensions } from 'react-native';
import { useForm } from 'react-hook-form';
import { PASSWORD, USERNAME } from '@approbado/lib/utils/validations'
import { Routes } from '../routes';
import { login, useAuth } from '@approbado/lib/contexts/AuthContext'
import { LockIcon, User2 } from 'lucide-react-native';
import { Button, TextInput, Text, Link, Row } from '../../components';
import { horizontalScale, verticalScale } from '../../styles/scaling';
import setFormErrors from '@approbado/lib/utils/setFormErrors';
import styled from 'styled-components/native';
import GoogleLoginButton from '../../components/GoogleLogin';
import FacebookLoginButton from '../../components/FacebookLogin';

const FormContainer = styled.View`
    margin-top: 20px;
    width: 100%;
    text-align: center;
    align-items: center;
    margin-bottom: 20px;
`;

const Container = styled.ScrollView`
    padding-vertical: ${(props) => verticalScale(props.theme.space[2])}px;
    padding-horizontal: ${(props) => horizontalScale(props.theme.space[2])}px;
`

const Login = ({ navigation }) => {
    const { dispatch } = useAuth()
    const { control, handleSubmit, setError, formState } = useForm();

    const onSubmit = async (values) => {
        const { success, status, data } = await login(dispatch, values);

        if (success) {
            navigation.navigate(Routes.Home)
        } else {
            if (status == 422) {
                setFormErrors(setError, data)
            } else {
                console.log(data)
            }
        }
    };

    return (
        <Container>
            <Row size={4} align='center'>
                <Image source={require('../../assets/Logo.png')} />
            </Row>
            <Row size={1} align='center'>
                <Text align='center'>
                    Iniciar sesión
                </Text>
            </Row>
            <Row size={1}>
                <TextInput
                    name="email"
                    validations={USERNAME}
                    control={control}
                    placeholder='Ingresa tu usuario'
                    icon={<User2 />}
                />
            </Row>
            <Row size={1}>
                <TextInput
                    name="password"
                    validations={PASSWORD}
                    control={control}
                    placeholder='Ingresa tu contraseña'
                    icon={<LockIcon />}
                    secureTextEntry
                />
            </Row>
            <Link to={Routes.ForgetPassword} align='right'>
                ¿Olvidaste tu contraseña?
            </Link>
            <Row size={1}>
                <Button
                    onPress={handleSubmit(onSubmit)}
                    fullWidth
                    disabled={!formState.isValid || formState.isSubmitting}
                    isLoading={formState.isSubmitting}
                >
                    Iniciar sesión
                </Button>
            </Row>
            <Row size={2} align='center'>
                <Text fontSize={18} fontWeight={400}>
                    Iniciar sesión con un tercero
                </Text>
            </Row>
            <Row size={1} align='center'>
                <GoogleLoginButton />
            </Row>
            <Row size={1} align='center'>
                <FacebookLoginButton />
            </Row>
            <Row size={2} align='center'>
                <Text fontSize={16}>
                    ¿Aún no tienes una cuenta?
                </Text>
                <Link to={Routes.SignUp} align='center'>
                    Crear una cuenta
                </Link>
            </Row>
        </Container>
    );
}

export default Login
