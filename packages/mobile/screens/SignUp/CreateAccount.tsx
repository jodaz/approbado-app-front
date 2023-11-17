import * as React from 'react'
import { Image } from 'react-native';
import { useForm } from 'react-hook-form';
import { Routes } from '../routes';
import { EMAIL, PASSWORD, USERNAME } from '@approbado/lib/utils/validations'
import { LockIcon, User2, Mail } from 'lucide-react-native';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import TextInput from '../../components/TextInput';
import Text from '../../components/Text';
import Link from '../../components/Link';
import Container from '../../components/Container';
import Row from '../../components/Row';
import GoogleLoginButton from '../../components/GoogleLogin';
import FacebookLoginButton from '../../components/FacebookLogin';
import { createAccountStep1 } from '@approbado/lib/services/auth.services';
import setFormErrors from '@approbado/lib/utils/setFormErrors';

const FormContainer = styled.View`
    margin-top: 20px;
    width: 100%;
    text-align: center;
    align-items: center;
    margin-bottom: 20px;
`;

const CreateAccount = ({ navigation }) => {
    const { control, handleSubmit, setError, formState } = useForm();

    const onSubmit = async (values) => {
        const { success, status, data } = await createAccountStep1(values);

        if (success) {
            navigation.navigate(Routes.CompleteProfile, values)
        } else {
            if (status == 422) {
                setFormErrors(setError, data)
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
                        icon={<User2 />}
                    />
                </Row>
                <Row size={1}>
                    <TextInput
                        name="email"
                        validations={EMAIL}
                        control={control}
                        placeholder='Correo electrónico'
                        icon={<Mail />}
                        keyboardType={'email-address'}
                    />
                </Row>
                <Row size={1}>
                    <TextInput
                        name="password"
                        validations={PASSWORD}
                        control={control}
                        placeholder='Contraseña'
                        secureTextEntry
                        icon={<LockIcon />}
                    />
                </Row>
            </FormContainer>
            <Row size={2}>
                <Button
                    onPress={handleSubmit(onSubmit)}
                    fullWidth
                    disabled={!formState.isValid}
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
