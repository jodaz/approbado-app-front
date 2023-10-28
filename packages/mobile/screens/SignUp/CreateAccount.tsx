import * as React from 'react'
import { Image } from 'react-native';
import { useForm } from 'react-hook-form';
import { Routes } from '../routes';
import { EMAIL, PASSWORD, USERNAME } from '@approbado/lib/utils/validations'
import Button from '../../components/Button';
import styled from 'styled-components/native';
import TextInput from '../../components/TextInput';
import Text from '../../components/Text';
import Link from '../../components/Link';
import Container from '../../components/Container';
import Row from '../../components/Row';
import GoogleLoginButton from '../../components/GoogleLogin';
import FacebookLoginButton from '../../components/FacebookLogin';

const FormContainer = styled.View`
    margin-top: 20px;
    width: 100%;
    text-align: center;
    align-items: center;
    margin-bottom: 20px;
`;

const CreateAccount = ({ navigation }) => {
    const { control, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        navigation.navigate(Routes.CompleteProfile, data)
    };

    return (
        <Container>
            <Row size={4} align='center'>
                <Image source={require('../../assets/Logo.png')} />
            </Row>
            <Row size={1} align='center'>
                <Text align='center'>
                    Crear una cuenta
                </Text>
            </Row>
            <FormContainer>
                <Row size={1}>
                    <TextInput
                        name="user_name"
                        validations={USERNAME}
                        control={control}
                        placeholder='Usuario'
                    />
                </Row>
                <Row size={1}>
                    <TextInput
                        name="email"
                        validations={EMAIL}
                        control={control}
                        placeholder='Correo electrónico'
                    />
                </Row>
                <Row size={1}>
                    <TextInput
                        name="password"
                        validations={PASSWORD}
                        control={control}
                        placeholder='Contraseña'
                        secureTextEntry
                    />
                </Row>
            </FormContainer>
            <Row size={2}>
                <Button
                    onPress={handleSubmit(onSubmit)}
                    fullWidth
                >
                    Crear una cuenta
                </Button>
            </Row>
            <Row size={2} align='center'>
                <Text fontSize={14} fontWeight={400}>
                    Iniciar sesión con un tercero
                </Text>
            </Row>
            <Row size={1} align='center'>
                <GoogleLoginButton />
            </Row>
            <Row size={1} align='center'>
                <FacebookLoginButton />
            </Row>
            <Text fontSize={16} align='center'>
                ¿Ya tienes una cuenta?
            </Text>
            <Link to={Routes.Login} align='center'>
                Ingresa aquí
            </Link>
        </Container>
    );
}

export default CreateAccount
