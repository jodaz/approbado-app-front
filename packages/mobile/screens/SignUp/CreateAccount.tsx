import * as React from 'react'
import { Image } from 'react-native';
import { useForm } from 'react-hook-form';
import { Routes } from '../routes';
import { EMAIL, PASSWORD, USERNAME } from '@approbado/lib/utils/validations'
import { loginUser } from '@approbado/lib/services/auth.services'
import Button from '../../components/Button';
import styled from 'styled-components/native';
import TextInput from '../../components/TextInput';
import Text from '../../components/Text';
import Link from '../../components/Link';
import Container from '../../components/Container';
import InnerContainer from '../../components/InnerContainer';

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
        navigation.navigate(Routes.CompleteProfile)
    };

    return (
        <Container>
            <InnerContainer>
                <Image source={require('../../assets/Logo.png')} />
                <Text>
                    Crear una cuenta
                </Text>
                <FormContainer>
                    <TextInput
                        name="user_name"
                        validations={USERNAME}
                        control={control}
                        placeholder='Usuario'
                    />
                    <TextInput
                        name="email"
                        validations={EMAIL}
                        control={control}
                        placeholder='Correo electrónico'
                    />
                    <TextInput
                        name="password"
                        validations={PASSWORD}
                        control={control}
                        placeholder='Contraseña'
                        secureTextEntry
                    />
                    <Button
                        onPress={handleSubmit(onSubmit)}
                        fullWidth
                    >
                        Crear una cuenta
                    </Button>
                </FormContainer>
                <Text fontSize={16} align='center'>
                    ¿Ya tienes una cuenta?
                </Text>
                <Link to={Routes.Login} align='center'>
                    Ingresa aquí
                </Link>
            </InnerContainer>
        </Container>
    );
}

export default CreateAccount
