import * as React from 'react'
import Config from "react-native-config";
import { Image } from 'react-native';
import { useForm } from 'react-hook-form';
import { EMAIL, PASSWORD, USERNAME } from '@approbado/lib/utils/validations'
import { loginUser } from '@approbado/lib/services/auth.services'
import Button from '../../components/Button';
import styled from 'styled-components/native';
import TextInput from '../../components/TextInput';
import Text from '../../components/Text';
import { Routes } from '../routes';
import CONFIG_NAMES from '@approbado/lib/env'
import axios from 'axios'
import Link from '../../components/Link';

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const CreateAccount = ({ navigation }) => {
    const { control, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        navigation.navigate(Routes.CompleteProfile)
    };

    return (
        <Container>
            <Image source={require('../../assets/Logo.png')} />
            <Text>
                Crear una cuenta
            </Text>
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
            <Button onPress={handleSubmit(onSubmit)} fullWidth>
                Crear una cuenta
            </Button>
            <Text>
                ¿Ya tienes una cuenta?
            </Text>
            <Link to={Routes.Login}>
                Ingresa aquí
            </Link>
        </Container>
    );
}

export default CreateAccount
